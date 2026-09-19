<script lang="ts" setup>
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { arrow, autoUpdate, offset, useFloating } from '@floating-ui/vue';
  import { toCssLength } from '../../utils/ui/to-css-length';
  import type { Nullable } from '../../types';
  import type { Ui3nTooltipProps, Ui3nTooltipEmits, Ui3nTooltipSlots } from './types';

  const baseOffset = 5;

  const props = withDefaults(defineProps<Ui3nTooltipProps>(), {
    placement: 'top',
    positionStrategy: 'absolute',
    offsetX: 0,
    offsetY: 0,
    trigger: 'hover',
    disabled: false,
  });
  const emits = defineEmits<Ui3nTooltipEmits>();
  defineSlots<Ui3nTooltipSlots>();

  const showTooltip = ref(false);
  const referenceContainer = ref<Nullable<HTMLElement>>(null);
  const floatingEl = ref<Nullable<HTMLElement>>(null);
  const floatingArrowEl = ref<Nullable<HTMLElement>>(null);

  const isClient = ref(false);

  const mainPlacement = computed(() => {
    const [part1] = props.placement.split('-');
    return part1;
  });

  const offsetOptions = computed(() => {
    const options = { mainAxis: 0, crossAxis: 0 };
    switch (mainPlacement.value) {
      case 'top':
        options.mainAxis = -1 * Number(props.offsetY) + baseOffset;
        options.crossAxis = Number(props.offsetX);
        break;
      case 'bottom':
        options.mainAxis = Number(props.offsetY) + baseOffset;
        options.crossAxis = Number(props.offsetX);
        break;
      case 'left':
        options.mainAxis = -1 * Number(props.offsetX) + baseOffset;
        options.crossAxis = Number(props.offsetY);
        break;
      case 'right':
        options.mainAxis = Number(props.offsetX) + baseOffset;
        options.crossAxis = Number(props.offsetY);
        break;
    }
    return options;
  });

  const middlewareComputed = computed(() => [
    offset(offsetOptions.value),
    arrow({ element: floatingArrowEl, padding: 8 }),
  ]);

  const { floatingStyles, isPositioned, middlewareData } = useFloating(referenceContainer, floatingEl, {
    open: showTooltip,
    placement: props.placement,
    strategy: props.positionStrategy,
    middleware: middlewareComputed,
    whileElementsMounted: props.positionStrategy === 'fixed' ? autoUpdate : undefined,
  });

  /* colours and the maximum width default in CSS, so a stylesheet can change them */
  const tooltipStylesComputed = computed(() => {
    const styles: Record<string, string> = {
      ...floatingStyles.value,
      '--ui3n-tooltip-arrow-size': `${baseOffset}px`,
      '--ui3n-tooltip-base-offset': `${-baseOffset}px`,
    };

    if (props.color) {
      styles['--ui3n-tooltip-bg-color'] = props.color;
    }

    if (props.textColor) {
      styles['--ui3n-tooltip-text-color'] = props.textColor;
    }

    if (props.maxContentWidth !== undefined) {
      styles['--ui3n-tooltip-max-width'] = toCssLength(props.maxContentWidth);
    }

    return styles;
  });

  function onMouseenter() {
    if (props.disabled) {
      return;
    }

    showTooltip.value = true;
    emits('open');
    emits('update:modelValue', true);
  }

  function onMouseleave() {
    if (props.disabled && !showTooltip.value) {
      return;
    }

    showTooltip.value = false;
    emits('close');
    emits('update:modelValue', false);
  }

  function onClick() {
    if (props.disabled && !showTooltip.value) {
      return;
    }

    if (showTooltip.value) {
      onMouseleave();
    } else {
      onMouseenter();
    }
  }

  function removeEventListeners() {
    if (!referenceContainer.value) {
      return;
    }

    referenceContainer.value.removeEventListener('mouseenter', onMouseenter);
    referenceContainer.value.removeEventListener('mouseleave', onMouseleave);
    referenceContainer.value.removeEventListener('click', onClick);
  }

  function setupEventListeners() {
    removeEventListeners();
    if (!referenceContainer.value || props.disabled) {
      return;
    }

    if (props.trigger === 'hover') {
      referenceContainer.value.addEventListener('mouseenter', onMouseenter);
      referenceContainer.value.addEventListener('mouseleave', onMouseleave);
    } else if (props.trigger === 'click') {
      referenceContainer.value.addEventListener('click', onClick);
    }
  }

  onMounted(() => {
    isClient.value = true;
    setupEventListeners();
  });

  onBeforeUnmount(() => {
    removeEventListeners();
  });

  watch([() => props.trigger, () => props.disabled], () => {
    setupEventListeners();
  });

  watch(
    () => props.modelValue,
    val => props.trigger === 'manual' && (showTooltip.value = val),
    { immediate: true },
  );

  watch(isPositioned, val => {
    val ? emits('opened') : emits('closed');
  });
</script>

<template>
  <div
    ref="referenceContainer"
    data-ui3n="tooltip"
    :class="$style.container"
  >
    <slot />
  </div>

  <div
    v-if="showTooltip"
    ref="floatingEl"
    data-ui3n="tooltip-content"
    :class="$style.floating"
    :style="tooltipStylesComputed"
  >
    <slot name="content">
      <div :class="$style.content">
        {{ content }}
        <div
          ref="floatingArrowEl"
          :class="[$style.arrow, $style[`arrow-${mainPlacement}`]]"
          :style="{
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow?.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow?.y}px` : '',
          }"
        />
      </div>
    </slot>
  </div>
</template>

<style lang="scss" module>
  .container {
    display: inline-block;
    width: max-content;
    max-width: 100%;
  }

  .floating {
    --_tooltip-bg-color: var(--ui3n-tooltip-bg-color, var(--color-bg-block-tritery-default));
    --_tooltip-text-color: var(--ui3n-tooltip-text-color, var(--color-text-block-darkery-default));
    --_tooltip-max-width: var(--ui3n-tooltip-max-width, 400px);

    width: max-content;
    z-index: 5;
  }

  .arrow {
    position: absolute;
    width: 0;
    height: 0;

    &-top,
    &-bottom {
      border-style: solid;
      border-width: 0 var(--ui3n-tooltip-arrow-size) var(--ui3n-tooltip-arrow-size) var(--ui3n-tooltip-arrow-size);
      border-color: transparent transparent var(--_tooltip-bg-color) transparent;
    }

    &-top {
      bottom: var(--ui3n-tooltip-base-offset);
      transform: rotate(180deg);
    }

    &-bottom {
      top: var(--ui3n-tooltip-base-offset);
      transform: rotate(0deg);
    }

    &-left,
    &-right {
      border-style: solid;
      border-width: var(--ui3n-tooltip-arrow-size) 0 var(--ui3n-tooltip-arrow-size) var(--ui3n-tooltip-arrow-size);
      border-color: transparent transparent transparent var(--_tooltip-bg-color);
    }

    &-left {
      right: var(--ui3n-tooltip-base-offset);
      transform: rotate(0deg);
    }

    &-right {
      left: var(--ui3n-tooltip-base-offset);
      transform: rotate(180deg);
    }
  }

  .content {
    position: relative;
    max-width: var(--_tooltip-max-width);
    padding: var(--ui3n-tooltip-padding, 6px 8px);
    border-radius: var(--ui3n-tooltip-border-radius, 6px);
    font-size: var(--ui3n-tooltip-font-size, 11px);
    line-height: var(--ui3n-tooltip-line-height, 12px);
    font-weight: 400;
    background-color: var(--_tooltip-bg-color);
    color: var(--_tooltip-text-color);
  }
</style>
