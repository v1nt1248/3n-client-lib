<script setup lang="ts">
import { ref } from 'vue';

const chips = ref([
  { id: 1, label: 'Vue.js', icon: 'shield-check-outline' },
  { id: 2, label: 'TypeScript', icon: 'book-open-blank-variant' },
  { id: 3, label: 'Vite', icon: 'numbers' },
]);
</script>

<template>
  <div class="chips-container">
    <ui3n-chip
      v-for="chip in chips"
      :key="chip.id"
      :height="28"
    >
      <template #left="{ size, color }">
        <ui3n-icon
          :icon="chip.icon"
          :size="size"
          :color="color"
        />
      </template>
      {{ chip.label }}
    </ui3n-chip>
  </div>
</template>

<style scoped>
  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
</style>