<script lang="ts" setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import type {
    Ui3nScrollbarVerticalProps,
    Ui3nScrollbarVerticalEmits,
    Ui3nScrollbarVerticalSlots,
    Ui3nScrollbarVerticalExpose,
  } from './types';

  const MIN_HEIGHT = 32;

  const props = withDefaults(defineProps<Ui3nScrollbarVerticalProps>(), {
    thumbMinHeight: MIN_HEIGHT,
    thumbHeight: 'auto',
    thumbRadius: 4,
    thumbColor: 'var(--color-bg-control-accent-default)',
    thumbHoverColor: 'var(--color-bg-control-accent-hover)',
    thumbActiveColor: 'var(--color-bg-control-accent-focused)',
    trackWidth: 6,
    trackRadius: 4,
    trackColor: 'transparent',
    autoUpdate: true,
  });
  const emits = defineEmits<Ui3nScrollbarVerticalEmits>();
  defineSlots<Ui3nScrollbarVerticalSlots>();

  const containerRef = ref<HTMLDivElement | null>(null);
  const trackRef = ref<HTMLDivElement | null>(null);
  const thumbRef = ref<HTMLDivElement | null>(null);

  const scrollHeight = ref(0);
  const clientHeight = ref(0);
  const scrollTop = ref(0);

  const isDragging = ref(false);
  const isHovered = ref(false);
  const isScrollingNow = ref(false);

  let resizeObserver: ResizeObserver | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
  let startY = 0;
  let startScrollTop = 0;

  const isScrollable = computed(() => scrollHeight.value > clientHeight.value);

  const isBarVisible = computed(() => {
    if (isDragging.value) {
      return true;
    }
    return isScrollable.value && (isHovered.value || isScrollingNow.value);
  });

  const minHeight = computed(() => {
    const num = Number(props.thumbMinHeight);
    return isNaN(num) ? MIN_HEIGHT : num;
  });

  const thumbHeight = computed(() => {
    if (!scrollHeight.value) {
      return 0;
    }

    if (props.thumbHeight !== 'auto') {
      const fixedNum = Number(props.thumbHeight);
      return isNaN(fixedNum) ? minHeight.value : fixedNum;
    }

    const ratio = clientHeight.value / scrollHeight.value;
    const calculated = clientHeight.value * ratio;
    return Math.max(minHeight.value, calculated);
  });

  const thumbTop = computed(() => {
    if (!scrollHeight.value || scrollHeight.value === clientHeight.value) {
      return 0;
    }

    const maxScrollTop = scrollHeight.value - clientHeight.value;
    const maxThumbTop = clientHeight.value - thumbHeight.value;
    return (scrollTop.value / maxScrollTop) * maxThumbTop;
  });

  const thumbRadiusCss = computed(() => {
    const num = Number(props.thumbRadius);
    return isNaN(num) ? String(props.thumbRadius) : `${num}px`;
  });
  const thumbColorCss = computed(() => props.thumbColor);
  const thumbHoverColorCss = computed(() => props.thumbHoverColor);
  const thumbActiveColorCss = computed(() => props.thumbActiveColor);
  const trackWidthCss = computed(() => {
    const num = Number(props.trackWidth);
    return isNaN(num) ? String(props.trackWidth) : `${num}px`;
  });
  const trackColorCss = computed(() => props.trackColor);
  const trackRadiusCss = computed(() => {
    const num = Number(props.trackRadius);
    return isNaN(num) ? String(props.trackRadius) : `${num}px`;
  });

  function updateMetrics() {
    if (!containerRef.value) {
      return;
    }

    scrollHeight.value = containerRef.value.scrollHeight;
    clientHeight.value = containerRef.value.clientHeight;
    scrollTop.value = containerRef.value.scrollTop;
  }

  function onScroll(event: Event) {
    if (!isDragging.value) {
      scrollTop.value = (event.target as HTMLDivElement).scrollTop;
    }

    isScrollingNow.value = true;
    scrollTimeout && clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      isScrollingNow.value = false;
    }, 1500);

    emits('scroll', event);
  }

  function onTrackClick(e: MouseEvent) {
    if (e.target !== trackRef.value || !containerRef.value || !trackRef.value) {
      return;
    }

    const trackRect = trackRef.value.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const targetThumbTop = clickY - thumbHeight.value / 2;
    const maxScrollTop = scrollHeight.value - clientHeight.value;
    const maxThumbTop = clientHeight.value - thumbHeight.value;

    let targetScrollTop = (targetThumbTop / maxThumbTop) * maxScrollTop;
    targetScrollTop = Math.max(0, Math.min(maxScrollTop, targetScrollTop));

    containerRef.value.scrollTo({
      top: targetScrollTop,
    });
  }

  function onThumbPointerDown(e: PointerEvent) {
    if (!thumbRef.value || !containerRef.value) {
      return;
    }

    if (e.pointerType === 'mouse') {
      e.preventDefault();
    }
    e.stopPropagation();

    thumbRef.value.setPointerCapture(e.pointerId);

    isDragging.value = true;
    startY = e.clientY;
    startScrollTop = scrollTop.value;

    document.body.style.userSelect = 'none';

    thumbRef.value.addEventListener('pointermove', onThumbPointerMove);
    thumbRef.value.addEventListener('pointerup', onThumbPointerUp);
    thumbRef.value.addEventListener('pointercancel', onThumbPointerUp);
  }

  function onThumbPointerMove(e: PointerEvent) {
    if (!isDragging.value || !containerRef.value) {
      return;
    }

    const deltaY = e.clientY - startY;
    const maxScrollTop = scrollHeight.value - clientHeight.value;
    const maxThumbTop = clientHeight.value - thumbHeight.value;

    const scrollDelta = (deltaY / maxThumbTop) * maxScrollTop;
    containerRef.value.scrollTop = startScrollTop + scrollDelta;
    scrollTop.value = containerRef.value.scrollTop;
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

      if (props.autoUpdate && containerRef.value.firstElementChild) {
        resizeObserver.observe(containerRef.value.firstElementChild);
      }
    }
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    scrollTimeout && clearTimeout(scrollTimeout);

    if (thumbRef.value) {
      thumbRef.value.removeEventListener('pointermove', onThumbPointerMove);
      thumbRef.value.removeEventListener('pointerup', onThumbPointerUp);
      thumbRef.value.removeEventListener('pointercancel', onThumbPointerUp);
    }

    document.body.style.userSelect = '';
  });

  defineExpose<Ui3nScrollbarVerticalExpose>({
    scrollTo: (options: ScrollToOptions) => {
      containerRef.value?.scrollTo(options);
    },
    getContainer: () => containerRef.value!,
    updateMetrics,
  });
</script>

<template>
  <div
    :class="$style.ui3nScrollbarVertical"
    :style="{
      '--ui3n-scrollbar-thumb-radius': thumbRadiusCss,
      '--ui3n-scrollbar-thumb-color': thumbColorCss,
      '--ui3n-scrollbar-thumb-hover-color': thumbHoverColorCss,
      '--ui3n-scrollbar-thumb-active-color': thumbActiveColorCss,
      '--ui3n-scrollbar-track-width': trackWidthCss,
      '--ui3n-scrollbar-track-radius': trackRadiusCss,
      '--ui3n-scrollbar-track-color': trackColorCss,
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
      @pointerdown="onTrackClick"
    >
      <div
        ref="thumbRef"
        :class="[$style.thumb, { [$style.active]: isDragging }]"
        :style="{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
        }"
        @pointerdown="onThumbPointerDown"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nScrollbarVertical {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: visible;
    overflow-y: hidden;
  }

  .scrollbarContainer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: visible;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  }

  .track {
    position: absolute;
    top: 0;
    right: 2px;
    bottom: 0;
    width: var(--ui3n-scrollbar-track-width);
    background: var(--ui3n-scrollbar-track-color);
    border-radius: var(--ui3n-scrollbar-track-radius);
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
    left: 0;
    width: 100%;
    border-radius: var(--ui3n-scrollbar-thumb-radius);
    background-color: var(--ui3n-scrollbar-thumb-color);
    cursor: pointer;
    transition: background-color 0.15s ease;
    touch-action: none;

    &:hover {
      background-color: var(--ui3n-scrollbar-thumb-hover-color);
    }

    &:active,
    &.active {
      background-color: var(--ui3n-scrollbar-thumb-active-color);
    }
  }
</style>
