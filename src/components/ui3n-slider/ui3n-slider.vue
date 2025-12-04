<script lang="ts" setup>
  import { computed, ref, useTemplateRef, watch, ComputedRef } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import Ui3nTooltip from '../ui3n-tooltip/ui3n-tooltip.vue';
  import { round } from '@/utils';
  import type { Nullable } from '@/types';
  import type { UI3nSliderProps, UI3nSliderEmits } from './types';

  const props = withDefaults(defineProps<UI3nSliderProps>(), {
    min: 0,
    max: 100,
    labelVisible: 'normal',
    labelColor: 'var(--color-bg-block-tritery-default)',
    labelTextColor: 'var(--color-text-block-darkery-default)',
    activeColor: 'var(--color-bg-control-accent-default)',
    trackColor: 'var(--color-bg-control-secondary-default)',
    trackHeight: 8,
    thumbSize: 16,
    thumbColor: 'var(--color-bg-control-accent-default)',
  });
  const emits = defineEmits<UI3nSliderEmits>();

  const sliderRef = useTemplateRef('sliderEl');
  const pointer1Ref = useTemplateRef('pointerEl1');
  const pointer2Ref = useTemplateRef('pointerEl2');
  const shiftX = ref({
    '1': 0,
    '2': 0,
  });
  const showLabel = ref({
    '1': props.labelVisible === 'always',
    '2': props.labelVisible === 'always',
  });
  const innerValue = ref<number | [number, number]>(0);
  const selectedPointer = ref<Nullable<1 | 2>>(null);

  const sliderHeight = computed(() => {
    const height = Math.max(Number(props.trackHeight), Number(props.thumbSize));
    return `${height}px`;
  });
  const trackHeightCss = computed(() => `${props.trackHeight}px`);
  const thumbSizeCss = computed(() => `${props.thumbSize}px`);
  const diff = computed(() => Number(props.max) - Number(props.min));
  const innerStep = computed(() => props.step ? Number(props.step) : diff.value / 100);

  const activeBlockStyle = computed(() => {
    const style = {} as Record<'left' | 'width', string>;
    if (props.range) {
      const [minVal, maxVal] = innerValue.value as [number, number];

      if (minVal <= Number(props.min)) {
        style.left = '0px';
      } else if (minVal < Number(props.max)) {
        style.left = `${round((minVal - Number(props.min)) / diff.value * 100, 0)}%`;
      }

      if (maxVal >= Number(props.max)) {
        style.width = minVal <= Number(props.min)
          ? '100%'
          : `${round((Number(props.max) - minVal) / diff.value * 100, 0)}%`;
      } else if (maxVal > Number(props.min)) {
        style.width = `${round((maxVal - minVal) / diff.value * 100, 0)}%`;
      }

      return style;
    }

    if ((innerValue.value as number) <= Number(props.min)) {
      style.left = '0px';
      style.width = '0px';
    } else if ((innerValue.value as number) >= Number(props.max)) {
      style.left = '0px';
      style.width = '100%';
    } else {
      style.left = '0px';
      style.width = `${round(((innerValue.value as number) - Number(props.min)) / diff.value * 100, 0)}%`;
    }

    return style;
  }) as ComputedRef<Record<string, string>>;

  const pointer1PositionCss = computed(() => props.range
    ? `calc(${activeBlockStyle.value.left} - calc(${thumbSizeCss.value} / 2))`
    : `calc(${activeBlockStyle.value.width} - calc(${thumbSizeCss.value} / 2))`,
  );
  const pointer2PositionCss = computed(() => props.range
    ? `calc(${activeBlockStyle.value.width} + ${activeBlockStyle.value.left} - calc(${thumbSizeCss.value} / 2))`
    : '200%',
  );

  const label1Text = computed(() => {
    if (props.range) {
      const val = (innerValue.value as [number, number])[0];
      return props.transformValueMethod
        ? props.transformValueMethod(val)
        : `${val}`;
    }

    return props.transformValueMethod ? props.transformValueMethod(innerValue.value as number) : `${innerValue.value}`;
  });
  const label2Text = computed(() => {
    if (!props.range) {
      return '';
    }

    const val = (innerValue.value as [number, number])[1];
    return props.transformValueMethod ? props.transformValueMethod(val) :  `${val}`;
  });

  function onMouseenter(pointer: 1 | 2) {
    if (props.labelVisible === 'normal') {
      showLabel.value[`${pointer}`] = true;
    }
  }

  function onMouseleave(pointer: 1 | 2) {
    if (props.labelVisible === 'normal') {
      showLabel.value[`${pointer}`] = false;
    }
  }

  function onDragstart() {
    return false;
  }

  function onPointerDown(event: PointerEvent, pointer: 1 | 2) {
    selectedPointer.value = pointer;
    if (props.labelVisible === 'normal') {
      showLabel.value[`${pointer}`] = true;
    }
    event.preventDefault();

    const currentPointer = pointer === 1 ? pointer1Ref.value! : pointer2Ref.value!;
    shiftX.value[`${selectedPointer.value}`] = event.clientX - currentPointer.getBoundingClientRect().left;
    currentPointer.setPointerCapture(event.pointerId);

    currentPointer.onpointermove = onPointerMove;

    currentPointer.onpointerup = () => {
      currentPointer.onpointermove = null;
      currentPointer.onpointerup = null;
      if (props.labelVisible === 'normal' && selectedPointer.value) {
        showLabel.value[`${selectedPointer.value}`] = false;
      }
      selectedPointer.value = null;
    };
  }

  function onPointerMove(event: PointerEvent) {
    if (!selectedPointer.value) {
      return;
    }

    const sliderRefClientRect = sliderRef.value!.getBoundingClientRect();
    const getValue = (leftPosition: number): number => Math.round(leftPosition / sliderRefClientRect.width * diff.value) + Number(props.min);

    let newLeft = event.clientX - shiftX.value[`${selectedPointer.value}`] - sliderRefClientRect.left;
    if (newLeft < 0) {
      newLeft = 0;
    }

    let rightEdge = sliderRef.value!.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    let newValue = getValue(newLeft);

    if (props.range) {
      if (selectedPointer.value === 1 && newValue >= (innerValue.value as [number, number])[1]) {
        newValue = (innerValue.value as [number, number])[1] - innerStep.value;
      } else if (selectedPointer.value === 2 && newValue <= (innerValue.value as [number, number])[0]) {
        newValue = (innerValue.value as [number, number])[0] + innerStep.value;
      }
    }

    if (props.range) {
      selectedPointer.value === 1 && ((innerValue.value as [number, number])[0] = newValue);
      selectedPointer.value === 2 && ((innerValue.value as [number, number])[1] = newValue);
    } else {
      innerValue.value = newValue;
    }

    emits('update:modelValue', innerValue.value);
  }

  function onTimelineClick(event: MouseEvent) {
    const { x } = event;
    const { x: sliderElStart, width: sliderElWidth } = sliderRef.value!.getBoundingClientRect();
    const selectedValue = Math.round((x - sliderElStart) / sliderElWidth * diff.value) + Number(props.min);

    if (props.range) {
      const [minVal, maxVal] = innerValue.value as [number, number];
      const diffWithMinVal = Math.abs(selectedValue - minVal);
      const diffWithMaxVal = Math.abs(maxVal - selectedValue);
      innerValue.value = [
        diffWithMinVal <= diffWithMaxVal ? selectedValue : (innerValue.value as [number, number])[0],
        diffWithMinVal > diffWithMaxVal ? selectedValue : (innerValue.value as [number, number])[1],
      ];
    } else {
      (innerValue.value as number) = selectedValue;
    }

    emits('update:modelValue', innerValue.value);
  }

  watch(
    () => JSON.stringify(props.modelValue),
    (val) => {
      if (props.range) {
        if (val !== JSON.stringify(innerValue.value)) {
          innerValue.value = cloneDeep(props.modelValue);
        }
        return;
      }

      const newVal = Array.isArray(props.modelValue)
        ? props.modelValue[props.modelValue.length - 1]
        : props.modelValue;
      if (newVal !== innerValue.value) {
        innerValue.value = newVal;
      }
    }, {
      immediate: true,
    },
  );
</script>

<template>
  <div
    ref="sliderEl"
    :class="[$style.ui3nSlider, disabled && $style.disabled]"
    @click.stop.prevent="onTimelineClick"
  >
    <div :class="$style.track">
      <div
        :class="$style.active"
        :style="activeBlockStyle"
      />
    </div>

    <div
      ref="pointerEl1"
      :class="[$style.pointerWrapper, $style.pointer1]"
      @pointerdown="onPointerDown($event, 1)"
      @click.stop.prevent
      @dragstart="onDragstart"
      @mouseenter="onMouseenter(1)"
      @mouseleave="onMouseleave(1)"
    >
      <ui3n-tooltip
        :model-value="showLabel['1']"
        :content="label1Text"
        trigger="manual"
        placement="top-start"
        position-strategy="absolute"
        :color="labelColor"
        :text-color="labelTextColor"
        :disabled="labelVisible === 'never'"
      >
        <div :class="[$style.pointer, selectedPointer === 1 && $style.selected]" />
      </ui3n-tooltip>
    </div>

    <div
      v-if="range"
      ref="pointerEl2"
      :class="[$style.pointerWrapper, $style.pointer2]"
      @pointerdown="onPointerDown($event, 2)"
      @click.stop.prevent
      @dragstart="onDragstart"
      @mouseenter="onMouseenter(2)"
      @mouseleave="onMouseleave(2)"
    >
      <ui3n-tooltip
        :model-value="showLabel['2']"
        :content="label2Text"
        trigger="manual"
        placement="top-start"
        position-strategy="absolute"
        :color="labelColor"
        :text-color="labelTextColor"
        :disabled="labelVisible === 'never'"
      >
        <div :class="[$style.pointer, selectedPointer === 2 && $style.selected]" />
      </ui3n-tooltip>
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nSlider {
    --ui3n-slider-height: v-bind(sliderHeight);
    --ui3n-slider-label-color: v-bind(labelColor);
    --ui3n-slider-label-text-color: v-bind(labelTextColor);
    --ui3n-slider-active-color: v-bind(activeColor);
    --ui3n-slider-track-color: v-bind(trackColor);
    --ui3n-slider-track-height: v-bind(trackHeightCss);
    --ui3n-slider-thumb-size: v-bind(thumbSizeCss);
    --ui3n-slider-thumb-color: v-bind(thumbColor);
    --ui3n-slider-pointer1-position: v-bind(pointer1PositionCss);
    --ui3n-slider-pointer2-position: v-bind(pointer2PositionCss);

    position: relative;
    width: 100%;
    height: var(--ui3n-slider-height);
    display: flex;
    justify-content: center;
    align-items: center;

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  .track {
    position: relative;
    width: 100%;
    height: var(--ui3n-slider-track-height);
    background-color: var(--ui3n-slider-track-color);
    border-radius: var(--ui3n-slider-track-height);
    cursor: pointer;
  }

  .active {
    position: absolute;
    height: var(--ui3n-slider-track-height);
    background-color: var(--ui3n-slider-active-color);
    border-radius: var(--ui3n-slider-track-height);
  }

  .pointerWrapper {
    position: absolute;
    top: 0;
    width: var(--ui3n-slider-thumb-size);
    height: var(--ui3n-slider-thumb-size);
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    touch-action: none;
    pointer-events: all;
    z-index: 3;
  }

  .pointer {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--ui3n-slider-thumb-color);
    touch-action: none;
    z-index: 5;

    &:hover {
      background-color: oklch(from var(--ui3n-slider-thumb-color) calc(l + 0.1) c h);
    }

    &.selected::before {
      position: absolute;
      content: '';
      width: calc(var(--ui3n-slider-thumb-size) * 2);
      height: calc(var(--ui3n-slider-thumb-size) * 2);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      opacity: 0.2;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      background-color: var(--ui3n-slider-thumb-color);
    }
  }

  .pointer1 {
    left: var(--ui3n-slider-pointer1-position);
  }

  .pointer2 {
    left: var(--ui3n-slider-pointer2-position);
  }
</style>
