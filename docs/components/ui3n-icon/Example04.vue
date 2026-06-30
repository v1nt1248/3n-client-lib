<script setup lang="ts">
import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Ui3nIcon icon="round-arrow-forward" :size="32" />
    <Ui3nIcon icon="round-arrow-forward" :size="32" horizontal-flip />
    <Ui3nIcon icon="round-arrow-forward" :size="32" vertical-flip />
    <Ui3nIcon icon="round-arrow-forward" :size="32" :rotate="45" />
    <Ui3nIcon icon="round-arrow-forward" :size="32" :rotate="90" />
    <Ui3nIcon icon="round-arrow-forward" :size="32" :rotate="180" />
  </div>
</template>