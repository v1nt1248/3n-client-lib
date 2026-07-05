<script setup lang="ts">
  interface FruitItem {
    code: string;
    name: string;
  }

  const fruits: FruitItem[] = [
    { code: 'ap', name: 'Apple' },
    { code: 'ba', name: 'Banana' },
    { code: 'ch', name: 'Cherry' },
    { code: 'dt', name: 'Date' },
    { code: 'eb', name: 'Elderberry' },
    { code: 'fg', name: 'Fig' },
    { code: 'gr', name: 'Grape' },
    { code: 'ki', name: 'Kiwi' },
    { code: 'lm', name: 'Lemon' },
    { code: 'mn', name: 'Mango' },
  ];
</script>

<template>
  <div class="scrollable-container">
    <Ui3nList
      title="Fruits Collection (Scroll Me)"
      :items="fruits"
      key-field="code"
      :sticky="true"
    />
  </div>
</template>

<style scoped>
  .scrollable-container {
    max-height: 160px;
    overflow-y: auto;
    border: 1px solid var(--color-border-block-primary-default);
    border-radius: var(--spacing-xs);
  }
</style>
