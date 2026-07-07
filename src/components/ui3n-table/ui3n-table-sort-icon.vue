<script lang="ts" setup>
  import { computed } from 'vue';
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue';
  import type { Ui3nTableSortIconProps } from './types';

  const props = withDefaults(defineProps<Ui3nTableSortIconProps>(), {
    size: 16,
    color: 'var(--color-icon-table-primary-default)',
  });

  const iconName = computed(() => (props.value === 'asc' ? 'round-arrow-upward' : 'round-arrow-downward'));

  const parsedSize = computed(() => {
    const num = Number(props.size);
    return isNaN(num) ? 16 : num;
  });
</script>

<template>
  <transition
    mode="out-in"
    name="fade"
  >
    <ui3n-icon
      :key="iconName"
      :icon="iconName"
      :size="parsedSize"
      :color="color"
    />
  </transition>
</template>
