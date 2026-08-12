<template>
  <Ui3nScrollbar class="scrollbar-container">
    <div class="content">
      <div
        v-for="i in 200"
        :key="i"
        class="item"
      >
        {{ i }}
      </div>
    </div>
  </Ui3nScrollbar>
</template>

<style scoped>
  .scrollbar-container {
    width: 100%;
    height: 240px;
    background-color: var(--color-bg-block-primary-hover);
  }

  .content {
    display: grid;
    grid-template-columns: repeat(10, minmax(140px, 1fr));
    gap: 12px;
    padding: 16px;
    width: max-content;
  }

  .item {
    padding: 16px 24px;
    background-color: var(--color-bg-block-primary-default);
    color: var(--color-text-block-primary-default);
    border-radius: 4px;
    border: 1px solid var(--color-border-block-primary-default);
    white-space: nowrap;
  }
</style>
