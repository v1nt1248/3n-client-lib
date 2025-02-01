<script lang="ts" setup>
import { computed, onMounted, ref, watch, useCssModule } from 'vue';
import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
import Ui3nRipple from '../../directives/ui3n-ripple';
import type { Ui3nButtonEmits, Ui3nButtonProps, Ui3nButtonEventName } from './types';

const vUi3nRipple = Ui3nRipple;

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

const $css = useCssModule();

const buttonEl = ref<HTMLButtonElement | null>(null);

const mainCssClasses = computed(() => {
  const val = [$css.ui3nButton, $css[props.size], $css[props.type]];

  props.block && props.type !== 'icon' && val.push($css.block);
  props.icon && val.push($css[`withIcon-${props.iconPosition}`]);
  props.elevation && val.push($css.elevation);

  return val;
});

async function handleButtonEvent(eventName: Ui3nButtonEventName, value?: Event) {
  if (['init', 'enter'].includes(eventName)) {
    // @ts-ignore
    emits(eventName, buttonEl.value);
  } else {
    // @ts-ignore
    emits(eventName, value!);
  }
}

watch(
  [() => props.color, () => props.textColor],
  (newValue: [string | undefined, string | undefined], prevValue: [string | undefined, string | undefined]) => {
    if (!buttonEl.value) return;

    const [prevColor, prevTextColor] = prevValue;
    const [color, textColor] = newValue;

    (props.type === 'custom' || props.type === 'icon')
    && color !== prevColor
    && buttonEl.value.style.setProperty(
      '--ui3n-button-bg-color-custom',
      color ?? 'var(--color-bg-button-primary-default)',
    );

    props.type === 'custom'
    && textColor !== prevTextColor
    && buttonEl.value.style.setProperty(
      '--ui3n-button-text-color-custom',
      textColor ?? 'var(--color-text-button-primary-default',
    );
  },
);

onMounted(() => {
  if (!buttonEl.value) return;

  (props.type === 'custom' || props.type === 'icon')
  && props.color
  && buttonEl.value.style.setProperty('--ui3n-button-bg-color-custom', props.color);

  props.type === 'custom'
  && props.textColor
  && buttonEl.value.style.setProperty('--ui3n-button-text-color-custom', props.textColor);

  handleButtonEvent('init');
});
</script>

<template>
  <button
    ref="buttonEl"
    v-ui3n-ripple
    :class="mainCssClasses"
    type="button"
    :disabled="disabled"
    @click="handleButtonEvent('click', $event)"
    @focusin="handleButtonEvent('focus', $event)"
    @focusout="handleButtonEvent('blur', $event)"
    @keydown.enter="handleButtonEvent('enter')"
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
@use '../../assets/styles/mixins' as mixins;

.ui3nButton {
  --ui3n-button-padding: var(--spacing-m);
  --ui3n-button-text-size: var(--font-12);
  --ui3n-button-text-color-custom: var(--color-text-button-primary-default);
  --ui3n-button-bg-color-custom: var(--color-bg-button-primary-default);

  position: relative;
  width: max-content;
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
  overflow: hidden;

  &:not([disabled]) {
    cursor: pointer;
  }
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

.block {
  width: 100%;
}

.primary {
  background: var(--color-bg-button-primary-default);
  color: var(--color-text-button-primary-default);

  &:hover {
    background: var(--color-bg-button-primary-hover);
    color: var(--color-text-button-primary-hover);
  }

  &:focus {
    outline: 1px solid var(--color-border-button-primary-focused);
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
  }

  &:focus {
    outline: 1px solid var(--color-border-button-secondary-focused);
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

  &:focus {
    outline: 1px solid var(--color-border-button-secondary-focused);
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
  }

  &:focus {
    outline: 1px solid hsl(from var(--ui3n-button-icon-bg-color) h s calc(l - 10));
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
  }

  &:focus {
    outline: 1px solid hsl(from var(--ui3n-button-custom-bg-color) h s calc(l - 10));
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

.buttonIcon {
  pointer-events: none;
}

.text {
  display: inline-block;
  max-width: 100%;
  pointer-events: none;
}

.elevation {
  @include mixins.elevation();
}
</style>
