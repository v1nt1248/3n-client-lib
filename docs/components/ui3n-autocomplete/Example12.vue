<script setup lang="ts">
  import { ref } from 'vue';

  const items = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana', soldOut: true },
    { id: '3', name: 'Cherry' },
    { id: '4', name: 'Date', soldOut: true },
    { id: '5', name: 'Elderberry' },
  ];

  const value = ref([]);

  function isSoldOut(item: { soldOut?: boolean }): boolean {
    return !!item.soldOut;
  }
</script>

<template>
  <div class="demo-container">
    <ui3n-autocomplete
      v-model="value"
      :items="items"
      :item-disabled="isSoldOut"
      placeholder="Banana and Date are sold out"
      multiple
      chips
    >
      <template #item="{ item }">
        <div class="item">
          <span>{{ item.name }}</span>
          <span
            v-if="isSoldOut(item)"
            class="badge"
          >
            sold out
          </span>
        </div>
      </template>
    </ui3n-autocomplete>

    <div class="value-display">Selected: {{ value.length > 0 ? value.join(', ') : 'none' }}</div>

    <div class="hint">
      Disabled items stay in the list, and answer neither the pointer nor the arrow keys
    </div>
  </div>
</template>

<style scoped>
  .demo-container {
    width: 400px;
  }

  .item {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }

  .badge {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-block-accent-default);
  }

  .value-display {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    color: oklch(0.65 0.17 140);
  }

  .hint {
    margin-top: 4px;
    font-size: 11px;
    color: var(--color-text-block-accent-default);
    font-style: italic;
  }
</style>
