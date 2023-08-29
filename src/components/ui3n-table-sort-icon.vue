<script lang="ts" setup>
  import { computed } from 'vue'
  import Ui3nIcon from './ui3n-icon.vue'

  const props = defineProps<{
    size?: string | number;
    color?: string;
    value: 'asc' | 'desc';
  }>()

  const iconSize = computed(() => props.size ? +props.size : 16)
  const iconColor = computed(() => props.color || 'var(--black-90, #212121)')
</script>

<template>
  <ui3n-icon
    :icon="props.value === 'asc' ? 'arrow-downward' : 'arrow-upward'"
    :width="iconSize"
    :height="iconSize"
    :color="iconColor"
    class="ui3n-table-sort-icon"
  />
</template>
