<script lang="ts" setup>
  import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
  import { arrow, autoUpdate, offset, useFloating } from '@floating-ui/vue';
  import { toCssLength } from '../../utils/ui/to-css-length';
  import { hasSlotContent } from '../../utils/ui/has-slot-content';
  import type { Nullable } from '../../types';
  import type { Ui3nTooltipProps, Ui3nTooltipEmits, Ui3nTooltipSlots } from './types';

  const arrowSize = 8;
  const arrowOffset = Math.round((arrowSize / 2) * Math.SQRT2);

  const props = withDefaults(defineProps<Ui3nTooltipProps>(), {
    placement: 'top',
    offsetX: 0,
    offsetY: 0,
    trigger: 'hover',
    disabled: false,
  });
  const emits = defineEmits<Ui3nTooltipEmits>();
  defineSlots<Ui3nTooltipSlots>();
  const slots = useSlots();

  const showTooltip = ref(false);
  const referenceContainer = ref<Nullable<HTMLElement>>(null);
  const floatingEl = ref<Nullable<HTMLElement>>(null);
  const floatingArrowEl = ref<Nullable<HTMLElement>>(null);

  const isClient = ref(false);
  let boundEl: HTMLElement | null = null;

  const showWrapper = computed(() => !props.triggerElement || hasSlotContent(slots.default));

  const positionStrategy = computed(() => {
    if (props.positionStrategy) {
      return props.positionStrategy;
    }

    return props.triggerElement ? 'fixed' : 'absolute';
  });

  const shouldTeleport = computed(() => !!props.triggerElement || positionStrategy.value === 'fixed');

  const usedReference = computed(() => props.triggerElement || referenceContainer.value);

  const nativeReferenceEl = computed<HTMLElement | null>(() => {
    const trigger = usedReference.value;
    if (!trigger) {
      return null;
    }

    if (trigger instanceof HTMLElement) {
      return trigger;
    }

    if ('contextElement' in trigger && trigger.contextElement instanceof HTMLElement) {
      return trigger.contextElement;
    }

    return null;
  });

  const mainPlacement = computed(() => {
    const [part1] = props.placement.split('-');
    return part1;
  });

  const offsetOptions = computed(() => {
    const options = { mainAxis: 0, crossAxis: 0 };
    switch (mainPlacement.value) {
      case 'top':
        options.mainAxis = -1 * Number(props.offsetY) + arrowOffset;
        options.crossAxis = Number(props.offsetX);
        break;
      case 'bottom':
        options.mainAxis = Number(props.offsetY) + arrowOffset;
        options.crossAxis = Number(props.offsetX);
        break;
      case 'left':
        options.mainAxis = -1 * Number(props.offsetX) + arrowOffset;
        options.crossAxis = Number(props.offsetY);
        break;
      case 'right':
        options.mainAxis = Number(props.offsetX) + arrowOffset;
        options.crossAxis = Number(props.offsetY);
        break;
    }
    return options;
  });

  const middlewareComputed = computed(() => [
    offset(offsetOptions.value),
    arrow({ element: floatingArrowEl, padding: 8 }),
  ]);

  const { floatingStyles, isPositioned, middlewareData, update } = useFloating(usedReference, floatingEl, {
    open: showTooltip,
    placement: () => props.placement,
    strategy: positionStrategy,
    middleware: middlewareComputed,
    whileElementsMounted: (reference, floating, onUpdate) => {
      if (positionStrategy.value === 'fixed' || props.triggerElement) {
        return autoUpdate(reference, floating, onUpdate);
      }

      onUpdate();
      return () => undefined;
    },
  });

  const tooltipStylesComputed = computed(() => {
    const styles: Record<string, string> = {
      ...floatingStyles.value,
      '--ui3n-tooltip-arrow-size': `${arrowSize}px`,
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
    if (!boundEl) {
      return;
    }

    boundEl.removeEventListener('mouseenter', onMouseenter);
    boundEl.removeEventListener('mouseleave', onMouseleave);
    boundEl.removeEventListener('click', onClick);
    boundEl = null;
  }

  function setupEventListeners() {
    removeEventListeners();
    if (!nativeReferenceEl.value || props.disabled) {
      return;
    }

    boundEl = nativeReferenceEl.value;

    if (props.trigger === 'hover') {
      boundEl.addEventListener('mouseenter', onMouseenter);
      boundEl.addEventListener('mouseleave', onMouseleave);
    } else if (props.trigger === 'click') {
      boundEl.addEventListener('click', onClick);
    }
  }

  onMounted(() => {
    isClient.value = true;
    setupEventListeners();
  });

  onBeforeUnmount(() => {
    removeEventListeners();
  });

  watch([() => props.trigger, () => props.disabled, nativeReferenceEl], () => {
    if (isClient.value) {
      setupEventListeners();
    }
  });

  watch(
    () => props.triggerElement,
    () => {
      update();
    },
  );

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
    v-if="showWrapper"
    ref="referenceContainer"
    data-ui3n="tooltip"
    :class="$style.container"
  >
    <slot />
  </div>

  <Teleport
    to="body"
    :disabled="!isClient || !shouldTeleport"
  >
    <div
      v-if="showTooltip"
      ref="floatingEl"
      data-ui3n="tooltip-content"
      :class="[$style.floating, shouldTeleport && $style.floatingTeleported]"
      :style="tooltipStylesComputed"
    >
      <slot name="content">
        <div
          ref="floatingArrowEl"
          :class="[$style.arrow, $style[`arrow-${mainPlacement}`]]"
          :style="{
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
          }"
        />
        <div :class="$style.content">
          {{ content }}
        </div>
      </slot>
    </div>
  </Teleport>
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
    overflow: visible;
    z-index: 5;
  }

  .floatingTeleported {
    z-index: 2000;
  }

  .arrow {
    position: absolute;
    width: var(--ui3n-tooltip-arrow-size, 8px);
    height: var(--ui3n-tooltip-arrow-size, 8px);
    background-color: var(--_tooltip-bg-color);
    border-radius: 2px;
    transform: rotate(45deg);
    z-index: 0;

    &-top {
      bottom: calc(var(--ui3n-tooltip-arrow-size, 8px) / -2);
    }

    &-bottom {
      top: calc(var(--ui3n-tooltip-arrow-size, 8px) / -2);
    }

    &-left {
      right: calc(var(--ui3n-tooltip-arrow-size, 8px) / -2);
    }

    &-right {
      left: calc(var(--ui3n-tooltip-arrow-size, 8px) / -2);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    overflow: visible;
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
