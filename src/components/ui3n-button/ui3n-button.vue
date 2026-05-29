<script lang="ts" setup>
  import { computed, onMounted, ref, watch, useCssModule } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import Ui3nRipple from '../../directives/ui3n-ripple';
  import { iconSizeByButtonSize } from './constants';
  import type { Ui3nButtonEmits, Ui3nButtonProps, Ui3nButtonSlots, Ui3nButtonEventName } from './types';

  const vUi3nRipple = Ui3nRipple;

  const props = withDefaults(defineProps<Ui3nButtonProps>(), {
    type: 'primary',
    size: 'regular',
    iconPosition: 'right',
    disabled: false,
  });
  const emits = defineEmits<Ui3nButtonEmits>();
  defineSlots<Ui3nButtonSlots>();

  const $css = useCssModule();

  const buttonEl = ref<HTMLButtonElement | null>(null);

  const mainCssClasses = computed(() => {
    const val = [$css.ui3nButton, $css[props.size], $css[props.type]];

    props.block && props.type !== 'icon' && val.push($css.block);
    props.square && val.push($css.square);
    props.icon && val.push($css[`withIcon-${props.iconPosition}`]);
    props.elevation && val.push($css.elevation);

    return val;
  });

  const currentIconSize = computed(() => {
    if (props.iconSize) {
      return props.iconSize;
    }

    return iconSizeByButtonSize[props.size];
  });

  const currentIconColor = computed(() => {
    if (props.iconColor) {
      return props.iconColor;
    }

    return 'inherit';
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
      if (!buttonEl.value) {
        return;
      }

      const [prevColor, prevTextColor] = prevValue;
      const [color, textColor] = newValue;

      (props.type === 'custom' || props.type === 'icon') &&
        color !== prevColor &&
        buttonEl.value.style.setProperty(
          '--ui3n-button-bg-color',
          color ?? 'var(--color-bg-button-primary-default)',
        );

      (props.type === 'custom' || props.type === 'icon') &&
        textColor !== prevTextColor &&
        buttonEl.value.style.setProperty(
          '--ui3n-button-text-color',
          textColor ?? 'var(--color-text-button-primary-default)',
        );
    },
  );

  onMounted(() => {
    if (!buttonEl.value) {
      return;
    }

    (props.type === 'custom' || props.type === 'icon') &&
      props.color &&
      buttonEl.value.style.setProperty('--ui3n-button-bg-color', props.color);

    props.type === 'custom' &&
      props.textColor &&
      buttonEl.value.style.setProperty('--ui3n-button-text-color', props.textColor);

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
      :size="currentIconSize"
      :color="currentIconColor"
    />

    <span
      v-if="type !== 'icon'"
      :class="$style.text"
    >
      <slot />
    </span>
  </button>
</template>

<style lang="scss" module>
  @use '../../assets/styles/mixins' as mixins;

  .ui3nButton {
    --ui3n-button-height: 32px;
    --ui3n-button-border-radius: calc(var(--ui3n-button-height) / 2);
    --ui3n-button-outline-color: transparent;
    --ui3n-button-padding: 0 var(--spacing-m);
    --ui3n-button-padding-when-icon: var(--spacing-s);
    --ui3n-button-text-size: var(--font-12);
    --ui3n-button-text-color: var(--color-text-button-primary-default);
    --ui3n-button-bg-color: var(--color-bg-button-primary-default);

    position: relative;
    width: max-content;
    height: var(--ui3n-button-height);
    padding: var(--ui3n-button-padding);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: var(--spacing-xs);
    border: none;
    border-radius: var(--ui3n-button-border-radius);
    outline: 2px solid var(--ui3n-button-outline-color);
    font-size: var(--ui3n-button-text-size);
    font-weight: 600;
    color: var(--ui3n-button-text-color);
    background-color: var(--ui3n-button-bg-color);
    user-select: none;
    overflow: hidden;
    transition:
      background-color 0.2s,
      transform 0.1s;

    &.withIcon-left {
      padding-left: var(--ui3n-button-padding-when-icon);
    }

    &.withIcon-right {
      padding-right: var(--ui3n-button-padding-when-icon);
    }

    &.square {
      --ui3n-button-border-radius: calc(var(--ui3n-button-height) / 6);
    }

    &:not([disabled]) {
      cursor: pointer;
    }
  }

  .regular {
    --ui3n-button-height: 32px;
    --ui3n-button-padding: 0 var(--spacing-m);
    --ui3n-button-padding-when-icon: var(--spacing-s);
    --ui3n-button-text-size: var(--font-12);
  }

  .small {
    --ui3n-button-height: 24px;
    --ui3n-button-padding: 0 var(--spacing-s);
    --ui3n-button-padding-when-icon: var(--spacing-xs);
    --ui3n-button-text-size: var(--font-12);
  }

  .large {
    --ui3n-button-height: 48px;
    --ui3n-button-padding: 0 var(--spacing-m);
    --ui3n-button-padding-when-icon: var(--spacing-s);
    --ui3n-button-text-size: var(--font-15);
  }

  .block {
    width: 100%;
  }

  .primary {
    --ui3n-button-bg-color: var(--color-bg-button-primary-default);
    --ui3n-button-text-color: var(--color-text-button-primary-default);

    &:hover {
      --ui3n-button-bg-color: var(--color-bg-button-primary-hover);
      --ui3n-button-text-color: var(--color-text-button-primary-hover);
    }

    &:focus {
      --ui3n-button-text-color: var(--color-text-button-primary-default);
      --ui3n-button-outline-color: oklch(from var(--color-bg-button-primary-default) calc(l - 0.185) c 260deg);
    }

    &:active {
      --ui3n-button-bg-color: var(--color-bg-button-primary-pressed);
      --ui3n-button-text-color: var(--color-text-button-primary-pressed);
      --ui3n-button-outline-color: transparent;
    }

    &[disabled] {
      --ui3n-button-bg-color: var(--color-bg-button-primary-disabled);
      --ui3n-button-text-color: var(--color-text-button-primary-disabled);

      opacity: 0.7;
      pointer-events: none;
    }

    &.elevation {
      --ui3n-button-text-color: var(--color-text-button-primary-default);

      background-image: linear-gradient(
        var(--color-bg-button-primary-default),
        var(--color-bg-button-primary-hover)
      );
      box-shadow:
        0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
        0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.4),
        inset 0 1px 1px 0 oklch(from var(--blue-0) l c h / 0.25);

      .text {
        text-shadow: 0 1px 0 oklch(from var(--blue-100) l c h / 0.25);
      }

      &:hover {
        --ui3n-button-text-color: var(--color-text-button-primary-hover);

        background-image: linear-gradient(
          var(--color-bg-button-primary-default),
          var(--color-bg-button-primary-pressed)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);
      }

      &:focus {
        --ui3n-button-text-color: var(--color-text-button-primary-default);
        --ui3n-button-outline-color: oklch(from var(--color-bg-button-primary-default) calc(l - 0.185) c 260deg);

        background-image: linear-gradient(
          var(--color-bg-button-primary-default),
          var(--color-bg-button-primary-hover)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);
      }

      &:active {
        --ui3n-button-text-color: var(--color-text-button-primary-pressed);
        --ui3n-button-outline-color: transparent;

        background-image: linear-gradient(
          var(--color-bg-button-primary-hover),
          var(--color-bg-button-primary-pressed)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);
      }

      &[disabled] {
        --ui3n-button-bg-color: var(--color-bg-button-primary-disabled);
        --ui3n-button-text-color: var(--color-text-button-primary-disabled);

        opacity: 0.7;
        background-image: none;
        box-shadow: none;
        pointer-events: none;

        .text {
          text-shadow: none;
        }
      }
    }
  }

  .secondary {
    --ui3n-button-bg-color: var(--color-bg-button-secondary-default);
    --ui3n-button-text-color: var(--color-text-button-secondary-default);

    &:hover {
      --ui3n-button-bg-color: var(--color-bg-button-secondary-hover);
      --ui3n-button-text-color: var(--color-text-button-secondary-hover);
    }

    &:focus {
      --ui3n-button-text-color: var(--color-text-button-secondary-default);
      --ui3n-button-outline-color: oklch(from var(--color-bg-button-secondary-default) calc(l - 0.185) c 260deg);
    }

    &:active {
      --ui3n-button-bg-color: var(--color-bg-button-secondary-pressed);
      --ui3n-button-text-color: var(--color-text-button-secondary-pressed);
      --ui3n-button-outline-color: transparent;
    }

    &[disabled] {
      --ui3n-button-bg-color: var(--color-bg-button-secondary-disabled);
      --ui3n-button-text-color: var(--color-text-button-secondary-disabled);

      opacity: 0.7;
      pointer-events: none;
    }

    &.elevation {
      --ui3n-button-text-color: var(--color-text-button-secondary-default);

      background-image: linear-gradient(
        var(--color-bg-button-secondary-default),
        var(--color-bg-button-secondary-hover)
      );
      box-shadow:
        0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
        0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
        inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);

      &:hover {
        --ui3n-button-text-color: var(--color-text-button-secondary-hover);

        background-image: linear-gradient(
          var(--color-bg-button-secondary-hover),
          var(--color-bg-button-secondary-pressed)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);
      }

      &:focus {
        --ui3n-button-text-color: var(--color-text-button-secondary-default);
        --ui3n-button-outline-color: var(--color-border-button-secondary-focused);

        background-image: linear-gradient(
          var(--color-bg-button-secondary-default),
          var(--color-bg-button-secondary-hover)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);
      }

      &:active {
        --ui3n-button-text-color: var(--color-text-button-secondary-pressed);
        --ui3n-button-outline-color: transparent;

        background-image: linear-gradient(
          var(--color-bg-button-secondary-hover),
          var(--color-bg-button-secondary-pressed)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 oklch(from var(--blue-30) l c h / 0.25);
      }

      &[disabled] {
        --ui3n-button-bg-color: var(--color-bg-button-secondary-disabled);
        --ui3n-button-text-color: var(--color-text-button-secondary-disabled);

        opacity: 0.7;
        background-image: none;
        box-shadow: none;
        pointer-events: none;
      }
    }
  }

  .tertiary {
    --ui3n-button-bg-color: var(--color-bg-button-tritery-default);
    --ui3n-button-text-color: var(--color-text-button-tritery-default);

    &:hover {
      --ui3n-button-bg-color: var(--color-bg-button-tritery-hover);
      --ui3n-button-text-color: var(--color-text-button-tritery-hover);
    }

    &:focus {
      --ui3n-button-bg-color: var(--color-bg-button-tritery-default);
      --ui3n-button-text-color: var(--color-text-button-tritery-focused);
      --ui3n-button-outline-color: oklch(from var(--color-bg-button-tritery-default) calc(l - 0.185) c 260deg);
    }

    &:active {
      --ui3n-button-bg-color: var(--color-bg-button-tritery-pressed);
      --ui3n-button-text-color: var(--color-text-button-tritery-pressed);
      --ui3n-button-outline-color: transparent;
    }

    &[disabled] {
      --ui3n-button-bg-color: var(--color-bg-button-tritery-disabled);
      --ui3n-button-text-color: var(--color-text-button-tritery-disabled);

      opacity: 0.7;
      pointer-events: none;
    }

    &.elevation {
      --ui3n-button-text-color: var(--color-text-button-tritery-default);

      background-image: linear-gradient(
        var(--color-bg-button-tritery-default),
        var(--color-bg-button-tritery-hover)
      );
      box-shadow:
        0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
        0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
        inset 0 1px 1px 0 var(--black-12);

      &:hover {
        --ui3n-button-text-color: var(--color-text-button-tritery-hover);

        background-image: linear-gradient(
          var(--color-bg-button-tritery-hover),
          var(--color-bg-button-tritery-pressed)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 var(--black-12);
      }

      &:focus {
        --ui3n-button-text-color: var(--color-text-button-tritery-focused);
        --ui3n-button-outline-color: oklch(from var(--color-bg-button-tritery-default) calc(l - 0.185) c 260deg);

        background-image: linear-gradient(
          var(--color-bg-button-tritery-default),
          var(--color-bg-button-tritery-hover)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 var(--black-12);
      }

      &:active {
        --ui3n-button-text-color: var(--color-text-button-tritery-pressed);
        --ui3n-button-outline-color: transparent;

        background-image: linear-gradient(
          var(--color-bg-button-tritery-hover),
          var(--color-bg-button-tritery-pressed)
        );
        box-shadow:
          0 1px 1px 0 oklch(from var(--blue-100) l c h / 0.25),
          0 2px 8px 0 oklch(from var(--blue-100) l c h / 0.25),
          inset 0 1px 1px 0 var(--black-12);
      }

      &[disabled] {
        --ui3n-button-bg-color: var(--color-bg-button-tritery-disabled);
        --ui3n-button-text-color: var(--color-text-button-tritery-disabled);

        opacity: 0.7;
        background-image: none;
        box-shadow: none;
        pointer-events: none;
      }
    }
  }

  .outline {
    --ui3n-button-bg-color: transparent;
    --ui3n-button-text-color: var(--color-text-button-secondary-default);
    --ui3n-button-outline-color: var(--ui3n-button-text-color);

    &:hover {
      --ui3n-button-bg-color: oklch(from var(--color-text-button-secondary-default) l c h / 0.08);
      --ui3n-button-text-color: var(--color-text-button-secondary-hover);
      --ui3n-button-outline-color: var(--ui3n-button-text-color);
    }

    &:focus {
      --ui3n-button-bg-color: transparent;
      --ui3n-button-text-color: oklch(
        from var(--color-text-button-secondary-default) calc(l * 0.9) c calc(h * 1.1)
      );
      --ui3n-button-outline-color: var(--ui3n-button-text-color);
    }

    &:active {
      --ui3n-button-bg-color: oklch(from var(--color-text-button-secondary-default) l c h / 0.12);
      --ui3n-button-text-color: var(--color-text-button-secondary-pressed);
      --ui3n-button-outline-color: var(--ui3n-button-text-color);
    }

    &[disabled] {
      --ui3n-button-bg-color: transparent;
      --ui3n-button-text-color: var(--color-text-button-secondary-disabled);

      pointer-events: none;
    }
  }

  .icon {
    padding: 0 !important;

    &:not(.square) {
      border-radius: 50%;
    }

    &.regular {
      min-width: var(--spacing-l);
      width: var(--spacing-l);
    }

    &.small {
      min-width: var(--spacing-ml);
      width: var(--spacing-ml);
    }

    &.large {
      min-width: var(--spacing-xxl);
      width: var(--spacing-xxl);
    }
  }

  .icon,
  .custom {
    &:hover {
      background-color: oklch(from var(--ui3n-button-bg-color) calc(l - 0.185) c h);
    }

    &:focus {
      --ui3n-button-outline-color: oklch(from var(--ui3n-button-bg-color) calc(l - 0.185) c h);

      background-color: var(--ui3n-button-bg-color);
    }

    &:active {
      --ui3n-button-outline-color: transparent;

      background-color: oklch(from var(--ui3n-button-bg-color) calc(l - 0.205) c h);
    }

    &[disabled] {
      background-color: oklch(from var(--ui3n-button-bg-color) calc(l + 0.15) c h);
      color: oklch(from var(--ui3n-button-text-color) calc(l + 0.15) c 260deg);
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
    user-select: none;
  }
</style>
