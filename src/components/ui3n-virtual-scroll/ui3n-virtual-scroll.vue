<script lang="ts" setup generic="T extends { id?: string }">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { computed, ref, shallowRef, onMounted, onBeforeUnmount, watch } from 'vue';
  import Ui3nScrollbarVertical from '../ui3n-scrollbar-vertical/ui3n-scrollbar-vertical.vue';
  import type { Ui3nVirtualScrollProps, Ui3nVirtualScrollSlots } from './types';

  interface MeasuredSize {
    height: number;
    top: number;
  }

  const props = withDefaults(defineProps<Ui3nVirtualScrollProps<T>>(), {
    renderAhead: 20,
    minChildHeight: 16,
  });
  defineSlots<Ui3nVirtualScrollSlots<T>>();

  const scrollTop = ref(0);
  const viewportHeight = ref<number | null>(null);
  const scrollbarComponentRef = ref<InstanceType<typeof Ui3nScrollbarVertical> | null>(null);

  const sizeCache = shallowRef<MeasuredSize[]>([]);
  const cacheVersion = ref(0);

  let isAdjustingScroll = false;
  let listResizeObserver: ResizeObserver | null = null;
  let containerResizeObserver: ResizeObserver | null = null;

  const itemRefs = new Map<string | number, HTMLElement>();

  const totalHeight = computed(() => {
    cacheVersion.value;
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

  const startNode = computed(() => {
    cacheVersion.value;
    const targetTop = scrollTop.value;

    if (!sizeCache.value.length) {
      return 0;
    }

    let low = 0;
    let high = sizeCache.value.length - 1;
    let foundIndex = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const item = sizeCache.value[mid];

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

    return Math.max(0, foundIndex - props.renderAhead);
  });

  const visibleNodeCount = computed(() => {
    const height = wrapElementHeight.value;
    if (!height) {
      return props.renderAhead * 2;
    }

    const estimatedVisible = Math.ceil(height / props.minChildHeight);
    return estimatedVisible + 2 * props.renderAhead;
  });

  const offsetY = computed(() => {
    cacheVersion.value;
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

  function onScroll(event: Event) {
    if (isAdjustingScroll) {
      return;
    }

    scrollTop.value = (event.target as HTMLDivElement).scrollTop;
  }

  function setItemRef(el: any, id: string | number) {
    if (el) {
      const element = el.$el || el;
      itemRefs.set(id, element);
      listResizeObserver?.observe(element);
    } else {
      itemRefs.delete(id);
    }
  }

  function initCache() {
    let currentTop = 0;
    sizeCache.value = props.items.map(() => {
      const size = { height: props.minChildHeight, top: currentTop };
      currentTop += props.minChildHeight;
      return size;
    });
    cacheVersion.value++;
  }

  onMounted(() => {
    const containerEl = scrollbarComponentRef.value?.getContainer();

    if (containerEl) {
      viewportHeight.value = containerEl.clientHeight;
      containerResizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          viewportHeight.value = entry.contentRect.height || entry.target.clientHeight;
        }
      });
      containerResizeObserver.observe(containerEl);
    }

    listResizeObserver = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        let lowestChangedIndex = Infinity;
        let totalDeltaAboveKey = 0;

        const updatedCache = [...sizeCache.value];
        const currentScrollTop = scrollTop.value;

        for (const entry of entries) {
          const sid = entry.target.getAttribute('data-sid');
          if (!sid) {
            continue;
          }

          const index = props.items.findIndex((item, idx) => (item.id ?? idx).toString() === sid);
          if (index === -1) {
            continue;
          }

          const realHeight = entry.contentRect.height || entry.target.getBoundingClientRect().height;

          if (updatedCache[index] && updatedCache[index].height !== realHeight) {
            const oldHeight = updatedCache[index].height;
            updatedCache[index] = { ...updatedCache[index], height: realHeight };

            if (updatedCache[index].top < currentScrollTop) {
              totalDeltaAboveKey += realHeight - oldHeight;
            }

            if (index < lowestChangedIndex) {
              lowestChangedIndex = index;
            }
          }
        }

        if (lowestChangedIndex !== Infinity) {
          let currentTop = updatedCache[lowestChangedIndex].top;

          for (let i = lowestChangedIndex; i < updatedCache.length; i++) {
            updatedCache[i].top = currentTop;
            currentTop += updatedCache[i].height;
          }

          sizeCache.value = updatedCache;
          cacheVersion.value++;

          if (containerEl && totalDeltaAboveKey !== 0) {
            isAdjustingScroll = true;
            containerEl.scrollTop = currentScrollTop + totalDeltaAboveKey;
            scrollTop.value = containerEl.scrollTop;
            isAdjustingScroll = false;
          }

          scrollbarComponentRef.value?.updateMetrics();
        }
      });
    });
  });

  onBeforeUnmount(() => {
    listResizeObserver?.disconnect();
    containerResizeObserver?.disconnect();
  });

  watch(() => props.items, initCache, { immediate: true });
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
          :key="item.id ?? `v-node-${startNode + index}`"
          :ref="el => setItemRef(el, item.id ?? startNode + index)"
          v-bind="{ 'data-sid': item.id ?? startNode + index }"
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
