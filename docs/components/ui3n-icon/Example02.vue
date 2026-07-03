<script setup lang="ts">
  import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <Ui3nIcon
      icon="round-check-circle-outline"
      :size="32"
      color="var(--success-content-default)"
    />
    <Ui3nIcon
      icon="round-close"
      :size="32"
      color="var(--error-content-default)"
    />
    <Ui3nIcon
      icon="outline-info"
      :size="32"
      color="var(--color-icon-control-accent-default)"
    />
    <Ui3nIcon
      icon="round-warning"
      :size="32"
      color="#ff9800"
    />
  </div>
</template>
