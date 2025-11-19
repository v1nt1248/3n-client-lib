<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';
import get from 'lodash/get';
import Ui3nBadgeSimple from './ui3n-badge-simple.vue';
import type { Ui3nBadgeProps } from './types';

const props = withDefaults(
  defineProps<Ui3nBadgeProps>(),
  {
    dot: false,
    value: '',
    color: 'var(--color-bg-button-primary-default)',
    textColor: 'var(--color-text-button-primary-default)',
    position: 'right-top',
  },
);

const slots = useSlots();
const badgeElementSize = ref<{
  width: number;
  height: number;
} | never>();

const hasDefaultSlot = computed(() => !!slots.default);
const style = computed(() => {
  const [xPosition, yPosition] = props.position.split('-');
  return {
    ...(xPosition === 'right' && { right: `-${get(badgeElementSize.value, 'width', 0) / 2}px` }),
    ...(xPosition === 'left' && { left: `-${get(badgeElementSize.value, 'width', 0) / 2}px` }),
    ...(yPosition === 'top' && { top: `-${get(badgeElementSize.value, 'height', 0) / 2}px` }),
    ...(yPosition === 'bottom' && { bottom: `-${get(badgeElementSize.value, 'height', 0) / 2}px` }),
  };
});
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div
    v-if="hasDefaultSlot"
    :class="$style.ui3nBadge"
  >
    <div :class="$style.ui3nBadgeWrapper">
      <slot />

      <ui3n-badge-simple
        :dot="dot"
        :value="value"
        :color="color"
        :text-color="textColor"
        :style="style"
        :class="$style.ui3nBadgeContent"
        @change:size="badgeElementSize = $event"
      />
    </div>
  </div>

  <ui3n-badge-simple
    v-else
    :dot="dot"
    :value="value"
    :color="color"
    :text-color="textColor"
  />
</template>

<style lang="scss" module>
.ui3nBadge {
  --ui3n-badge-size: 20px;

  position: relative;
}

.ui3nBadgeWrapper {
  position: relative;
  width: max-content;
}

.ui3nBadgeContent {
  position: absolute;
  z-index: 5;
}
</style>
