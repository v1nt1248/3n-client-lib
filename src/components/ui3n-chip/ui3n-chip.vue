<script lang="ts" setup>
  import { computed, useSlots } from 'vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nChipEmits, Ui3nChipProps, Ui3nChipSlots } from './types';

  const props = withDefaults(defineProps<Ui3nChipProps>(), {
    height: 24,
    maxWidth: 200,
    plain: false,
    round: true,
    closeable: false,
    color: 'var(--color-bg-control-secondary-default)',
    textSize: 10,
    textColor: 'var(--color-text-control-primary-default)',
  });

  const emits = defineEmits<Ui3nChipEmits>();
  defineSlots<Ui3nChipSlots>();

  const slots = useSlots();

  const chipHeight = computed(() => {
    const num = Number(props.height);
    return isNaN(num) ? 24 : num;
  });
  const heightCss = computed(() => `${chipHeight.value}px`);
  const iconSize = computed(() => chipHeight.value - 4);

  const paddingCss = computed(() => {
    const padValue = Math.round(chipHeight.value / 3);
    return hasLeftSlot.value ? `0 ${padValue}px 0 4px` : `0 ${padValue}px`;
  });

  const maxWidthCss = computed(() => {
    const num = Number(props.maxWidth);
    return isNaN(num) ? String(props.maxWidth) : `${num}px`;
  });

  const bgColor = computed(() => props.color);

  const textSize = computed(() => {
    const num = Number(props.textSize);
    return isNaN(num) ? String(props.textSize) : `${num}px`;
  });

  const textColor = computed(() => props.textColor);

  const hasLeftSlot = computed(() => !!slots.left);
</script>

<template>
  <div
    :id="id"
    :class="[
      $style.ui3nChip,
      round && $style.round,
      plain && $style.plain,
      closeable && $style.closeable,
      hasLeftSlot && $style.withIcon,
    ]"
    :style="{
      '--ui3n-chip-height': heightCss,
      '--ui3n-chip-max-width': maxWidthCss,
      '--ui3n-chip-padding': paddingCss,
      '--ui3n-chip-bg-color': bgColor,
      '--ui3n-chip-font-size': textSize,
      '--ui3n-chip-font-color': textColor,
    }"
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
    position: relative;
    display: flex;
    height: var(--ui3n-chip-height);
    padding: var(--ui3n-chip-padding);
    width: max-content;
    max-width: var(--ui3n-chip-max-width);
    background-color: var(--ui3n-chip-bg-color);
    justify-content: flex-start;
    align-items: center;
    column-gap: 4px;

    &.closeable:not(.withIcon) {
      .body {
        max-width: calc(100% - 24px);
      }
    }

    &.withIcon:not(.closeable) {
      .body {
        max-width: calc(100% - var(--ui3n-chip-height) - 4px);
      }
    }

    &.closable.withIcon {
      .body {
        max-width: calc(100% - var(--ui3n-chip-height) - 28px);
      }
    }
  }

  .ui3nChipBody {
    font-size: var(--ui3n-chip-font-size);
    line-height: 1;
    font-weight: 400;
    color: var(--ui3n-chip-font-color);
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
    border-radius: calc(var(--ui3n-chip-height) / 2);
  }

  .closeable {
    min-width: 24px;
    padding-right: 0;
  }

  .plain {
    border: 1px solid var(--ui3n-chip-font-color);
  }
</style>
