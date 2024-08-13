<script lang="ts" setup>
  import { computed } from 'vue'
  import Ui3nIcon from './ui3n-icon.vue'

  export interface Ui3nTableSortIconProps {
    size?: string | number;
    color?: string;
    value: 'asc' | 'desc';
  }

  const props = defineProps<Ui3nTableSortIconProps>()

  const iconSize = computed(() => props.size ? +props.size : 16)
  const iconColor = computed(() => props.color || 'var(--color-icon-table-primary-default)')
</script>

<template>
  <transition mode="out-in" name="fade">
    <ui3n-icon
      :key="value === 'asc' ? 'arrow-downward' : 'arrow-upward'"
      :icon="value === 'asc' ? 'arrow-downward' : 'arrow-upward'"
      :width="iconSize"
      :height="iconSize"
      :color="iconColor"
    />
  </transition>
</template>
