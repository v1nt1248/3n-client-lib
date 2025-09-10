<script lang="ts" setup>
  import { computed, ref, onMounted, useTemplateRef, watch } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import { round } from '@/utils';
  import type { UI3nSliderProps, UI3nSliderEmits} from './types';

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
    thumbColor: 'var()',
  });
  const emits = defineEmits<UI3nSliderEmits>();

  const innerValue = ref<number | [number, number]>();
  const sliderRef = useTemplateRef('sliderEl');

  const sliderHeight = computed(() => {
    const height = Math.max(Number(props.trackHeight), Number(props.thumbSize));
    return `${height}px`;
  });
  const trackHeightCss = computed(() => `${props.trackHeight}px`);
  const thumbSizeCss = computed(() => `${props.thumbSize}px`);
  const diff = computed(() => Number(props.max) - Number(props.min));
  const activeBlockStyle = computed(() => {
    const style = {};
    if (props.range) {
      const [minVal, maxVal] = innerValue.value as [number, number];

      if (minVal <= Number(props.min)) {
        style.left = '0';
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

    if (innerValue.value <= Number(props.min)) {
      style.left = '0';
      style.width = '0';
    } else if (innerValue.value >= Number(props.max)) {
      style.left = '0';
      style.width = '100%';
    } else {
      style.left = '0';
      style.width = `${round((innerValue.value - Number(props.min)) / diff.value * 100, 0)}%`;
    }

    return style;
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (props.range) {
        JSON.stringify(val) !== JSON.stringify(innerValue.value) && (innerValue.value = cloneDeep(val));
      } else {
        const newVal = Array.isArray(val) ? val[val.length - 1] : val;
        newVal !== innerValue.value && (innerValue.value = newVal);
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
  >
    <div :class="$style.track">
      <div
        :class="$style.active"
        :style="activeBlockStyle"
      />
    </div>

    <div :class="[$style.pointer, $style.pointer1]" />
    <div
      v-if="range"
      :class="[$style.pointer, $style.pointer2]"
    />
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
    --ui3n-slider-pointer1-position: 0;
    --ui3n-slider-pointer2-position: 0;

    position: relative;
    width: 100%;
    height: var(--ui3n-slider-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .track {
    position: relative;
    width: 100%;
    height: var(--ui3n-slider-track-height);
    background-color: var(--ui3n-slider-track-color);
    border-radius: var(--ui3n-slider-track-height);

    &.disabled {
      pointer-events: none;
      opacity: 0.7;
    }
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
    z-index: 1;

    &:hover {
      background-color: hsl(from var(--ui3n-slider-thumb-color) h s calc(l - 10));
    }
  }

  .pointer1 {
    left: var(--ui3n-slider-pointer1-position) ;
  }

  .pointer2 {
    left: var(--ui3n-slider-pointer2-position) ;
  }
</style>