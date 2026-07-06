<template>
  <Ui3nScrollbarHorizontal class="scrollbar-container">
    <div class="content">
      <div
        v-for="i in 20"
        :key="i"
        class="item"
      >
        Item {{ i }}
      </div>
    </div>
  </Ui3nScrollbarHorizontal>
</template>

<style scoped>
  .scrollbar-container {
    width: 100%;
    height: 120px;
    background-color: var(--color-bg-block-primary-hover);
  }

  .content {
    display: flex;
    gap: 16px;
    padding: 16px;
    white-space: nowrap;
  }

  .item {
    flex-shrink: 0;
    padding: 16px 24px;
    background-color: var(--color-bg-block-primary-default);
    color: var(--color-text-block-primary-default);
    border-radius: 4px;
    border: 1px solid var(--color-border-block-primary-default);
  }
</style>
