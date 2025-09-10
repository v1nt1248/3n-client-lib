<script lang="ts" setup>
  import { computed, ref, useTemplateRef, watch, ComputedRef } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import { round, getRandomId } from '@/utils';
  import type { UI3nSliderProps, UI3nSliderEmits } from './types';

  const props = withDefaults(defineProps<UI3nSliderProps>(), {
    step: 1,
    min: 0,
    max: 100,
    labelVisible: 'normal',
    labelTextColor: 'var()',
    labelColor: 'var()',
    activeColor: 'var(--color-bg-control-accent-default)',
    trackColor: 'var(--color-bg-control-secondary-default)',
    trackHeight: 8,
    thumbSize: 16,
    thumbColor: 'var(--color-bg-control-accent-default)',
  });
  const emits = defineEmits<UI3nSliderEmits>();

  const id = `slider-${getRandomId(3)}`;
  const sliderRef = useTemplateRef('sliderEl');
  const innerValue = ref<number | [number, number]>(0);
  const selectedPointers = ref<(1 | 2)[]>([])

  const sliderHeight = computed(() => {
    const height = Math.max(Number(props.trackHeight), Number(props.thumbSize));
    return `${height}px`;
  });
  const trackHeightCss = computed(() => `${props.trackHeight}px`);
  const thumbSizeCss = computed(() => `${props.thumbSize}px`);
  const diff = computed(() => Number(props.max) - Number(props.min));

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

  function onPointMousedown(point: 1 | 2) {
    if (!selectedPointers.value.includes(point)) {
      selectedPointers.value.push(point);
    }
  }

  function onPointMouseup(point: 1 | 2) {
    console.log('onPointMouseup', point);
    if (selectedPointers.value.includes(point)) {
      const pointIndex = selectedPointers.value.indexOf(point);
      pointIndex > -1 && selectedPointers.value.splice(pointIndex, 1);
    }
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

    emits('update:modelValue', innerValue.value)
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (props.range) {
        if (JSON.stringify(val) !== JSON.stringify(innerValue.value)) {
          innerValue.value = cloneDeep(val);
        }
        return;
      }

      const newVal = Array.isArray(val) ? val[val.length - 1] : val;
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

    <transition-group>
      <div
        :key="`${id}-1`"
        :class="[$style.pointer, $style.pointer1, selectedPointers.includes(1) && $style.selected]"
        @mousedown.stop.prevent="onPointMousedown(1)"
        @mouseup.stop.prevent="onPointMouseup(1)"
        @click.stop.prevent
      />

      <div
        v-if="range"
        :key="`${id}-2`"
        :class="[$style.pointer, $style.pointer2, selectedPointers.includes(2) && $style.selected]"
        @mousedown.stop.prevent="onPointMousedown(2)"
        @mouseup.stop.prevent="onPointMouseup(2)"
        @click.stop.prevent
      />
    </transition-group>
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

  .pointer {
    position: absolute;
    top: 0;
    width: var(--ui3n-slider-thumb-size);
    height: var(--ui3n-slider-thumb-size);
    border-radius: 50%;
    background-color: var(--ui3n-slider-thumb-color);
    cursor: pointer;
    z-index: 3;

    &:hover {
      background-color: hsl(from var(--ui3n-slider-thumb-color) h s calc(l + 5));
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
      opacity: 0.3;
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
