<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';

  const clickCount = ref(0);

  function handleClick() {
    clickCount.value++;
  }
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <Ui3nIcon
      icon="round-bookmark"
      :size="32"
      color="var(--color-icon-control-accent-default)"
      style="cursor: pointer"
      @click="handleClick"
    />
    <span>Clicked: {{ clickCount }}</span>
  </div>
</template>
