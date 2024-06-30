<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Ui3nIcon from './ui3n-icon.vue';

export interface Ui3nButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'custom';
  size?: 'regular' | 'small';
  textColor?: string;
  color?: string;
  elevation?: boolean;
  icon?: string;
  iconSize?: string | number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export interface Ui3nButtonEmits {
  (ev: 'init', value: HTMLButtonElement): void;
  (ev: 'click', value: Event): void;
  (ev: 'focus', value: Event): void;
  (ev: 'blur', value: Event): void;
}

const props = withDefaults(
  defineProps<Ui3nButtonProps>(),
  {
    type: 'primary',
    size: 'regular',
    iconPosition: 'right',
    disabled: false,
  },
);
const emits = defineEmits<Ui3nButtonEmits>();

const buttonEl = ref<HTMLButtonElement | null>(null);

watch(
  [() => props.color, () => props.textColor],
  (newValue: [string | undefined, string | undefined], prevValue: [string | undefined, string | undefined]) => {
    if (!buttonEl.value) return;

    const [prevColor, prevTextColor] = prevValue;
    const [color, textColor] = newValue;

    (props.type === 'custom' || props.type === 'icon')
    && color !== prevColor
    && buttonEl.value.style.setProperty('--ui3n-button-bg-color-custom', color ?? 'var(--color-bg-button-primary-default)');

    props.type === 'custom'
    && textColor !== prevTextColor
    && buttonEl.value.style.setProperty('--ui3n-button-text-color-custom', textColor ?? 'var(--color-text-button-primary-default');
  },
);

onMounted(() => {
  if (!buttonEl.value) return;

  (props.type === 'custom' || props.type === 'icon') && props.color && buttonEl.value.style.setProperty('--ui3n-button-bg-color-custom', props.color);

  props.type === 'custom' && props.textColor && buttonEl.value.style.setProperty('--ui3n-button-text-color-custom', props.textColor);

  emits('init', buttonEl.value);
});
</script>

<template>
  <button
    ref="buttonEl"
    :class="[
      $style.button,
      $style[size],
      $style[type],
      icon && $style[`withIcon-${iconPosition}`],
      elevation && $style.elevation,
    ]"
    type="button"
    :disabled="disabled"
    @click="emits('click', $event)"
    @focusin="emits('focus', $event)"
    @focusout="emits('blur', $event)"
  >
    <ui3n-icon
      v-if="icon"
      :class="$style.buttonIcon"
      :icon="icon"
      :width="iconSize || (size === 'small' ? 12 : 16)"
      :height="iconSize || (size === 'small' ? 12 : 16)"
      :color="iconColor || 'var(--color-text-button-primary-default)'"
    />

    <span v-if="type !== 'icon'" :class="$style.text">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" module>
@import "../assets/styles/mixins";

.button {
  --ui3n-button-padding: var(--spacing-m);
  --ui3n-button-text-size: var(--font-12);
  --ui3n-button-text-color-custom: var(--color-text-button-primary-default);
  --ui3n-button-bg-color-custom: var(--color-bg-button-primary-default);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-s);
  border: none;
  outline: none;
  border-radius: var(--spacing-xs);
  font-size: var(--ui3n-button-text-size);
  font-weight: 600;
  line-height: calc(var(--ui3n-button-text-size) * 1.25);
  user-select: none;
}

.regular {
  height: var(--spacing-l);
  padding: 0 var(--spacing-m);

  &.withIcon-left {
    padding-left: var(--spacing-s);
  }

  &.withIcon-right {
    padding-right: var(--spacing-s);
  }
}

.small {
  height: var(--spacing-ml);
  padding: 0 var(--spacing-s);

  &.withIcon-left {
    padding-left: var(--spacing-xs);
  }

  &.withIcon-right {
    padding-right: var(--spacing-xs);
  }
}

.primary {
  background: var(--color-bg-button-primary-default);
  color: var(--color-text-button-primary-default);

  &:hover {
    background: var(--color-bg-button-primary-hover);
    color: var(--color-text-button-primary-hover);
    @include ripple(var(--color-bg-button-primary-hover));
  }

  &[disabled] {
    background: var(--color-bg-button-primary-disabled);
    color: var(--color-text-button-primary-disabled);
    pointer-events: none;
  }
}

.secondary {
  background: var(--color-bg-button-secondary-default);
  color: var(--color-text-button-secondary-default);

  &:hover {
    background: var(--color-bg-button-secondary-hover);
    color: var(--color-text-button-secondary-hover);
    @include ripple(var(--color-bg-button-secondary-hover));
  }

  &[disabled] {
    background: var(--color-bg-button-secondary-disabled);
    color: var(--color-text-button-secondary-disabled);
    pointer-events: none;
  }
}

.tertiary {
  background: transparent;
  color: var(--color-text-button-secondary-default);
  padding: 0;

  &:hover {
    background: transparent;
    color: var(--color-text-button-secondary-hover);
    text-decoration: underline;
    cursor: pointer;
  }

  &[disabled] {
    background: transparent;
    color: var(--color-text-button-secondary-disabled);
    pointer-events: none;
  }
}

.icon {
  --ui3n-button-icon-bg-color: hsl(from var(--ui3n-button-bg-color-custom) h s calc(l - 10));

  background: var(--ui3n-button-bg-color-custom);
  color: var(--ui3n-button-text-color-custom);
  border-radius: 50%;

  &.regular {
    min-width: var(--spacing-l);
    width: var(--spacing-l);
    padding: 0;
  }

  &.small {
    min-width: var(--spacing-ml);
    width: var(--spacing-ml);
    padding: 0;
  }

  &:hover {
    background: var(--ui3n-button-icon-bg-color);
    @include ripple(var(--ui3n-button-icon-bg-color));
  }

  &[disabled] {
    opacity: 0.7;
    pointer-events: none;
  }
}

.custom {
  --ui3n-button-custom-bg-color: hsl(from var(--ui3n-button-bg-color-custom) h s calc(l - 10));

  background: var(--ui3n-button-bg-color-custom);
  color: var(--ui3n-button-text-color-custom);

  &:hover {
    background: var(--ui3n-button-custom-bg-color);
    @include ripple(var(--ui3n-button-custom-bg-color));
  }

  &[disabled] {
    opacity: 0.7;
    pointer-events: none;
  }
}

.withIcon-left {
  flex-direction: row;
}

.withIcon-right {
  flex-direction: row-reverse;
}

.buttonIcon,
.text {
  pointer-events: none;
}

.elevation {
  @include elevation();
}
</style>
