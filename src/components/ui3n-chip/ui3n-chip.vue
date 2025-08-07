<script lang="ts" setup>
  import { computed, useCssModule, useSlots } from 'vue';
  import Ui3nButton from '../ui3n-button/ui3n-button.vue';
  import type { Ui3nChipEmits, Ui3nChipProps, Ui3nChipSlots } from './types';

  const props = withDefaults(
    defineProps<Ui3nChipProps>(),
    {
      height: 24,
      maxWidth: 200,
      plain: false,
      round: true,
      closeable: false,
      color: 'var(--color-bg-control-secondary-default)',
      textSize: 10,
      textColor: 'var(--color-text-control-primary-default)',
    },
  );

  const emits = defineEmits<Ui3nChipEmits>();
  defineSlots<Ui3nChipSlots>();

  const slots = useSlots();
  const $css = useCssModule();

  const height = computed(() => `${props.height}px`);
  const iconHeight = computed(() => Number(props.height) - 4);

  const maxWidth = computed(() => `${props.maxWidth}px`);
  const bgColor = computed(() => props.color);
  const textSize = computed(() => `${props.textSize}px`);
  const textColor = computed(() => props.textColor);
  const hasLeftSlot = computed(() => !!slots.left);

  const padding = computed(() => {
    const padValue = Math.round(Number(props.height) / 3);

    if (hasLeftSlot.value) {
      return `0 ${padValue}px 0 4px`;
    }

    return `0 ${padValue}px`;
  });

  const mainCssClasses = computed(() => {
    const val = [$css.ui3nChip];

    props.round && val.push($css.round);
    props.plain && val.push($css.plain);
    props.closeable && val.push($css.closeable);
    hasLeftSlot.value && val.push($css.withIcon);

    return val;
  });

  function onClick() {
    emits('close');
  }
</script>

<template>
  <div :class="mainCssClasses">
    <div :class="$style.ui3nChipIcon">
      <slot
        name="left"
        :size="iconHeight"
        :color="textColor"
      />
    </div>

    <div :class="$style.ui3nChipBody">
      <slot />
    </div>

    <ui3n-button
      v-if="closeable"
      :class="$style.closeBtn"
      type="icon"
      size="small"
      color="transparent"
      icon="round-close"
      icon-color="var(--color-icon-control-primary-default)"
      :disabled="disabled"
      @click.stop.prevent="onClick"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nChip {
    position: relative;
    display: flex;
    height: v-bind('height');
    padding: v-bind('padding');
    width: max-content;
    max-width: v-bind('maxWidth');
    background-color: v-bind('bgColor');
    justify-content: flex-start;
    align-items: center;

    &.closeable:not(.withIcon) {
      .body {
        max-width: calc(100% - 24px);
      }
    }

    &.withIcon:not(.closeable) {
      .body {
        max-width: calc(100% - v-bind(height) - 4px);
      }
    }

    &.closable.withIcon {
      .body {
        max-width: calc(100% - v-bind(height) - 28px);
      }
    }
  }

  .ui3nChipBody {
    font-size: v-bind('textSize');
    line-height: 1;
    font-weight: 400;
    color: v-bind('textColor');
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .closeBtn {
    margin-left: var(--spacing-xs);
  }

  .withIcon {
    .ui3nChipIcon {
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      border-radius: 50%;
      overflow: hidden;
      margin-right: var(--spacing-xs);
    }
  }

  .round {
    border-radius: calc(v-bind('height') / 2);
  }

  .closeable {
    min-width: var(--spacing-ml);
    padding-right: 0;
  }

  .plain {
    border: 1px solid v-bind('textColor');
  }
</style>
