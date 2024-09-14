<script lang="ts" setup>
import { computed, useSlots } from 'vue';
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

const height = computed(() => `${props.height}px`);
const iconHeight = computed(() => props.height ? Number(props.height) - 2 : Number(props.height));
const padding = computed(() => `${Math.round(Number(props.height) / 3)}px`);
const maxWidth = computed(() => `${props.maxWidth}px`);
const bgColor = computed(() => props.color);
const textSize = computed(() => `${props.textSize}px`);
const textColor = computed(() => props.textColor);
const hasLeftSlot = computed(() => !!slots.left);
</script>

<template>
  <div
    :class="[
      $style.chip,
      round && $style.round,
      plain && $style.plain,
      closeable && $style.closable,
      hasLeftSlot && $style.withIcon,
    ]"
  >
    <div :class="$style.icon">
      <slot name="left" :size="iconHeight" :color="props.textColor" />
    </div>

    <div :class="$style.body">
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
      @click="emits('close')"
    />
  </div>
</template>

<style lang="scss" module>
@import "../../assets/styles/mixins";

.chip {
  position: relative;
  display: flex;
  height: v-bind('height');
  padding: 0 v-bind('padding');
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

.body {
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
  .icon {
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
