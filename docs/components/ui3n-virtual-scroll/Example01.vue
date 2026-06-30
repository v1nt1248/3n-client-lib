<template>
  <div class="virtual-scroll-container">
    <Ui3nVirtualScroll
      :items="items"
      :min-child-height="40"
    >
      <template #item="{ value, index }">
        <div class="item">
          <span class="index">#{{ index + 1 }}</span>
          <span class="value">{{ value }}</span>
        </div>
      </template>
    </Ui3nVirtualScroll>
  </div>
</template>

<script setup lang="ts">
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
</script>

<style scoped>
.virtual-scroll-container {
  height: 400px;
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
}

.index {
  color: #888;
  font-size: 12px;
  min-width: 50px;
}

.value {
  font-weight: 500;
}
</style>