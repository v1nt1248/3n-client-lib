<script lang="ts" setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import type {
    Ui3nScrollbarProps,
    Ui3nScrollbarEmits,
    Ui3nScrollbarSlots,
    Ui3nScrollbarExpose,
    Ui3nScrollbarVerticalOptions,
    Ui3nScrollbarHorizontalOptions,
    Ui3nScrollbarAxes,
    Ui3nScrollbarScrollPayload,
  } from './types';

  const props = withDefaults(defineProps<Ui3nScrollbarProps>(), {
    axes: 'both',
    vertical: () => ({
      thumbMinHeight: 32,
      thumbHeight: 'auto',
      thumbRadius: 4,
      thumbColor: 'var(--color-bg-control-accent-default)',
      thumbHoverColor: 'var(--color-bg-control-accent-hover)',
      thumbActiveColor: 'var(--color-bg-control-accent-focused)',
      trackWidth: 6,
      trackRadius: 4,
      trackColor: 'transparent',
    }),
    horizontal: () => ({
      thumbMinWidth: 32,
      thumbWidth: 'auto',
      thumbRadius: 4,
      thumbColor: 'var(--color-bg-control-accent-default)',
      thumbHoverColor: 'var(--color-bg-control-accent-hover)',
      thumbActiveColor: 'var(--color-bg-control-accent-focused)',
      trackHeight: 6,
      trackRadius: 4,
      trackColor: 'transparent',
    }),
    autoUpdate: true,
  });
  const emits = defineEmits<Ui3nScrollbarEmits>();
  defineSlots<Ui3nScrollbarSlots>();

  const containerRef = ref<HTMLDivElement | null>(null);
  const trackRefV = ref<HTMLDivElement | null>(null);
  const trackRefH = ref<HTMLDivElement | null>(null);
  const thumbRefV = ref<HTMLDivElement | null>(null);
  const thumbRefH = ref<HTMLDivElement | null>(null);

  const axes = computed<Ui3nScrollbarAxes>(() => props.axes ?? 'both');
  const vOpts = computed<Ui3nScrollbarVerticalOptions>(() => props.vertical ?? {});
  const hOpts = computed<Ui3nScrollbarHorizontalOptions>(() => props.horizontal ?? {});

  const scrollHeight = ref(0);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollWidth = ref(0);
  const clientWidth = ref(0);
  const scrollLeft = ref(0);
  const prevScrollTop = ref(0);
  const prevScrollLeft = ref(0);

  const isDraggingV = ref(false);
  const isDraggingH = ref(false);
  const isHovered = ref(false);
  const isScrollingNow = ref(false);

  let resizeObserver: ResizeObserver | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
  let startY = 0;
  let startScrollTop = 0;
  let startX = 0;
  let startScrollLeft = 0;

  const isScrollableX = computed(() => scrollWidth.value > clientWidth.value);
  const isScrollableY = computed(() => scrollHeight.value > clientHeight.value);

  const isBarVisibleX = computed(() => {
    if (isDraggingH.value) {
      return true;
    }

    return isScrollableX.value && (isHovered.value || isScrollingNow.value);
  });

  const isBarVisibleY = computed(() => {
    if (isDraggingV.value) {
      return true;
    }

    return isScrollableY.value && (isHovered.value || isScrollingNow.value);
  });

  const showVerticalTrack = computed(() => axes.value === 'vertical' || axes.value === 'both');
  const showHorizontalTrack = computed(() => axes.value === 'horizontal' || axes.value === 'both');

  /** Both axes can scroll — leave a free corner so tracks do not cross. */
  const needsCornerGap = computed(
    () => showVerticalTrack.value && showHorizontalTrack.value && isScrollableX.value && isScrollableY.value,
  );

  const trackWidthVPx = computed(() => {
    const num = Number(vOpts.value.trackWidth ?? 6);
    return isNaN(num) ? 6 : num;
  });

  const trackHeightHPx = computed(() => {
    const num = Number(hOpts.value.trackHeight ?? 6);
    return isNaN(num) ? 6 : num;
  });

  const TRACK_EDGE_OFFSET = 2;
  const CORNER_GAP = 2;

  const trackOffsetTopPx = computed(() => {
    const raw = vOpts.value.trackOffsetTop;
    if (raw == null || raw === '') {
      return 0;
    }

    const num = Number(raw);
    return isNaN(num) ? 0 : Math.max(0, num);
  });

  const vTrackInsetTop = computed(() => TRACK_EDGE_OFFSET + trackOffsetTopPx.value);

  const vTrackInsetBottom = computed(() =>
    needsCornerGap.value ? TRACK_EDGE_OFFSET + trackHeightHPx.value + CORNER_GAP : TRACK_EDGE_OFFSET,
  );

  const hTrackInsetRight = computed(() =>
    needsCornerGap.value ? TRACK_EDGE_OFFSET + trackWidthVPx.value + CORNER_GAP : TRACK_EDGE_OFFSET,
  );

  const vTrackLength = computed(() =>
    Math.max(0, clientHeight.value - vTrackInsetTop.value - vTrackInsetBottom.value),
  );
  const hTrackLength = computed(() => Math.max(0, clientWidth.value - hTrackInsetRight.value - TRACK_EDGE_OFFSET));

  const thumbHeightV = computed(() => {
    if (!scrollHeight.value || !vTrackLength.value) {
      return 0;
    }

    const cfgThumb = vOpts.value.thumbHeight;
    const minHeight = Number(vOpts.value.thumbMinHeight ?? 32);
    if (cfgThumb && cfgThumb !== 'auto') {
      const fixedNum = Number(cfgThumb);
      return Math.max(isNaN(fixedNum) ? minHeight : fixedNum, minHeight);
    }

    const ratio = clientHeight.value / scrollHeight.value;
    const calculated = vTrackLength.value * ratio;
    return Math.min(vTrackLength.value, Math.max(minHeight, calculated));
  });

  const thumbWidthH = computed(() => {
    if (!scrollWidth.value || !hTrackLength.value) {
      return 0;
    }

    const cfgThumb = hOpts.value.thumbWidth;
    const minWidth = Number(hOpts.value.thumbMinWidth ?? 32);
    if (cfgThumb && cfgThumb !== 'auto') {
      const fixedNum = Number(cfgThumb);
      return Math.max(isNaN(fixedNum) ? minWidth : fixedNum, minWidth);
    }

    const ratio = clientWidth.value / scrollWidth.value;
    const calculated = hTrackLength.value * ratio;
    return Math.min(hTrackLength.value, Math.max(minWidth, calculated));
  });

  const thumbTopV = computed(() => {
    if (!scrollHeight.value || scrollHeight.value === clientHeight.value || !vTrackLength.value) {
      return 0;
    }

    const maxScrollTop = scrollHeight.value - clientHeight.value;
    const maxThumbTop = Math.max(0, vTrackLength.value - thumbHeightV.value);
    if (!maxScrollTop || !maxThumbTop) {
      return 0;
    }

    return (scrollTop.value / maxScrollTop) * maxThumbTop;
  });

  const thumbLeftH = computed(() => {
    if (!scrollWidth.value || scrollWidth.value === clientWidth.value || !hTrackLength.value) {
      return 0;
    }

    const maxScrollLeft = scrollWidth.value - clientWidth.value;
    const maxThumbLeft = Math.max(0, hTrackLength.value - thumbWidthH.value);
    if (!maxScrollLeft || !maxThumbLeft) {
      return 0;
    }

    return (scrollLeft.value / maxScrollLeft) * maxThumbLeft;
  });

  const trackRadiusVCss = computed(() => {
    const num = Number(vOpts.value.trackRadius);
    return isNaN(num) ? String(vOpts.value.trackRadius ?? 4) : `${num}px`;
  });
  const trackColorVCss = computed(() => vOpts.value.trackColor ?? 'transparent');
  const thumbRadiusVCss = computed(() => {
    const num = Number(vOpts.value.thumbRadius);
    return isNaN(num) ? String(vOpts.value.thumbRadius ?? 4) : `${num}px`;
  });
  const thumbColorVCss = computed(() => vOpts.value.thumbColor ?? 'var(--color-bg-control-accent-default)');
  const thumbHoverColorVCss = computed(() => vOpts.value.thumbHoverColor ?? 'var(--color-bg-control-accent-hover)');
  const thumbActiveColorVCss = computed(() => vOpts.value.thumbActiveColor ?? 'var(--color-bg-control-accent-focused)');
  const trackWidthVCss = computed(() => {
    const num = Number(vOpts.value.trackWidth);
    return isNaN(num) ? String(vOpts.value.trackWidth ?? 6) : `${num}px`;
  });

  const trackRadiusHCss = computed(() => {
    const num = Number(hOpts.value.trackRadius);
    return isNaN(num) ? String(hOpts.value.trackRadius ?? 4) : `${num}px`;
  });
  const trackColorHCss = computed(() => hOpts.value.trackColor ?? 'transparent');
  const thumbRadiusHCss = computed(() => {
    const num = Number(hOpts.value.thumbRadius);
    return isNaN(num) ? String(hOpts.value.thumbRadius ?? 4) : `${num}px`;
  });
  const thumbColorHCss = computed(() => hOpts.value.thumbColor ?? 'var(--color-bg-control-accent-default)');
  const thumbHoverColorHCss = computed(() => hOpts.value.thumbHoverColor ?? 'var(--color-bg-control-accent-hover)');
  const thumbActiveColorHCss = computed(() => hOpts.value.thumbActiveColor ?? 'var(--color-bg-control-accent-focused)');
  const trackHeightHCss = computed(() => {
    const num = Number(hOpts.value.trackHeight);
    return isNaN(num) ? String(hOpts.value.trackHeight ?? 6) : `${num}px`;
  });

  function updateMetrics() {
    const el = containerRef.value;
    if (!el) {
      return;
    }

    scrollHeight.value = el.scrollHeight;
    clientHeight.value = el.clientHeight;
    scrollTop.value = el.scrollTop;
    scrollWidth.value = el.scrollWidth;
    clientWidth.value = el.clientWidth;
    scrollLeft.value = el.scrollLeft;
  }

  function emitScroll(event: Event) {
    const payload: Ui3nScrollbarScrollPayload = {
      event,
      scrollTop: scrollTop.value,
      scrollLeft: scrollLeft.value,
    };

    emits('scroll', payload);

    if (scrollTop.value !== prevScrollTop.value) {
      emits('scroll:vertical', payload);
    }
    if (scrollLeft.value !== prevScrollLeft.value) {
      emits('scroll:horizontal', payload);
    }

    prevScrollTop.value = scrollTop.value;
    prevScrollLeft.value = scrollLeft.value;
  }

  function onScroll(event: Event) {
    if (!isDraggingV.value) {
      scrollTop.value = (event.target as HTMLDivElement).scrollTop;
    }
    if (!isDraggingH.value) {
      scrollLeft.value = (event.target as HTMLDivElement).scrollLeft;
    }

    isScrollingNow.value = true;
    clearTimeout(scrollTimeout);

    emitScroll(event);

    scrollTimeout = setTimeout(() => {
      isScrollingNow.value = false;
    }, 1500);
  }

  function onVTrackClick(e: MouseEvent) {
    if (e.target !== trackRefV.value || !containerRef.value || !trackRefV.value) {
      return;
    }

    const trackRect = trackRefV.value.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const targetThumbTop = clickY - thumbHeightV.value / 2;
    const maxScrollTop = scrollHeight.value - clientHeight.value;
    const maxThumbTop = Math.max(0, vTrackLength.value - thumbHeightV.value);
    if (!maxThumbTop || !maxScrollTop) {
      return;
    }

    let targetScrollTop = (targetThumbTop / maxThumbTop) * maxScrollTop;
    targetScrollTop = Math.max(0, Math.min(maxScrollTop, targetScrollTop));

    containerRef.value.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  }

  function onHTrackClick(e: MouseEvent) {
    if (e.target !== trackRefH.value || !containerRef.value || !trackRefH.value) {
      return;
    }

    const trackRect = trackRefH.value.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const targetThumbLeft = clickX - thumbWidthH.value / 2;
    const maxScrollLeft = scrollWidth.value - clientWidth.value;
    const maxThumbLeft = Math.max(0, hTrackLength.value - thumbWidthH.value);
    if (!maxThumbLeft || !maxScrollLeft) {
      return;
    }

    let targetScrollLeft = (targetThumbLeft / maxThumbLeft) * maxScrollLeft;
    targetScrollLeft = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft));

    containerRef.value.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  }

  function onVThumbPointerDown(e: PointerEvent) {
    if (!thumbRefV.value || !containerRef.value) {
      return;
    }

    if (e.pointerType === 'mouse') {
      e.preventDefault();
    }
    e.stopPropagation();

    thumbRefV.value.setPointerCapture(e.pointerId);

    isDraggingV.value = true;
    startY = e.clientY;
    startScrollTop = scrollTop.value;

    document.body.style.userSelect = 'none';

    thumbRefV.value.addEventListener('pointermove', onVThumbPointerMove);
    thumbRefV.value.addEventListener('pointerup', onVThumbPointerUp);
    thumbRefV.value.addEventListener('pointercancel', onVThumbPointerUp);
  }

  function onVThumbPointerMove(e: PointerEvent) {
    if (!isDraggingV.value || !containerRef.value || !trackRefV.value) {
      return;
    }

    const deltaY = e.clientY - startY;
    const maxScrollTop = scrollHeight.value - clientHeight.value;
    const maxThumbTop = Math.max(0, vTrackLength.value - thumbHeightV.value);
    if (!maxThumbTop || !maxScrollTop) {
      return;
    }

    const scrollDelta = (deltaY / maxThumbTop) * maxScrollTop;
    containerRef.value.scrollTop = startScrollTop + scrollDelta;
    scrollTop.value = containerRef.value.scrollTop;
  }

  function onVThumbPointerUp() {
    if (!isDraggingV.value) {
      return;
    }

    isDraggingV.value = false;
    document.body.style.userSelect = '';

    if (thumbRefV.value) {
      thumbRefV.value.removeEventListener('pointermove', onVThumbPointerMove);
      thumbRefV.value.removeEventListener('pointerup', onVThumbPointerUp);
      thumbRefV.value.removeEventListener('pointercancel', onVThumbPointerUp);
    }
  }

  function onHThumbPointerDown(e: PointerEvent) {
    if (!thumbRefH.value || !containerRef.value) {
      return;
    }

    if (e.pointerType === 'mouse') {
      e.preventDefault();
    }
    e.stopPropagation();

    thumbRefH.value.setPointerCapture(e.pointerId);

    isDraggingH.value = true;
    startX = e.clientX;
    startScrollLeft = scrollLeft.value;

    document.body.style.userSelect = 'none';

    thumbRefH.value.addEventListener('pointermove', onHThumbPointerMove);
    thumbRefH.value.addEventListener('pointerup', onHThumbPointerUp);
    thumbRefH.value.addEventListener('pointercancel', onHThumbPointerUp);
  }

  function onHThumbPointerMove(e: PointerEvent) {
    if (!isDraggingH.value || !containerRef.value || !trackRefH.value) {
      return;
    }

    const deltaX = e.clientX - startX;
    const maxScrollLeft = scrollWidth.value - clientWidth.value;
    const maxThumbLeft = Math.max(0, hTrackLength.value - thumbWidthH.value);
    if (!maxThumbLeft || !maxScrollLeft) {
      return;
    }

    const scrollDelta = (deltaX / maxThumbLeft) * maxScrollLeft;
    containerRef.value.scrollLeft = startScrollLeft + scrollDelta;
    scrollLeft.value = containerRef.value.scrollLeft;
  }

  function onHThumbPointerUp() {
    if (!isDraggingH.value) {
      return;
    }

    isDraggingH.value = false;
    document.body.style.userSelect = '';

    if (thumbRefH.value) {
      thumbRefH.value.removeEventListener('pointermove', onHThumbPointerMove);
      thumbRefH.value.removeEventListener('pointerup', onHThumbPointerUp);
      thumbRefH.value.removeEventListener('pointercancel', onHThumbPointerUp);
    }
  }

  onMounted(() => {
    updateMetrics();

    if (props.autoUpdate) {
      resizeObserver = new ResizeObserver(updateMetrics);
      resizeObserver.observe(containerRef.value!);

      const firstChild = containerRef.value?.firstElementChild;
      if (firstChild) {
        resizeObserver.observe(firstChild);
      }
    }
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    scrollTimeout && clearTimeout(scrollTimeout);

    if (thumbRefV.value) {
      thumbRefV.value.removeEventListener('pointermove', onVThumbPointerMove);
      thumbRefV.value.removeEventListener('pointerup', onVThumbPointerUp);
      thumbRefV.value.removeEventListener('pointercancel', onVThumbPointerUp);
    }
    if (thumbRefH.value) {
      thumbRefH.value.removeEventListener('pointermove', onHThumbPointerMove);
      thumbRefH.value.removeEventListener('pointerup', onHThumbPointerUp);
      thumbRefH.value.removeEventListener('pointercancel', onHThumbPointerUp);
    }

    document.body.style.userSelect = '';
  });

  defineExpose<Ui3nScrollbarExpose>({
    scrollTo: (options: ScrollToOptions) => {
      containerRef.value?.scrollTo(options);
    },
    scrollToVertical: (options = {}) => {
      const container = containerRef.value;
      if (!container) {
        return;
      }

      const opts: ScrollToOptions = {};
      if (typeof options.top === 'number') {
        opts.top = options.top;
      }
      if (options.behavior) {
        opts.behavior = options.behavior;
      }
      container.scrollTo(opts);
    },
    scrollToHorizontal: (options = {}) => {
      const container = containerRef.value;
      if (!container) {
        return;
      }

      const opts: ScrollToOptions = {};
      if (typeof options.left === 'number') {
        opts.left = options.left;
      }
      if (options.behavior) {
        opts.behavior = options.behavior;
      }
      container.scrollTo(opts);
    },
    getContainer: () => containerRef.value!,
    updateMetrics,
  });
</script>

<template>
  <div
    :class="$style.ui3nScrollbar"
    :style="{
      '--ui3n-scrollbar-vertical-thumb-radius': thumbRadiusVCss,
      '--ui3n-scrollbar-vertical-thumb-color': thumbColorVCss,
      '--ui3n-scrollbar-vertical-thumb-hover-color': thumbHoverColorVCss,
      '--ui3n-scrollbar-vertical-thumb-active-color': thumbActiveColorVCss,
      '--ui3n-scrollbar-vertical-track-width': trackWidthVCss,
      '--ui3n-scrollbar-vertical-track-radius': trackRadiusVCss,
      '--ui3n-scrollbar-vertical-track-color': trackColorVCss,
      '--ui3n-scrollbar-horizontal-thumb-radius': thumbRadiusHCss,
      '--ui3n-scrollbar-horizontal-thumb-color': thumbColorHCss,
      '--ui3n-scrollbar-horizontal-thumb-hover-color': thumbHoverColorHCss,
      '--ui3n-scrollbar-horizontal-thumb-active-color': thumbActiveColorHCss,
      '--ui3n-scrollbar-horizontal-track-height': trackHeightHCss,
      '--ui3n-scrollbar-horizontal-track-radius': trackRadiusHCss,
      '--ui3n-scrollbar-horizontal-track-color': trackColorHCss,
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      ref="containerRef"
      :class="[
        $style.scrollbarContainer,
        axes === 'vertical' && $style.scrollbarContainerVertical,
        axes === 'horizontal' && $style.scrollbarContainerHorizontal,
      ]"
      @scroll="onScroll"
    >
      <slot />
    </div>

    <div
      v-if="showVerticalTrack"
      ref="trackRefV"
      :class="[$style.trackVertical, { [$style.trackVisible]: isBarVisibleY }]"
      :style="{ top: `${vTrackInsetTop}px`, bottom: `${vTrackInsetBottom}px` }"
      @mousedown="onVTrackClick"
    >
      <div
        ref="thumbRefV"
        :class="[$style.thumbVertical, { [$style.active]: isDraggingV }]"
        :style="{
          height: `${thumbHeightV}px`,
          transform: `translateY(${thumbTopV}px)`,
        }"
        @pointerdown="onVThumbPointerDown"
      />
    </div>

    <div
      v-if="showHorizontalTrack"
      ref="trackRefH"
      :class="[$style.trackHorizontal, { [$style.trackVisible]: isBarVisibleX }]"
      :style="{ right: `${hTrackInsetRight}px` }"
      @mousedown="onHTrackClick"
    >
      <div
        ref="thumbRefH"
        :class="[$style.thumbHorizontal, { [$style.active]: isDraggingH }]"
        :style="{
          width: `${thumbWidthH}px`,
          transform: `translateX(${thumbLeftH}px)`,
        }"
        @pointerdown="onHThumbPointerDown"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nScrollbar {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .scrollbarContainer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  }

  .scrollbarContainerVertical {
    overflow-x: hidden;
  }

  .scrollbarContainerHorizontal {
    overflow-y: hidden;
  }

  .trackVertical {
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    width: var(--ui3n-scrollbar-vertical-track-width);
    background: var(--ui3n-scrollbar-vertical-track-color);
    border-radius: var(--ui3n-scrollbar-vertical-track-radius);
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  .trackHorizontal {
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 2px;
    height: var(--ui3n-scrollbar-horizontal-track-height);
    background: var(--ui3n-scrollbar-horizontal-track-color);
    border-radius: var(--ui3n-scrollbar-horizontal-track-radius);
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  .trackVisible {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }

  .thumbVertical {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: var(--ui3n-scrollbar-vertical-thumb-radius);
    background-color: var(--ui3n-scrollbar-vertical-thumb-color);
    cursor: pointer;
    transition: background-color 0.15s ease;
    touch-action: none;

    &:hover {
      background-color: var(--ui3n-scrollbar-vertical-thumb-hover-color);
    }

    &:active,
    &.active {
      background-color: var(--ui3n-scrollbar-vertical-thumb-active-color);
    }
  }

  .thumbHorizontal {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: var(--ui3n-scrollbar-horizontal-thumb-radius);
    background-color: var(--ui3n-scrollbar-horizontal-thumb-color);
    cursor: pointer;
    transition: background-color 0.15s ease;
    touch-action: none;

    &:hover {
      background-color: var(--ui3n-scrollbar-horizontal-thumb-hover-color);
    }

    &:active,
    &.active {
      background-color: var(--ui3n-scrollbar-horizontal-thumb-active-color);
    }
  }
</style>
