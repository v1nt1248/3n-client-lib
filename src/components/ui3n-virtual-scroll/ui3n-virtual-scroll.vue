<script lang="ts" setup generic="T extends { id: string }">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { computed, ref, shallowRef, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
  import Ui3nScrollbarVertical from '../ui3n-scrollbar-vertical/ui3n-scrollbar-vertical.vue';
  import type {
    Ui3nVirtualScrollEmits,
    Ui3nVirtualScrollExpose,
    Ui3nVirtualScrollProps,
    Ui3nVirtualScrollSlots,
  } from './types';

  interface MeasuredSize {
    height: number;
    top: number;
  }

  interface ScrollAnchor {
    id: string;
    /** How far scrollTop is below the anchor item top */
    offsetWithinItem: number;
  }

  const props = withDefaults(defineProps<Ui3nVirtualScrollProps<T>>(), {
    renderAhead: 20,
    minChildHeight: 16,
    stickToBottom: false,
    stickToBottomThreshold: 32,
    reachEdgeThreshold: 64,
  });
  const emits = defineEmits<Ui3nVirtualScrollEmits>();
  defineSlots<Ui3nVirtualScrollSlots<T>>();

  const scrollTop = ref(0);
  const viewportHeight = ref<number | null>(null);
  const scrollbarComponentRef = ref<InstanceType<typeof Ui3nScrollbarVertical> | null>(null);

  const sizeCache = shallowRef<MeasuredSize[]>([]);
  const cacheVersion = ref(0);

  /** Long-lived measured heights keyed by item id */
  const heightById = new Map<string, number>();
  /** id -> index in the current props.items */
  const idToIndex = shallowRef(new Map<string, number>());

  let isAdjustingScroll = false;
  let listResizeObserver: ResizeObserver | null = null;
  let containerResizeObserver: ResizeObserver | null = null;
  /** Previous items snapshot for anchor capture */
  let prevItemsRef: T[] = [];
  /**
   * Which edge has already been announced. Without it a consumer that loads
   * a page on 'reached-top' would get an event on every scroll tick while
   * sitting at the edge, and fire a request per tick.
   */
  let announcedEdge: 'top' | 'bottom' | null = null;

  const itemRefs = new Map<string, HTMLElement>();

  const totalHeight = computed(() => {
    // Touched to make this computed depend on measurements of the size cache
    void cacheVersion.value;
    if (!sizeCache.value.length) {
      return 0;
    }

    const lastItem = sizeCache.value[sizeCache.value.length - 1];
    return lastItem.top + lastItem.height;
  });

  const wrapElementHeight = computed(() => {
    if (viewportHeight.value !== null) {
      return viewportHeight.value;
    }

    const el = scrollbarComponentRef.value?.getContainer();
    return el ? el.clientHeight : 0;
  });

  function findIndexAtOffset(cache: MeasuredSize[], targetTop: number): number {
    if (!cache.length) {
      return 0;
    }

    let low = 0;
    let high = cache.length - 1;
    let foundIndex = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const item = cache[mid];

      if (item.top <= targetTop && item.top + item.height > targetTop) {
        foundIndex = mid;
        break;
      } else if (item.top > targetTop) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    if (foundIndex === -1) {
      foundIndex = Math.max(0, high);
    }

    return foundIndex;
  }

  const startNode = computed(() => {
    // Touched to make this computed depend on measurements of the size cache
    void cacheVersion.value;
    if (!sizeCache.value.length) {
      return 0;
    }

    const foundIndex = findIndexAtOffset(sizeCache.value, scrollTop.value);
    return Math.max(0, foundIndex - props.renderAhead);
  });

  /**
   * How many items to keep mounted. Measured heights are used when they are
   * available: deriving the count from minChildHeight alone inflates the window
   * several times over whenever items are taller than that minimum.
   */
  const visibleNodeCount = computed(() => {
    // Touched to make this computed depend on measurements of the size cache
    void cacheVersion.value;
    const height = wrapElementHeight.value;
    if (!height) {
      return props.renderAhead * 2;
    }

    if (!sizeCache.value.length) {
      return Math.ceil(height / props.minChildHeight) + 2 * props.renderAhead;
    }

    const firstVisible = findIndexAtOffset(sizeCache.value, scrollTop.value);
    const lastVisible = findIndexAtOffset(sizeCache.value, scrollTop.value + height);
    return lastVisible - firstVisible + 1 + 2 * props.renderAhead;
  });

  const offsetY = computed(() => {
    // Touched to make this computed depend on measurements of the size cache
    void cacheVersion.value;
    if (!sizeCache.value.length) {
      return 0;
    }

    return sizeCache.value[startNode.value]?.top || 0;
  });

  const visibleChildren = computed(() => {
    const start = startNode.value;
    const count = visibleNodeCount.value;

    if (start + count >= props.items.length - props.renderAhead) {
      return props.items.slice(start);
    }

    return props.items.slice(start, start + count);
  });

  function getContainerEl(): HTMLElement | null {
    return scrollbarComponentRef.value?.getContainer() ?? null;
  }

  function getTotalHeightFromCache(cache: MeasuredSize[]): number {
    if (!cache.length) {
      return 0;
    }

    const last = cache[cache.length - 1];
    return last.top + last.height;
  }

  function isNearBottom(
    containerEl: HTMLElement | null,
    cache: MeasuredSize[],
    threshold = props.stickToBottomThreshold,
  ): boolean {
    if (!containerEl || !cache.length) {
      return false;
    }

    const total = getTotalHeightFromCache(cache);
    const distance = total - (containerEl.scrollTop + containerEl.clientHeight);
    return distance <= threshold;
  }

  function applyScrollTop(containerEl: HTMLElement | null, nextScrollTop: number) {
    if (!containerEl) {
      scrollTop.value = Math.max(0, nextScrollTop);
      return;
    }

    isAdjustingScroll = true;
    containerEl.scrollTop = Math.max(0, nextScrollTop);
    scrollTop.value = containerEl.scrollTop;
    isAdjustingScroll = false;
  }

  function scrollToBottomInternal(containerEl: HTMLElement | null = getContainerEl(), cache: MeasuredSize[] = sizeCache.value) {
    if (!cache.length) {
      return;
    }

    const total = getTotalHeightFromCache(cache);
    const viewport = containerEl?.clientHeight ?? wrapElementHeight.value;
    applyScrollTop(containerEl, total - viewport);
  }

  function captureScrollAnchor(
    cache: MeasuredSize[],
    items: T[],
    scrollTopValue: number,
  ): ScrollAnchor | null {
    if (!cache.length || !items.length) {
      return null;
    }

    const index = findIndexAtOffset(cache, scrollTopValue);
    const row = cache[index];
    const id = items[index]?.id;

    if (!row || !id) {
      return null;
    }

    return {
      id,
      offsetWithinItem: scrollTopValue - row.top,
    };
  }

  function restoreScrollAnchor(
    anchor: ScrollAnchor,
    cache: MeasuredSize[],
    indexMap: Map<string, number>,
    containerEl: HTMLElement | null,
  ): boolean {
    const index = indexMap.get(anchor.id);
    if (index === undefined || !cache[index]) {
      return false;
    }

    applyScrollTop(containerEl, cache[index].top + anchor.offsetWithinItem);
    return true;
  }

  function rebuildSizeCacheFromItems(): MeasuredSize[] {
    const nextIdToIndex = new Map<string, number>();
    const nextCache: MeasuredSize[] = new Array(props.items.length);
    const retainedHeights = new Map<string, number>();

    let currentTop = 0;

    for (let i = 0; i < props.items.length; i++) {
      const id = props.items[i].id;
      nextIdToIndex.set(id, i);

      const height = heightById.get(id) ?? props.minChildHeight;
      retainedHeights.set(id, height);

      nextCache[i] = { height, top: currentTop };
      currentTop += height;
    }

    // Drop heights for removed ids so the map does not grow forever
    heightById.clear();
    for (const [id, height] of retainedHeights) {
      heightById.set(id, height);
    }

    if (import.meta.env.DEV && nextIdToIndex.size !== props.items.length) {
      // Duplicates would otherwise fail silently: the map keeps one index per
      // id, so measurements of one element land on another element's row
      console.warn('[Ui3nVirtualScroll] items contain duplicate ids, item heights and scroll anchoring will be wrong');
    }

    idToIndex.value = nextIdToIndex;
    return nextCache;
  }

  function syncItemsCache() {
    const containerEl = getContainerEl();
    const prevCache = sizeCache.value;
    const prevItems = prevItemsRef;

    // An empty previous cache means this is the first fill of the list, and
    // a chat has to open at its newest item rather than at the oldest one
    const shouldStick = props.stickToBottom && (!prevCache.length || isNearBottom(containerEl, prevCache));
    const anchor = shouldStick ? null : captureScrollAnchor(prevCache, prevItems, scrollTop.value);

    const nextCache = rebuildSizeCacheFromItems();
    sizeCache.value = nextCache;
    cacheVersion.value++;

    prevItemsRef = props.items.slice();
    // The consumer has responded with new items, so the edge may be announced again
    announcedEdge = null;

    const finalizeScroll = () => {
      const el = getContainerEl();

      if (shouldStick) {
        scrollToBottomInternal(el, sizeCache.value);
      } else if (anchor) {
        const restored = restoreScrollAnchor(anchor, sizeCache.value, idToIndex.value, el);
        if (!restored && el) {
          // Anchor item removed — keep scroll within bounds
          const maxScroll = Math.max(0, getTotalHeightFromCache(sizeCache.value) - el.clientHeight);
          if (scrollTop.value > maxScroll) {
            applyScrollTop(el, maxScroll);
          }
        }
      }

      scrollbarComponentRef.value?.updateMetrics();
    };

    // Wait for DOM/layout so container metrics and totalHeight are up to date
    nextTick(() => {
      requestAnimationFrame(finalizeScroll);
    });
  }

  function onScroll(event: Event) {
    if (isAdjustingScroll) {
      return;
    }

    const containerEl = event.target as HTMLDivElement;
    scrollTop.value = containerEl.scrollTop;
    emits('scroll', event);

    const atTop = scrollTop.value <= props.reachEdgeThreshold;
    const atBottom = isNearBottom(containerEl, sizeCache.value, props.reachEdgeThreshold);

    if (atTop) {
      if (announcedEdge !== 'top') {
        announcedEdge = 'top';
        emits('reached-top');
      }
    } else if (atBottom) {
      if (announcedEdge !== 'bottom') {
        announcedEdge = 'bottom';
        emits('reached-bottom');
      }
    } else {
      announcedEdge = null;
    }
  }

  function setItemRef(el: any, id: string) {
    if (el) {
      const element = (el.$el || el) as HTMLElement;
      const prev = itemRefs.get(id);
      if (prev && prev !== element) {
        listResizeObserver?.unobserve(prev);
      }
      itemRefs.set(id, element);
      listResizeObserver?.observe(element);
    } else {
      const prev = itemRefs.get(id);
      if (prev) {
        listResizeObserver?.unobserve(prev);
      }
      itemRefs.delete(id);
    }
  }

  function scrollToBottom() {
    scrollToBottomInternal();
    scrollbarComponentRef.value?.updateMetrics();
  }

  function topForAlign(row: MeasuredSize, align: 'start' | 'end' | 'center', viewport: number): number {
    if (align === 'end') {
      return row.top + row.height - viewport;
    }
    if (align === 'center') {
      return row.top + row.height / 2 - viewport / 2;
    }
    return row.top;
  }

  /**
   * Items that have never been rendered are only estimated at minChildHeight,
   * so the target's top is off by however much its predecessors are mistaken -
   * the further the target, the bigger the miss. Scrolling there brings those
   * items into view, they get measured, and the target moves. So aim again
   * until it stops moving.
   */
  function scrollToItem(id: string, align: 'start' | 'end' | 'center' = 'start', attemptsLeft = 5) {
    const index = idToIndex.value.get(id);
    if (index === undefined) {
      return;
    }

    const row = sizeCache.value[index];
    if (!row) {
      return;
    }

    const containerEl = getContainerEl();
    const viewport = containerEl?.clientHeight ?? wrapElementHeight.value;

    applyScrollTop(containerEl, topForAlign(row, align, viewport));
    scrollbarComponentRef.value?.updateMetrics();

    if (attemptsLeft <= 0) {
      return;
    }

    const topBefore = row.top;
    requestAnimationFrame(() => {
      const nextIndex = idToIndex.value.get(id);
      const nextRow = nextIndex === undefined ? undefined : sizeCache.value[nextIndex];
      if (nextRow && nextRow.top !== topBefore) {
        scrollToItem(id, align, attemptsLeft - 1);
      }
    });
  }

  defineExpose<Ui3nVirtualScrollExpose>({
    scrollToBottom,
    scrollToItem: (id, align) => scrollToItem(id, align),
    getScrollTop: () => scrollTop.value,
    isStuckToBottom: () => isNearBottom(getContainerEl(), sizeCache.value),
  });

  onMounted(() => {
    const containerEl = getContainerEl();

    if (containerEl) {
      viewportHeight.value = containerEl.clientHeight;
      containerResizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          viewportHeight.value = entry.contentRect.height || (entry.target as HTMLElement).clientHeight;
        }
      });
      containerResizeObserver.observe(containerEl);
    }

    listResizeObserver = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        let lowestChangedIndex = Infinity;
        let totalDeltaAboveKey = 0;

        const updatedCache = sizeCache.value.slice();
        const indexMap = idToIndex.value;
        const currentScrollTop = scrollTop.value;
        const el = getContainerEl();
        const stickAfterMeasure = props.stickToBottom && isNearBottom(el, sizeCache.value);

        for (const entry of entries) {
          const sid = entry.target.getAttribute('data-sid');
          if (!sid) {
            continue;
          }

          const index = indexMap.get(sid);
          if (index === undefined) {
            continue;
          }

          const realHeight = entry.contentRect.height || entry.target.getBoundingClientRect().height;

          const prev = updatedCache[index];
          if (!prev || prev.height === realHeight) {
            continue;
          }

          const oldHeight = prev.height;
          updatedCache[index] = { ...prev, height: realHeight };
          heightById.set(sid, realHeight);

          // Only items lying entirely above the viewport push the content down
          // by their full delta; one straddling the top edge contributes just
          // the part of it that is out of sight, so compensating in full there
          // would shove the visible content instead of holding it still
          if (prev.top + prev.height <= currentScrollTop) {
            totalDeltaAboveKey += realHeight - oldHeight;
          } else if (prev.top < currentScrollTop) {
            totalDeltaAboveKey += Math.min(realHeight, currentScrollTop - prev.top) - Math.min(oldHeight, currentScrollTop - prev.top);
          }

          if (index < lowestChangedIndex) {
            lowestChangedIndex = index;
          }
        }

        if (lowestChangedIndex === Infinity) {
          return;
        }

        let currentTop = updatedCache[lowestChangedIndex].top;
        for (let i = lowestChangedIndex; i < updatedCache.length; i++) {
          updatedCache[i] = { ...updatedCache[i], top: currentTop };
          currentTop += updatedCache[i].height;
        }

        sizeCache.value = updatedCache;
        cacheVersion.value++;

        if (stickAfterMeasure) {
          scrollToBottomInternal(el, updatedCache);
        } else if (el && totalDeltaAboveKey !== 0) {
          applyScrollTop(el, currentScrollTop + totalDeltaAboveKey);
        }

        scrollbarComponentRef.value?.updateMetrics();
      });
    });

    // Observe items that may already be mounted before observer creation
    for (const element of itemRefs.values()) {
      listResizeObserver.observe(element);
    }
  });

  onBeforeUnmount(() => {
    listResizeObserver?.disconnect();
    containerResizeObserver?.disconnect();
  });

  watch(() => props.items, syncItemsCache, { immediate: true });
</script>

<template>
  <ui3n-scrollbar-vertical
    ref="scrollbarComponentRef"
    :class="$style.ui3nVirtualScroll"
    :auto-update="false"
    @scroll="onScroll"
  >
    <div
      :class="$style.viewport"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        :class="$style.content"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="(item, index) in visibleChildren"
          :key="item.id"
          :ref="el => setItemRef(el, item.id)"
          v-bind="{ 'data-sid': item.id }"
          :class="$style.item"
          :style="{ minHeight: `${props.minChildHeight}px` }"
        >
          <slot
            name="item"
            :value="item"
            :index="startNode + index"
          />
        </div>
      </div>
    </div>
  </ui3n-scrollbar-vertical>
</template>

<style lang="scss" module>
  .ui3nVirtualScroll {
    background-color: var(--color-bg-block-primary-default);
  }

  .viewport {
    position: relative;
    overflow: hidden;
    will-change: transform;
    box-sizing: border-box;
    margin: 0 !important;
    padding: 0 !important;
  }

  .content {
    will-change: transform;
  }

  .item {
    position: relative;
    box-sizing: border-box;
  }
</style>
