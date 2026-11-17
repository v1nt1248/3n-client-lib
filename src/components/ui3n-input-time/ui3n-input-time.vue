<script lang="ts" setup>
  import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
  import { autoUpdate, flip, useFloating, offset, shift } from '@floating-ui/vue';
  import Ui3nInput from '../ui3n-input/ui3n-input.vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nTimePicker from '../ui3n-date-time/ui3n-time-picker.vue';
  import { createTimeMaskOptions } from '../ui3n-date-time/time-mask';
  import { resolveTimeVisibility } from '../ui3n-date-time/utils';
  import { IMask } from '../../utils/ui/input-mask';
  import { lockScroll, unlockScroll } from '../../utils/ui/scroll-lock';
  import { default as vClickOutside } from '../../directives/ui3n-click-outside';
  import type { Ui3nInputTimeProps, Ui3nInputTimeEmits, Ui3nInputTimeExpose } from './types';

  const props = withDefaults(defineProps<Ui3nInputTimeProps>(), {
    masked: true,
    maskValueMode: 'masked',
  });
  const emits = defineEmits<Ui3nInputTimeEmits>();

  const input = useTemplateRef<InstanceType<typeof Ui3nInput>>('input');
  const menuTriggerElement = ref<HTMLDivElement | null>(null);
  const menuContentElement = useTemplateRef<HTMLDivElement>('picker');

  const isShow = ref(false);
  let scrollParent: HTMLElement | null = null;

  const cellsCount = computed(() => {
    const { showHours, showMinutes, showSeconds } = resolveTimeVisibility(props.config);

    return [showHours, showMinutes, showSeconds].filter(Boolean).length;
  });

  const inputMask = computed(() => {
    if (!props.masked) {
      return undefined;
    }

    return props.mask ?? createTimeMaskOptions(props.config);
  });

  const pickerValue = computed<string | null>(() => {
    const mask = inputMask.value;

    if (!mask || !props.modelValue || props.maskValueMode === 'masked') {
      return props.modelValue;
    }

    return IMask.pipe(props.modelValue, mask, IMask.PIPE_TYPE.UNMASKED, IMask.PIPE_TYPE.MASKED);
  });

  const { floatingStyles } = useFloating(menuTriggerElement, menuContentElement, {
    placement: 'top-end',
    strategy: 'fixed',
    middleware: [
      offset({ mainAxis: -4, crossAxis: 0 }),
      flip({ fallbackPlacements: ['bottom-end', 'top-start', 'bottom-start'], padding: 8 }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  function toggleMenu() {
    if (props.disabled) {
      return;
    }

    isShow.value = !isShow.value;
    isShow.value ? emits('open-picker') : emits('close-picker');
  }

  function onClickOutside(event: MouseEvent) {
    if (menuTriggerElement.value?.contains(event.target as Node)) {
      return;
    }

    isShow.value = false;
    emits('close-picker');
  }

  function onTimeUpdate(value: string | null) {
    const next =
      value !== null && inputMask.value && props.maskValueMode === 'unmasked'
        ? IMask.pipe(value, inputMask.value, IMask.PIPE_TYPE.MASKED, IMask.PIPE_TYPE.UNMASKED)
        : value;

    emits('update:modelValue', next);

    if (next !== null) {
      emits('input', next);
      emits('change', next);
    }
  }

  function onInputModelUpdate(value: string) {
    emits('update:modelValue', value);
  }

  function onInputEvent(value: string) {
    emits('input', value);
  }

  function onChangeEvent(value: string) {
    emits('change', value);
  }

  defineExpose<Ui3nInputTimeExpose>({
    inputElement: computed(() => input.value?.inputElement ?? null),
    isDirty: computed(() => input.value?.isDirty ?? false),
    isFocused: computed(() => input.value?.isFocused ?? false),
    clearValue: () => input.value?.clearValue(),
  });

  watch(isShow, value => {
    if (value) {
      scrollParent = lockScroll(menuTriggerElement.value);
    } else {
      unlockScroll(scrollParent);
      scrollParent = null;
    }
  });

  onBeforeUnmount(() => {
    unlockScroll(scrollParent);
    scrollParent = null;
  });
</script>

<template>
  <div
    data-ui3n="input-time"
    :class="$style.ui3nInputTime"
  >
    <ui3n-input
      :id="id"
      ref="input"
      :name="name"
      :size="size"
      :label="label"
      :placeholder="placeholder"
      :clearable="clearable"
      :autofocus="autofocus"
      :readonly="readonly"
      :rules="rules"
      :validate-at-startup="validateAtStartup"
      :hide-bottom-space="hideBottomSpace"
      :display-state-mode="displayStateMode"
      :display-state-with-icon="displayStateWithIcon"
      :display-state-message="displayStateMessage"
      :disabled="disabled"
      :model-value="modelValue || ''"
      :mask="inputMask"
      :mask-value-mode="maskValueMode"
      @update:model-value="onInputModelUpdate"
      @input="onInputEvent"
      @change="onChangeEvent"
      @focus="event => emits('focus', event)"
      @blur="event => emits('blur', event)"
      @keydown="event => emits('keydown', event)"
      @init="element => emits('init', element)"
      @clear="emits('clear')"
      @update:valid="value => emits('update:valid', value)"
    >
      <template #append-icon>
        <div>
          <ui3n-icon
            ref="icon"
            icon="calendar-clock"
            color="var(--color-icon-control-accent-default)"
            :class="$style.icon"
            @init="el => menuTriggerElement = el"
            @click.stop="toggleMenu"
          />

          <div
            v-if="isShow"
            ref="picker"
            v-click-outside="onClickOutside"
            :style="floatingStyles"
            :class="[$style.picker, $style[`cells-${cellsCount}`]]"
          >
            <ui3n-time-picker
              :size="size"
              :config="config"
              :minute-step="minuteStep"
              :second-step="secondStep"
              :locale-config="localeConfig"
              :disabled="disabled"
              :model-value="pickerValue"
              @update:model-value="onTimeUpdate"
            />
          </div>
        </div>
      </template>
    </ui3n-input>
  </div>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nInputTime {
    position: relative;
    width: 100%;
  }

  .icon {
    cursor: pointer;
  }

  .picker {
    --_input-time-width: var(--ui3n-input-time-width, 200px);
    --_input-time-background-color: var(--ui3n-input-time-background-color, var(--color-bg-block-primary-default));
    --_input-time-border-radius: var(--ui3n-input-time-border-radius, 16px);
    --_input-time-z-index: var(--ui3n-input-time-z-index, 1000);

    position: absolute;
    width: var(--_input-time-width);
    padding: 0 8px;
    background-color: var(--_input-time-background-color);
    border-radius: var(--_input-time-border-radius);
    z-index: var(--_input-time-z-index);
    overflow: visible;

    @include mixins.dropShadow();
  }

  .cells-3 {
    --_input-time-width: var(--ui3n-input-time-width-3, 280px);
  }
</style>
