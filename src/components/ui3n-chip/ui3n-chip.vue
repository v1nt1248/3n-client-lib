<script lang="ts" setup>
  import { computed, useSlots } from 'vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import { toCssLength } from '../../utils/ui/to-css-length';
  import type { Ui3nChipEmits, Ui3nChipProps, Ui3nChipSlots } from './types';

  /*
   * Sizes and colours have their defaults in CSS, not here, so that an
   * application can override them from a stylesheet. A prop, when given,
   * arrives as an inline variable and wins over any of that.
   */
  const DEFAULT_HEIGHT = 24;
  const DEFAULT_TEXT_COLOR = 'var(--color-text-control-primary-default)';

  const props = withDefaults(defineProps<Ui3nChipProps>(), {
    plain: false,
    round: true,
    closeable: false,
  });

  const emits = defineEmits<Ui3nChipEmits>();
  defineSlots<Ui3nChipSlots>();

  const slots = useSlots();

  const hasLeftSlot = computed(() => !!slots.left);

  /* the icon of the left slot is sized in JS, so it needs a number to work with */
  const chipHeight = computed(() => {
    const num = Number(props.height);
    return Number.isNaN(num) || !props.height ? DEFAULT_HEIGHT : num;
  });
  const iconSize = computed(() => chipHeight.value - 4);
  const textColor = computed(() => props.textColor ?? DEFAULT_TEXT_COLOR);

  const inlineStyles = computed(() => {
    const styles: Record<string, string> = {};

    if (props.height !== undefined) {
      styles['--ui3n-chip-height'] = toCssLength(props.height);
    }

    if (props.maxWidth !== undefined) {
      styles['--ui3n-chip-max-width'] = toCssLength(props.maxWidth);
    }

    if (props.color) {
      styles['--ui3n-chip-bg-color'] = props.color;
    }

    if (props.textSize !== undefined) {
      styles['--ui3n-chip-font-size'] = toCssLength(props.textSize);
    }

    if (props.textColor) {
      styles['--ui3n-chip-font-color'] = props.textColor;
    }

    return styles;
  });
</script>

<template>
  <div
    :id="id"
    data-ui3n="chip"
    :class="[
      $style.ui3nChip,
      round && $style.round,
      plain && $style.plain,
      closeable && $style.closeable,
      hasLeftSlot && $style.withIcon,
    ]"
    :style="inlineStyles"
    @click="emits('click', $event)"
  >
    <div :class="$style.ui3nChipIcon">
      <slot
        name="left"
        :size="iconSize"
        :color="textColor"
      />
    </div>

    <div :class="$style.ui3nChipBody">
      <slot />
    </div>

    <ui3n-button
      v-if="closeable"
      type="icon"
      size="small"
      color="transparent"
      icon="round-close"
      icon-color="var(--color-icon-control-primary-default)"
      :disabled="disabled"
      @click.stop.prevent="emits('close')"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nChip {
    --_chip-height: var(--ui3n-chip-height, 24px);
    --_chip-font-color: var(--ui3n-chip-font-color, var(--color-text-control-primary-default));

    /* the side padding follows the height, as it did when JS computed it */
    --_chip-padding: var(--ui3n-chip-padding, 0 calc(var(--_chip-height) / 3));

    position: relative;
    display: flex;
    height: var(--_chip-height);
    padding: var(--_chip-padding);
    width: max-content;
    max-width: var(--ui3n-chip-max-width, 200px);
    background-color: var(--ui3n-chip-bg-color, var(--color-bg-control-secondary-default));
    justify-content: flex-start;
    align-items: center;
    column-gap: 4px;

    &.withIcon {
      padding-left: 4px;
    }

    &.closeable:not(.withIcon) {
      .body {
        max-width: calc(100% - 24px);
      }
    }

    &.withIcon:not(.closeable) {
      .body {
        max-width: calc(100% - var(--_chip-height) - 4px);
      }
    }

    &.closable.withIcon {
      .body {
        max-width: calc(100% - var(--_chip-height) - 28px);
      }
    }
  }

  .ui3nChipBody {
    font-size: var(--ui3n-chip-font-size, 10px);
    line-height: 1;
    font-weight: 400;
    color: var(--_chip-font-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .withIcon {
    .ui3nChipIcon {
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .round {
    border-radius: calc(var(--_chip-height) / 2);
  }

  .closeable {
    min-width: 24px;
    padding-right: 0;
  }

  .plain {
    border: 1px solid var(--_chip-font-color);
  }
</style>
