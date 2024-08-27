<script lang="ts" setup>
  import { computed } from 'vue'
  import Ui3nIcon from '../ui3n-icon/ui3n-icon.vue'
  import type { Ui3nTableSortIconProps } from './types';

  const props = defineProps<Ui3nTableSortIconProps>()

  const iconSize = computed(() => props.size ? +props.size : 16)
  const iconColor = computed(() => props.color || 'var(--color-icon-table-primary-default)')
</script>

<template>
  <transition mode="out-in" name="fade">
    <ui3n-icon
      :key="value === 'asc' ? 'baseline-arrow-downward' : 'baseline-arrow-upward'"
      :icon="value === 'asc' ? 'baseline-arrow-downward' : 'baseline-arrow-upward'"
      :width="iconSize"
      :height="iconSize"
      :color="iconColor"
    />
  </transition>
</template>
