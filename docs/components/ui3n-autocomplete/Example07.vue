<script setup lang="ts">
import { ref } from 'vue';

const items = [
  { id: '1', name: 'vue' },
  { id: '2', name: 'react' },
  { id: '3', name: 'angular' },
  { id: '4', name: 'svelte' },
];

const value = ref([]);

function validateTag(tag: string): boolean {
  return tag.length >= 2 && tag.length <= 20;
}
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      placeholder="Type and press Enter to add tags"
      multiple
      chips
      clear-on-select
      :new-value-validator="validateTag"
    />
    <div class="value-display">
      Tags: {{ value.join(', ') || 'none' }}
    </div>
    <div class="hint">
      Type a new tag (2-20 chars) and press Enter to add it
    </div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 400px;
  }
  .value-display {
    margin-top: 8px;
    font-size: 12px;
    color: var(--color-text-block-secondary-default);
  }
  .hint {
    margin-top: 4px;
    font-size: 11px;
    color: var(--color-text-block-tertiary-default);
    font-style: italic;
  }
</style>