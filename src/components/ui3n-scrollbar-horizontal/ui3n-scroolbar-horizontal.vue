<script lang="ts" setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import type {
    Ui3nScrollbarHorizontalProps,
    Ui3nScrollbarHorizontalEmits,
    Ui3nScrollbarHorizontalSlots,
    Ui3nScrollbarHorizontalExpose,
  } from './types';

  const MIN_WIDTH = 40;

  const props = withDefaults(defineProps<Ui3nScrollbarHorizontalProps>(), {
    thumbMinWidth: MIN_WIDTH,
    thumbWidth: 'auto',
    thumbRadius: 4,
    thumbColor: 'var(--color-bg-control-accent-default)',
    thumbHoverColor: 'var(--color-bg-control-accent-hover)',
    thumbActiveColor: 'var(--color-bg-control-accent-focused)',
    trackHeight: 6,
    trackColor: 'transparent',
  });

  const emits = defineEmits<Ui3nScrollbarHorizontalEmits>();
  defineSlots<Ui3nScrollbarHorizontalSlots>();

  const containerRef = ref<HTMLDivElement | null>(null);
  const trackRef = ref<HTMLDivElement | null>(null);
  const thumbRef = ref<HTMLDivElement | null>(null);

  const scrollWidth = ref(0);
  const clientWidth = ref(0);
  const scrollLeft = ref(0);

  const isDragging = ref(false);
  const isHovered = ref(false);
  const isScrollingNow = ref(false);

  let resizeObserver: ResizeObserver | null = null;
  let scrollTimeout: number | undefined;
  let startX = 0;
  let startScrollLeft = 0;

  const isScrollable = computed(() => scrollWidth.value > clientWidth.value);

  const isBarVisible = computed(() => {
    if (isDragging.value) {
      return true;
    }

    return isScrollable.value && (isHovered.value || isScrollingNow.value);
  });

  const minWidth = computed(() => {
    const num = Number(props.thumbMinWidth);
    return isNaN(num) ? MIN_WIDTH : num;
  });

  const thumbWidth = computed(() => {
    if (!scrollWidth.value) {
      return 0;
    }

    if (props.thumbWidth !== 'auto') {
      const fixedNum = Number(props.thumbWidth);
      return isNaN(fixedNum) ? minWidth.value : fixedNum;
    }

    const ratio = clientWidth.value / scrollWidth.value;
    const calculated = clientWidth.value * ratio;
    return Math.max(minWidth.value, calculated);
  });

  const thumbLeft = computed(() => {
    if (!scrollWidth.value || scrollWidth.value === clientWidth.value) {
      return 0;
    }

    const maxScrollLeft = scrollWidth.value - clientWidth.value;
    const maxThumbLeft = clientWidth.value - thumbWidth.value;
    return (scrollLeft.value / maxScrollLeft) * maxThumbLeft;
  });

  const thumbRadiusCss = computed(() => {
    const num = Number(props.thumbRadius);
    return isNaN(num) ? String(props.thumbRadius) : `${num}px`;
  });
  const thumbColorCss = computed(() => props.thumbColor);
  const thumbHoverColorCss = computed(() => props.thumbHoverColor);
  const thumbActiveColorCss = computed(() => props.thumbActiveColor);
  const trackHeightCss = computed(() => {
    const num = Number(props.trackHeight);
    return isNaN(num) ? String(props.trackHeight) : `${num}px`;
  });
  const trackColorCss = computed(() => props.trackColor);

  function updateMetrics() {
    if (!containerRef.value) {
      return;
    }

    scrollWidth.value = containerRef.value.scrollWidth;
    clientWidth.value = containerRef.value.clientWidth;
    scrollLeft.value = containerRef.value.scrollLeft;
  }

  function onScroll(event: Event) {
    if (!isDragging.value) {
      scrollLeft.value = (event.target as HTMLDivElement).scrollLeft;
    }

    isScrollingNow.value = true;
    window.clearTimeout(scrollTimeout);

    scrollTimeout = window.setTimeout(() => {
      isScrollingNow.value = false;
    }, 1500);

    emits('scroll', event);
  }

  function onTrackClick(e: MouseEvent) {
    if (e.target !== trackRef.value || !containerRef.value || !trackRef.value) {
      return;
    }

    const trackRect = trackRef.value.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const targetThumbLeft = clickX - thumbWidth.value / 2;
    const maxScrollLeft = scrollWidth.value - clientWidth.value;
    const maxThumbLeft = clientWidth.value - thumbWidth.value;

    let targetScrollLeft = (targetThumbLeft / maxThumbLeft) * maxScrollLeft;
    targetScrollLeft = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft));

    containerRef.value.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  }

  function onThumbPointerDown(e: PointerEvent) {
    if (!thumbRef.value || !containerRef.value) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    thumbRef.value.setPointerCapture(e.pointerId);

    isDragging.value = true;
    startX = e.clientX;
    startScrollLeft = scrollLeft.value;

    document.body.style.userSelect = 'none';

    thumbRef.value.addEventListener('pointermove', onThumbPointerMove);
    thumbRef.value.addEventListener('pointerup', onThumbPointerUp);
    thumbRef.value.addEventListener('pointercancel', onThumbPointerUp);
  }

  function onThumbPointerMove(e: PointerEvent) {
    if (!isDragging.value || !containerRef.value) {
      return;
    }

    const deltaX = e.clientX - startX;
    const maxScrollLeft = scrollWidth.value - clientWidth.value;
    const maxThumbLeft = clientWidth.value - thumbWidth.value;

    const scrollDelta = (deltaX / maxThumbLeft) * maxScrollLeft;
    containerRef.value.scrollLeft = startScrollLeft + scrollDelta;
    scrollLeft.value = containerRef.value.scrollLeft;
  }

  function onThumbPointerUp(e: PointerEvent) {
    if (!isDragging.value) {
      return;
    }

    isDragging.value = false;
    document.body.style.userSelect = '';

    if (thumbRef.value) {
      try {
        thumbRef.value.releasePointerCapture(e.pointerId);
      } catch (err) {}
      thumbRef.value.removeEventListener('pointermove', onThumbPointerMove);
      thumbRef.value.removeEventListener('pointerup', onThumbPointerUp);
      thumbRef.value.removeEventListener('pointercancel', onThumbPointerUp);
    }
  }

  onMounted(() => {
    updateMetrics();
    if (containerRef.value) {
      resizeObserver = new ResizeObserver(updateMetrics);
      resizeObserver.observe(containerRef.value);

      if (containerRef.value.firstElementChild) {
        resizeObserver.observe(containerRef.value.firstElementChild);
      }
    }
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    window.clearTimeout(scrollTimeout);

    if (thumbRef.value) {
      thumbRef.value.removeEventListener('pointermove', onThumbPointerMove);
      thumbRef.value.removeEventListener('pointerup', onThumbPointerUp);
      thumbRef.value.removeEventListener('pointercancel', onThumbPointerUp);
    }
    document.body.style.userSelect = '';
  });

  defineExpose<Ui3nScrollbarHorizontalExpose>({
    scrollTo: (options: ScrollToOptions) => {
      containerRef.value?.scrollTo(options);
    },
    getContainer: () => containerRef.value!,
  });
</script>

<template>
  <div
    :class="$style.ui3nScrollbarHorizontal"
    :style="{
      '--ui3n-scrollbar-horizontal-thumb-radius': thumbRadiusCss,
      '--ui3n-scrollbar-horizontal-thumb-color': thumbColorCss,
      '--ui3n-scrollbar-horizontal-thumb-hover-color': thumbHoverColorCss,
      '--ui3n-scrollbar-horizontal-thumb-active-color': thumbActiveColorCss,
      '--ui3n-scrollbar-horizontal-track-height': trackHeightCss,
      '--ui3n-scrollbar-horizontal-track-color': trackColorCss,
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      ref="containerRef"
      :class="$style.scrollbarContainer"
      @scroll="onScroll"
    >
      <slot />
    </div>

    <div
      ref="trackRef"
      :class="[$style.track, { [$style.trackVisible]: isBarVisible }]"
      @mousedown="onTrackClick"
    >
      <div
        ref="thumbRef"
        :class="[$style.thumb, { [$style.active]: isDragging }]"
        :style="{
          width: `${thumbWidth}px`,
          transform: `translateX(${thumbLeft}px)`,
        }"
        @pointerdown="onThumbPointerDown"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nScrollbarHorizontal {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .scrollbarContainer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  }

  .track {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: var(--ui3n-scrollbar-horizontal-track-height);
    background: var(--ui3n-scrollbar-horizontal-track-color);
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

  .thumb {
    position: absolute;
    top: 0;
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
