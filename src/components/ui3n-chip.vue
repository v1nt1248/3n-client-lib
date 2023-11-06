<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import Ui3nButton from './ui3n-button.vue'

  /* eslint-disable @typescript-eslint/no-explicit-any */
  export interface Ui3nChipProps {
    height?: number | string;
    maxWidth?: number | string;
    plain?: boolean;
    round?: boolean;
    closeable?: boolean;
    color?: string;
    textSize?: number | string;
    textColor?: string;
  }
  export interface Ui3nChipEmits {
    (ev: 'close'): void;
  }
  export interface Ui3nChipSlots {
    left: (props: { size: number; color: string }) => any;
    default: () => any;
  }

  const props = withDefaults(
    defineProps<Ui3nChipProps>(),
    {
      height: 24,
      maxWidth: 200,
      plain: false,
      round: true,
      closeable: false,
      color: '#f2f2f2',
      textSize: 10,
      textColor: '#212121',
    },
  )
  const emits = defineEmits<Ui3nChipEmits>()
  defineSlots<Ui3nChipSlots>()

  const slots = useSlots()

  const height = computed(() => `${props.height}px`)
  const iconHeight = computed(() => props.height ? Number(props.height) - 2 : Number(props.height))
  const padding = computed(() => `${Math.round(Number(props.height) / 3)}px`)
  const maxWidth = computed(() => `${props.maxWidth}px`)
  const bgColor = computed(() => props.color)
  const textSize = computed(() => `${props.textSize}px`)
  const textColor = computed(() => props.textColor)
  const hasLeftSlot = computed(() => !!slots.left)
</script>

<template>
  <div
    :class="[
      'ui3n-chip',
      {
        'ui3n-chip--round': props.round,
        'ui3n-chip--plain': props.plain,
        'ui3n-chip--closeble': props.closeable,
        'ui3n-chip--with-icon': hasLeftSlot,
      },
    ]"
  >
    <div class="ui3n-chip__icon">
      <slot
        name="left"
        :size="iconHeight"
        :color="props.textColor"
      />
    </div>
    
    <div class="ui3n-chip__body">
      <slot />
    </div>
    
    <ui3n-button
      v-if="props.closeable"
      class="ui3n-chip__close"
      round
      color="transparent"
      icon="close"
      icon-size="12"
      icon-color="#212121"
      @click="emits('close')"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/mixins";

  .ui3n-chip {
    position: relative;
    display: flex;
    height: v-bind('height');
    padding: 0 v-bind('padding');
    width: max-content;
    max-width: v-bind('maxWidth');
    background-color: v-bind('bgColor');
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__body {
      font-size: v-bind('textSize');
      line-height: 1;
      font-weight: 400;
      color: v-bind('textColor');
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__close {
      margin-left: var(--half-size, 4px);
    }

    &--with-icon {
      .ui3n-chip__icon {
        display: flex;
        margin-right: 5px;
      }
    }

    &--round {
      border-radius: calc(v-bind('height') / 2);
    }

    &--closeble {
      min-width: 24px;
      padding-right: 0;
    }

    &--plain {
      border: 1px solid v-bind('textColor');
    }

    &.ui3n-chip--closable:not(.ui3n-chip--with-icon) {
      .ui3n-chip__body {
        max-width: calc(100% - 24px);
      }
    }

    &.ui3n-chip--with-icon:not(.ui3n-chip--closable) {
      .ui3n-chip__body {
        max-width: calc(100% - v-bind(height) - 5px);
      }
    }

    &.ui3n-chip--closable.ui3n-chip--with-icon {
      .ui3n-chip__body {
        max-width: calc(100% - v-bind(height) - 29px);
      }
    }
  }
</style>
