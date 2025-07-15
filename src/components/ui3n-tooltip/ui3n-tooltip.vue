<script lang="ts" setup>
  /* eslint-disable vue/no-multiple-template-root */
  import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import type { Nullable } from '@/components/types';
  import type { Ui3nTooltipProps, Ui3nTooltipEmits, Ui3nTooltipSlots } from './types';
  import { arrow, autoUpdate, offset, useFloating } from '@floating-ui/vue';

  const baseOffset = 5;

  const props = withDefaults(defineProps<Ui3nTooltipProps>(), {
    maxContentWidth: 400,
    color: 'var(--color-bg-block-tritery-default)',
    textColor: 'var(--color-text-block-darkery-default)',
    placement: 'top',
    positionStrategy: 'absolute',
    offsetX: 0,
    offsetY: 0,
    trigger: 'hover',
  });
  const emits = defineEmits<Ui3nTooltipEmits>();
  defineSlots<Ui3nTooltipSlots>();

  const showTooltip = ref(false);
  const referenceEl = ref<Nullable<HTMLElement>>(null);
  const floatingEl = ref<Nullable<HTMLElement>>(null);
  const floatingArrowEl = ref<Nullable<HTMLElement>>(null);

  const maxContentWidthCssValue = computed(() => `${props.maxContentWidth}px`);
  const baseOffsetCssValue = computed(() => `${-baseOffset}px`);
  const arrowSizeCssValue = computed(() => `${baseOffset}px`);
  const mainPlacement = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [part1, _] = props.placement.split('-');
    return part1;
  });
  const offsetOptions = computed(() => {
    const options = {
      mainAxis: 0,
      crossAxis: 0,
    };
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

  const { floatingStyles, isPositioned, middlewareData } = useFloating(referenceEl, floatingEl, {
    open: showTooltip,
    placement: props.placement,
    strategy: props.positionStrategy,
    middleware: [offset(offsetOptions.value), arrow({ element: floatingArrowEl, padding: 8 })],
    whileElementsMounted: props.positionStrategy === 'fixed' ? autoUpdate : undefined,
  });

  function onMouseenter() {
    if (props.disabled) return;

    showTooltip.value = true;
    emits('open');
    emits('update:modelValue', true);
  }

  function onMouseleave() {
    if (props.disabled) return;

    showTooltip.value = false;
    emits('close');
    emits('update:modelValue', false);
  }

  function onClick() {
    if (props.disabled) return;

    if (showTooltip.value) {
      onMouseleave();
    } else {
      onMouseenter();
    }
  }

  onMounted(() => {
    const inst = getCurrentInstance();
    const el = inst?.vnode?.el;
    if (!el) {
      throw new Error('[ui3n-tooltip] A reference element is absent.');
    }

    referenceEl.value = el.nodeName === '#text' ? el.nextElementSibling : el;

    if (!referenceEl.value) return;

    if (props.trigger === 'hover') {
      referenceEl.value!.addEventListener('mouseenter', onMouseenter);
      referenceEl.value!.addEventListener('mouseleave', onMouseleave);
    } else if (props.trigger === 'click') {
      referenceEl.value!.addEventListener('click', onClick);
    }
  });

  onBeforeUnmount(() => {
    if (!referenceEl.value) return;

    if (props.trigger === 'hover') {
      referenceEl.value!.removeEventListener('mouseenter', onMouseenter);
      referenceEl.value!.removeEventListener('mouseleave', onMouseleave);
    } else if (props.trigger === 'click') {
      referenceEl.value!.removeEventListener('click', onClick);
    }
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
  <slot />

  <div
    v-if="showTooltip"
    ref="floatingEl"
    :class="$style.floating"
    :style="floatingStyles"
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
  .floating {
    --ui3n-tooltip-bg-color: v-bind(color);
    --ui3n-tooltip-text-color: v-bind(textColor);

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
      border-width: 0 v-bind(arrowSizeCssValue) v-bind(arrowSizeCssValue) v-bind(arrowSizeCssValue);
      border-color: transparent transparent var(--ui3n-tooltip-bg-color) transparent;
    }

    &-top {
      bottom: v-bind(baseOffsetCssValue);
      transform: rotate(180deg);
    }

    &-bottom {
      top: v-bind(baseOffsetCssValue);
      transform: rotate(0deg);
    }

    &-left,
    &-right {
      border-style: solid;
      border-width: v-bind(arrowSizeCssValue) 0 v-bind(arrowSizeCssValue) v-bind(arrowSizeCssValue);
      border-color: transparent transparent transparent var(--ui3n-tooltip-bg-color);
    }

    &-left {
      right: v-bind(baseOffsetCssValue);
      transform: rotate(0deg);
    }

    &-right {
      left: v-bind(baseOffsetCssValue);
      transform: rotate(180deg);
    }
  }

  .content {
    position: relative;
    max-width: v-bind(maxContentWidthCssValue);
    padding: 6px var(--spacing-s);
    border-radius: 6px;
    font-size: var(--font-11);
    line-height: var(--font-12);
    font-weight: 400;
    background-color: var(--ui3n-tooltip-bg-color);
    color: var(--ui3n-tooltip-text-color);
  }
</style>
