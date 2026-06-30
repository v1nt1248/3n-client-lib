<script setup lang="ts">
import { ref } from 'vue';

const chips = ref([
  { id: 1, label: 'JavaScript' },
  { id: 2, label: 'Python' },
  { id: 3, label: 'Go' },
  { id: 4, label: 'Rust' },
]);

function removeChip(id: number) {
  chips.value = chips.value.filter(c => c.id !== id);
}
</script>

<template>
  <div class="chips-container">
    <ui3n-chip
      v-for="chip in chips"
      :key="chip.id"
      :height="28"
      closeable
      @close="removeChip(chip.id)"
    >
      {{ chip.label }}
    </ui3n-chip>

    <span
      v-if="chips.length === 0"
      class="empty-text"
    >All chips removed</span>
  </div>
</template>

<style scoped>
  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .empty-text {
    font-size: 13px;
    color: var(--color-text-control-secondary-default);
  }
</style>