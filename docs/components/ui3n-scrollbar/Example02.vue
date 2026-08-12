<template>
  <div class="wrapper">
    <Ui3nScrollbar
      class="scrollbar-container"
      axes="vertical"
      :vertical="verticalOptions"
    >
      <div class="content">
        <div
          v-for="i in 20"
          :key="i"
          class="item"
        >
          Item {{ i }}
        </div>
      </div>
    </Ui3nScrollbar>
  </div>
</template>

<script setup lang="ts">
  const verticalOptions = {
    thumbColor: '#4caf50',
    thumbHoverColor: '#388e3c',
    thumbActiveColor: '#1b5e20',
    trackWidth: 8,
    trackColor: 'var(--color-bg-control-primary-hover, #e8f5e9)',
    thumbRadius: 6,
  };
</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 200px;
  }

  .scrollbar-container {
    width: 100%;
    height: 100%;
  }

  .content {
    padding: 16px;
  }

  .item {
    padding: 12px 16px;
    background-color: var(--color-bg-block-primary-default);
    color: var(--color-text-block-primary-default);
    border-radius: 4px;
    border: 1px solid var(--color-border-block-primary-default);
    margin-bottom: 8px;
  }
</style>
