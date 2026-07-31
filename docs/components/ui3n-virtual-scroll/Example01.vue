<template>
  <div class="virtual-scroll-container">
    <Ui3nVirtualScroll
      :items="items"
      :min-child-height="40"
    >
      <template #item="{ value, index }">
        <div class="item">
          <span class="index">#{{ index + 1 }}</span>
          <span class="value">{{ value.label }}</span>
        </div>
      </template>
    </Ui3nVirtualScroll>
  </div>
</template>

<script setup lang="ts">
  // Every item needs an id: it keys the measured heights and the scroll anchor
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: (i + 1).toString(),
    label: `Item ${i + 1}`,
  }));
</script>

<style scoped>
  .virtual-scroll-container {
    height: 400px;
    width: 300px;
    border: 1px solid var(--color-border-block-primary-default);
    border-radius: 4px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    height: 40px;
    border-bottom: 1px solid var(--color-border-block-primary-default);
  }

  .index {
    color: var(--color-text-block-primary-default);
    font-size: 12px;
    min-width: 50px;
  }

  .value {
    color: var(--color-text-block-primary-default);
    font-weight: 500;
  }
</style>
