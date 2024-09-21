<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeMount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import type { Ref } from 'vue';
import type { Nullable } from '../types';
import type {
  Ui3nRadioEmits,
  Ui3nRadioProps,
  Ui3nRadioSlots,
  Ui3nRadioValue,
} from './types';

const props = withDefaults(
  defineProps<Ui3nRadioProps>(),
  {
    modelValue: false,
    checkedValue: true,
    uncheckedValue: false,
    size: '16',
    color: 'var(--color-icon-control-accent-default)',
    disabled: false,
  },
);
const emits = defineEmits<Ui3nRadioEmits>();
defineSlots<Ui3nRadioSlots>();

const slots = useSlots();

const instance = getCurrentInstance();
const isComponentPartOfGroup = instance?.parent?.type.__name === 'Ui3nRadioGroup' || instance?.parent?.type.__name === 'ui3n-radio-group';
const groupName = isComponentPartOfGroup ? instance?.parent?.props.name : '';

const radioEl = ref<HTMLDivElement | null>(null);

const {
  groupValue,
  updateGroupValue,
}: {
  groupValue: Nullable<Ref<Ui3nRadioValue>>;
  updateGroupValue: Nullable<(value: Ui3nRadioValue) => void>;
} = groupName
  ? inject(`radio-group-${groupName}`)!
  : {
      groupValue: null,
      updateGroupValue: null,
    };

const val = ref<Ui3nRadioValue>(groupName ? groupValue!.value : props.modelValue);

const isOn = computed(() => val.value === props.checkedValue);

function change() {
  val.value = isOn.value ? props.uncheckedValue : props.checkedValue;

  if (groupName) {
    isOn.value && updateGroupValue!(val.value);
  } else {
    emits('change', val.value);
    emits('update:modelValue', val.value);
  }
};

onBeforeMount(() => {
  if (
    (slots.checkedIcon && !slots.uncheckedIcon) ||
    (!slots.checkedIcon && slots.uncheckedIcon)
  ) {
    throw Error('[Ui3nRadio] Both checkedIcon and uncheckedIcon slots must have values ​​defined.');
  }
});

onMounted(() => {
  if (radioEl.value) {
    radioEl.value.style.setProperty('--ui3n-radio-size', `${props.size}px`);
    radioEl.value.style.setProperty('--ui3n-radio-color', props.color);
  }
});

watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== val.value) {
      val.value = newValue;
    }
  },
);

watch(
  () => props.size,
  newValue => {
    if (radioEl.value) {
      radioEl.value.style.setProperty('--ui3n-radio-size', `${newValue}px`);
    }
  },
);

watch(
  () => props.color,
  newValue => {
    if (radioEl.value) {
      radioEl.value.style.setProperty('--ui3n-radio-color', newValue);
    }
  },
);

watch(
  () => groupValue?.value,
  newVal => {
    if (groupName) {
      val.value = newVal === props.checkedValue ? props.checkedValue : props.uncheckedValue;
    }
  },
);
</script>

<template>
  <div
    ref="radioEl"
    :class="[
      $style.radio,
      disabled && $style.disabled,
      !slots.default && $style.noLabel,
    ]"
  >
    <div
      :class="[$style.body, disabled && $style.bodyDisabled]"
      @click="change"
    >
      <slot
        v-if="isOn"
        name="checkedIcon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="Number(size) - 4"
          :height="Number(size) - 4"
          viewBox="0 0 24 24"
          :class="[$style.icon, disabled && $style.iconDisabled]"
        >
          <path
            fill="currentColor"
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m0-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
          />
        </svg>
      </slot>

      <slot
        v-else
        name="uncheckedIcon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="Number(size) - 4"
          :height="Number(size) - 4"
          viewBox="0 0 24 24"
          :class="[$style.icon, disabled && $style.iconDisabled]"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
          />
        </svg>
      </slot>
    </div>

    <div :class="$style.label">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins";

.radio {
  --ui3n-radio-size: 16px;
  --ui3n-radio-color: var(--color-icon-control-accent-default);
  --ui3n-radio-text-size: 12px;
  --ui3n-radio-text-color: var(--color-text-control-primary-default);
  --ui3n-radio-text-weight: 500;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: var(--spacing-vl);
  gap: var(--spacing-s);

  &.disabled {
    --ui3n-radio-color: var(--color-icon-control-primary-disabled) !important;
    pointer-events: none;
    cursor: default;

    .label {
      opacity: 0.7;
    }
  }
}

.noLabel {
  gap: 0;
}

.body {
  position: relative;
  display: flex;
  width: var(--ui3n-radio-size);
  min-width: var(--ui3n-radio-size);
  height: var(--ui3n-radio-size);
  min-height: var(--ui3n-radio-size);
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    background-color: hsl(from transparent h s calc(l - 10));
    @include ripple(hsl(from transparent h s calc(l - 10)));
  }
}

.label {
  font-size: var(--ui3n-radio-text-size);
  font-weight: var(--ui3n-radio-text-weight);
  color: var(--ui3n-radio-text-color);
  user-select: none;
}

.icon {
  color: var(--ui3n-radio-color);
  min-height: calc(var(--ui3n-radion-size) - 2px);
  height: calc(var(--ui3n-radion-size) - 2px);
  min-width: calc(var(--ui3n-checkbox-size) - 2px);
  width: calc(var(--ui3n-radion-size) - 2px);
  cursor: pointer;
}

.bodyDisabled,
.iconDisabled {
  filter: grayscale(1);
  opacity: 0.5;
}
</style>
