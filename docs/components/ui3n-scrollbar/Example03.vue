<template>
  <div class="wrapper">
    <Ui3nScrollbar
      class="scrollbar-container"
      axes="horizontal"
      :horizontal="horizontalOptions"
    >
      <div class="content">
        <div
          v-for="i in 30"
          :key="i"
          class="item"
        >
          Card {{ i }}
        </div>
      </div>
    </Ui3nScrollbar>
  </div>
</template>

<script setup lang="ts">
  const horizontalOptions = {
    thumbColor: '#2196f3',
    thumbHoverColor: '#1976d2',
    thumbActiveColor: '#0d47a1',
    trackHeight: 12,
    trackColor: 'var(--color-bg-control-primary-hover, #e3f2fd)',
    thumbRadius: 6,
  };
</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 120px;
  }

  .scrollbar-container {
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    gap: 12px;
    padding: 16px;
    white-space: nowrap;
  }

  .item {
    flex-shrink: 0;
    padding: 12px 20px;
    background-color: var(--color-bg-block-primary-default);
    color: var(--color-text-block-primary-default);
    border-radius: 8px;
    border: 1px solid var(--color-border-block-primary-default);
  }
</style>
