<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useFloating, offset, autoUpdate, arrow } from '@floating-ui/vue';
import type { Ui3nTooltipEmits, Ui3nTooltipProps, Ui3nTooltipSlots } from './types';

const baseOffset = 5;

const props = withDefaults(defineProps<Ui3nTooltipProps>(), {
  color: 'var(--color-bg-control-secondary-default)',
  textColor: 'var(--color-text-control-primary-default)',
  placement: 'top',
  positionStrategy: 'absolute',
  offsetX: 0,
  offsetY: 0,
  trigger: 'hover',
});

const emits = defineEmits<Ui3nTooltipEmits>();
defineSlots<Ui3nTooltipSlots>();

const referenceElEventHandler = {
  ...(props.trigger === 'hover' &&
    !props.disabled && {
      mouseenter: () => handleMouseEvents(true),
      mouseleave: () => handleMouseEvents(false),
    }),
  ...(props.trigger === 'click' &&
    !props.disabled && {
      click: () => handleMouseEvents(!showTooltip.value),
    }),
};

const showTooltip = ref(false);
const referenceEl = ref(null);
const floatingEl = ref(null);
const floatingArrowEl = ref(null);

const baseOffsetCssValue = computed(() => `${-baseOffset}px`);
const arrowSizeCssValue = computed(() => `${baseOffset}px`);
const mainPlacement = computed(() => {
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

function handleMouseEvents(val: boolean) {
  showTooltip.value = val;
  val ? emits('open') : emits('close');
  emits('update:modelValue', val);
}

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
  <div :class="$style.ui3nTooltip">
    <div
      ref="referenceEl"
      :class="$style.reference"
      v-on="referenceElEventHandler"
    >
      <slot name="default" />
    </div>

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
  </div>
</template>

<style lang="scss" module>
.ui3nTooltip {
  --ui3n-tooltip-bg-color: v-bind(color);
  --ui3n-tooltip-text-color: v-bind(textColor);

  position: relative;
  width: max-content;
}

.reference {
  position: relative;
}

.floating {
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
  max-width: 400px;
  padding: var(--spacing-xs) var(--spacing-s);
  border-radius: var(--spacing-xs);
  font-size: var(--font-11);
  line-height: var(--font-12);
  font-weight: 400;
  background-color: var(--ui3n-tooltip-bg-color);
  color: var(--ui3n-tooltip-text-color);
}
</style>
