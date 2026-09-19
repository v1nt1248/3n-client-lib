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
    :id="id"
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
    /*
     * Public variables are never declared here, only read with a fixed default,
     * so an application can set them at any level: :root, a container, the
     * element itself or from JS.
     */
    --_button-height: var(--ui3n-button-height, 32px);
    --_button-border-radius: var(--ui3n-button-border-radius, calc(var(--_button-height) / 2));
    --_button-gap: var(--ui3n-button-gap, 4px);
    --_button-outline-color: var(--ui3n-button-outline-color, transparent);
    --_button-padding: var(--ui3n-button-padding, 0 16px);
    --_button-padding-when-icon: var(--ui3n-button-padding-when-icon, 8px);
    --_button-font-size: var(--ui3n-button-font-size, 12px);
    --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-primary-default));
    --_button-bg-color: var(--ui3n-button-bg-color, var(--color-bg-button-primary-default));
    --_button-icon-small: var(--ui3n-button-icon-size-small, 24px);
    --_button-icon-regular: var(--ui3n-button-icon-size-regular, 32px);
    --_button-icon-large: var(--ui3n-button-icon-size-large, 48px);
    --_button-shadow-near: var(--ui3n-button-shadow-near-color, var(--shadow-key-1));
    --_button-shadow-far: var(--ui3n-button-shadow-far-color, var(--shadow-key-2));
    --_button-shadow-inset: var(--ui3n-button-shadow-inset-color, var(--shadow-key-3));

    position: relative;
    width: max-content;
    height: var(--_button-height);
    padding: var(--_button-padding);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: var(--_button-gap);
    border: none;
    border-radius: var(--_button-border-radius);
    outline: 2px solid var(--_button-outline-color);
    font-size: var(--_button-font-size);
    font-weight: 600;
    color: var(--_button-text-color);
    background-color: var(--_button-bg-color);
    user-select: none;
    overflow: hidden;
    transition:
      background-color 0.2s,
      transform 0.1s;

    &.withIcon-left {
      padding-left: var(--_button-padding-when-icon);
    }

    &.withIcon-right {
      padding-right: var(--_button-padding-when-icon);
    }

    &.square {
      --_button-border-radius: var(--ui3n-button-border-radius, calc(var(--_button-height) / 6));
    }

    &:not([disabled]) {
      cursor: pointer;
    }
  }

  /* Each size reads its own variable first, then the one shared by every size. */
  .regular {
    --_button-height: var(--ui3n-button-height-regular, var(--ui3n-button-height, 32px));
    --_button-padding: var(--ui3n-button-padding-regular, var(--ui3n-button-padding, 0 16px));
    --_button-padding-when-icon: var(
      --ui3n-button-padding-when-icon-regular,
      var(--ui3n-button-padding-when-icon, 8px)
    );
    --_button-font-size: var(--ui3n-button-font-size-regular, var(--ui3n-button-font-size, 12px));
  }

  .small {
    --_button-height: var(--ui3n-button-height-small, var(--ui3n-button-height, 24px));
    --_button-padding: var(--ui3n-button-padding-small, var(--ui3n-button-padding, 0 8px));
    --_button-padding-when-icon: var(
      --ui3n-button-padding-when-icon-small,
      var(--ui3n-button-padding-when-icon, 4px)
    );
    --_button-font-size: var(--ui3n-button-font-size-small, var(--ui3n-button-font-size, 12px));
  }

  .large {
    --_button-height: var(--ui3n-button-height-large, var(--ui3n-button-height, 48px));
    --_button-padding: var(--ui3n-button-padding-large, var(--ui3n-button-padding, 0 16px));
    --_button-padding-when-icon: var(
      --ui3n-button-padding-when-icon-large,
      var(--ui3n-button-padding-when-icon, 8px)
    );
    --_button-font-size: var(--ui3n-button-font-size-large, var(--ui3n-button-font-size, 15px));
  }

  .block {
    width: 100%;
  }

  .primary {
    --_button-bg-color: var(--ui3n-button-bg-color, var(--color-bg-button-primary-default));
    --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-primary-default));

    &:hover {
      --_button-bg-color: var(--ui3n-button-bg-color-hover, var(--color-bg-button-primary-hover));
      --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-primary-hover));
    }

    &:focus {
      --_button-text-color: var(--ui3n-button-text-color-focused, var(--color-text-button-primary-default));
      --_button-outline-color: var(
        --ui3n-button-outline-color-focused,
        oklch(from var(--color-bg-button-primary-default) calc(l - 0.185) c 260deg)
      );
    }

    &:active {
      --_button-bg-color: var(--ui3n-button-bg-color-pressed, var(--color-bg-button-primary-pressed));
      --_button-text-color: var(--ui3n-button-text-color-pressed, var(--color-text-button-primary-pressed));
      --_button-outline-color: transparent;
    }

    &[disabled] {
      --_button-bg-color: var(--ui3n-button-bg-color-disabled, var(--color-bg-button-primary-disabled));
      --_button-text-color: var(--ui3n-button-text-color-disabled, var(--color-text-button-primary-disabled));

      opacity: 0.7;
      pointer-events: none;
    }

    &.elevation {
      --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-primary-default));

      background-image: linear-gradient(
        var(--color-bg-button-primary-default),
        var(--color-bg-button-primary-hover)
      );
      box-shadow:
        0 1px 1px 0 var(--_button-shadow-near),
        0 2px 8px 0 var(--_button-shadow-far),
        inset 0 1px 1px 0 var(--_button-shadow-inset);

      .text {
        text-shadow: 0 1px 0 var(--_button-shadow-near);
      }

      &:hover {
        --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-primary-hover));

        background-image: linear-gradient(
          var(--color-bg-button-primary-default),
          var(--color-bg-button-primary-pressed)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &:focus {
        --_button-text-color: var(--ui3n-button-text-color-focused, var(--color-text-button-primary-default));
        --_button-outline-color: var(
          --ui3n-button-outline-color-focused,
          oklch(from var(--color-bg-button-primary-default) calc(l - 0.185) c 260deg)
        );

        background-image: linear-gradient(
          var(--color-bg-button-primary-default),
          var(--color-bg-button-primary-hover)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &:active {
        --_button-text-color: var(--ui3n-button-text-color-pressed, var(--color-text-button-primary-pressed));
        --_button-outline-color: transparent;

        background-image: linear-gradient(
          var(--color-bg-button-primary-hover),
          var(--color-bg-button-primary-pressed)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &[disabled] {
        --_button-bg-color: var(--ui3n-button-bg-color-disabled, var(--color-bg-button-primary-disabled));
        --_button-text-color: var(
          --ui3n-button-text-color-disabled,
          var(--color-text-button-primary-disabled)
        );

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
    --_button-bg-color: var(--ui3n-button-bg-color, var(--color-bg-button-secondary-default));
    --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-secondary-default));

    &:hover {
      --_button-bg-color: var(--ui3n-button-bg-color-hover, var(--color-bg-button-secondary-hover));
      --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-secondary-hover));
    }

    &:focus {
      --_button-text-color: var(--ui3n-button-text-color-focused, var(--color-text-button-secondary-default));
      --_button-outline-color: var(
        --ui3n-button-outline-color-focused,
        oklch(from var(--color-bg-button-secondary-default) calc(l - 0.185) c 260deg)
      );
    }

    &:active {
      --_button-bg-color: var(--ui3n-button-bg-color-pressed, var(--color-bg-button-secondary-pressed));
      --_button-text-color: var(--ui3n-button-text-color-pressed, var(--color-text-button-secondary-pressed));
      --_button-outline-color: transparent;
    }

    &[disabled] {
      --_button-bg-color: var(--ui3n-button-bg-color-disabled, var(--color-bg-button-secondary-disabled));
      --_button-text-color: var(
        --ui3n-button-text-color-disabled,
        var(--color-text-button-secondary-disabled)
      );

      opacity: 0.7;
      pointer-events: none;
    }

    &.elevation {
      --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-secondary-default));

      background-image: linear-gradient(
        var(--color-bg-button-secondary-default),
        var(--color-bg-button-secondary-hover)
      );
      box-shadow:
        0 1px 1px 0 var(--_button-shadow-near),
        0 2px 8px 0 var(--_button-shadow-far),
        inset 0 1px 1px 0 var(--_button-shadow-inset);

      &:hover {
        --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-secondary-hover));

        background-image: linear-gradient(
          var(--color-bg-button-secondary-hover),
          var(--color-bg-button-secondary-pressed)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &:focus {
        --_button-text-color: var(
          --ui3n-button-text-color-focused,
          var(--color-text-button-secondary-default)
        );
        --_button-outline-color: var(
          --ui3n-button-outline-color-focused,
          var(--color-border-button-secondary-focused)
        );

        background-image: linear-gradient(
          var(--color-bg-button-secondary-default),
          var(--color-bg-button-secondary-hover)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &:active {
        --_button-text-color: var(
          --ui3n-button-text-color-pressed,
          var(--color-text-button-secondary-pressed)
        );
        --_button-outline-color: transparent;

        background-image: linear-gradient(
          var(--color-bg-button-secondary-hover),
          var(--color-bg-button-secondary-pressed)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &[disabled] {
        --_button-bg-color: var(--ui3n-button-bg-color-disabled, var(--color-bg-button-secondary-disabled));
        --_button-text-color: var(
          --ui3n-button-text-color-disabled,
          var(--color-text-button-secondary-disabled)
        );

        opacity: 0.7;
        background-image: none;
        box-shadow: none;
        pointer-events: none;
      }
    }
  }

  .tertiary {
    --_button-bg-color: var(--ui3n-button-bg-color, var(--color-bg-button-tritery-default));
    --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-tritery-default));

    &:hover {
      --_button-bg-color: var(--ui3n-button-bg-color-hover, var(--color-bg-button-tritery-hover));
      --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-tritery-hover));
    }

    &:focus {
      --_button-bg-color: var(--ui3n-button-bg-color, var(--color-bg-button-tritery-default));
      --_button-text-color: var(--ui3n-button-text-color-focused, var(--color-text-button-tritery-focused));
      --_button-outline-color: var(
        --ui3n-button-outline-color-focused,
        oklch(from var(--color-bg-button-tritery-default) calc(l - 0.185) c 260deg)
      );
    }

    &:active {
      --_button-bg-color: var(--ui3n-button-bg-color-pressed, var(--color-bg-button-tritery-pressed));
      --_button-text-color: var(--ui3n-button-text-color-pressed, var(--color-text-button-tritery-pressed));
      --_button-outline-color: transparent;
    }

    &[disabled] {
      --_button-bg-color: var(--ui3n-button-bg-color-disabled, var(--color-bg-button-tritery-disabled));
      --_button-text-color: var(--ui3n-button-text-color-disabled, var(--color-text-button-tritery-disabled));

      opacity: 0.7;
      pointer-events: none;
    }

    &.elevation {
      --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-tritery-default));

      background-image: linear-gradient(
        var(--color-bg-button-tritery-default),
        var(--color-bg-button-tritery-hover)
      );
      box-shadow:
        0 1px 1px 0 var(--_button-shadow-near),
        0 2px 8px 0 var(--_button-shadow-far),
        inset 0 1px 1px 0 var(--_button-shadow-inset);

      &:hover {
        --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-tritery-hover));

        background-image: linear-gradient(
          var(--color-bg-button-tritery-hover),
          var(--color-bg-button-tritery-pressed)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &:focus {
        --_button-text-color: var(
          --ui3n-button-text-color-focused,
          var(--color-text-button-tritery-focused)
        );
        --_button-outline-color: var(
          --ui3n-button-outline-color-focused,
          oklch(from var(--color-bg-button-tritery-default) calc(l - 0.185) c 260deg)
        );

        background-image: linear-gradient(
          var(--color-bg-button-tritery-default),
          var(--color-bg-button-tritery-hover)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &:active {
        --_button-text-color: var(
          --ui3n-button-text-color-pressed,
          var(--color-text-button-tritery-pressed)
        );
        --_button-outline-color: transparent;

        background-image: linear-gradient(
          var(--color-bg-button-tritery-hover),
          var(--color-bg-button-tritery-pressed)
        );
        box-shadow:
          0 1px 1px 0 var(--_button-shadow-near),
          0 2px 8px 0 var(--_button-shadow-far),
          inset 0 1px 1px 0 var(--_button-shadow-inset);
      }

      &[disabled] {
        --_button-bg-color: var(--ui3n-button-bg-color-disabled, var(--color-bg-button-tritery-disabled));
        --_button-text-color: var(
          --ui3n-button-text-color-disabled,
          var(--color-text-button-tritery-disabled)
        );

        opacity: 0.7;
        background-image: none;
        box-shadow: none;
        pointer-events: none;
      }
    }
  }

  .outline {
    --_button-bg-color: var(--ui3n-button-bg-color, transparent);
    --_button-text-color: var(--ui3n-button-text-color, var(--color-text-button-secondary-default));
    --_button-outline-color: var(--ui3n-button-outline-color, var(--_button-text-color));

    &:hover {
      --_button-bg-color: var(
        --ui3n-button-bg-color-hover,
        oklch(from var(--color-text-button-secondary-default) l c h / 0.08)
      );
      --_button-text-color: var(--ui3n-button-text-color-hover, var(--color-text-button-secondary-hover));
      --_button-outline-color: var(--ui3n-button-outline-color-hover, var(--_button-text-color));
    }

    &:focus {
      --_button-bg-color: transparent;
      --_button-text-color: var(
        --ui3n-button-text-color-focused,
        oklch(from var(--color-text-button-secondary-default) calc(l * 0.9) c calc(h * 1.1))
      );
      --_button-outline-color: var(--ui3n-button-outline-color-focused, var(--_button-text-color));
    }

    &:active {
      --_button-bg-color: var(
        --ui3n-button-bg-color-pressed,
        oklch(from var(--color-text-button-secondary-default) l c h / 0.12)
      );
      --_button-text-color: var(--ui3n-button-text-color-pressed, var(--color-text-button-secondary-pressed));
      --_button-outline-color: var(--ui3n-button-outline-color-pressed, var(--_button-text-color));
    }

    &[disabled] {
      --_button-bg-color: transparent;
      --_button-text-color: var(
        --ui3n-button-text-color-disabled,
        var(--color-text-button-secondary-disabled)
      );

      pointer-events: none;
    }
  }

  .icon {
    padding: 0 !important;

    &:not(.square) {
      border-radius: 50%;
    }

    &.regular {
      min-width: var(--_button-icon-regular);
      width: var(--_button-icon-regular);
    }

    &.small {
      min-width: var(--_button-icon-small);
      width: var(--_button-icon-small);
    }

    &.large {
      min-width: var(--_button-icon-large);
      width: var(--_button-icon-large);
    }
  }

  .icon,
  .custom {
    &:hover {
      background-color: var(
        --ui3n-button-bg-color-hover,
        oklch(from var(--_button-bg-color) calc(l - 0.185) c h)
      );
    }

    &:focus {
      --_button-outline-color: var(
        --ui3n-button-outline-color-focused,
        oklch(from var(--_button-bg-color) calc(l - 0.185) c h)
      );

      background-color: var(--_button-bg-color);
    }

    &:active {
      --_button-outline-color: transparent;

      background-color: var(
        --ui3n-button-bg-color-pressed,
        oklch(from var(--_button-bg-color) calc(l - 0.205) c h)
      );
    }

    &[disabled] {
      background-color: var(
        --ui3n-button-bg-color-disabled,
        oklch(from var(--_button-bg-color) calc(l + 0.15) c h)
      );
      color: var(
        --ui3n-button-text-color-disabled,
        oklch(from var(--_button-text-color) calc(l + 0.15) c 260deg)
      );
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
