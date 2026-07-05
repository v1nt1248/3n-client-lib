<template>
  <Ui3nMenu>
    <Ui3nButton type="primary">Open Simple Menu</Ui3nButton>

    <template #menu>
      <div class="menu-content">
        <div class="menu-item">Item 1</div>
        <div class="menu-item">Item 2</div>
        <div class="menu-item">Item 3</div>
      </div>
    </template>
  </Ui3nMenu>
</template>

<style scoped>
  .menu-content {
    padding: 4px 0;
    min-width: 160px;
    background-color: var(--color-bg-control-secondary-default);
  }

  .menu-item {
    padding: 8px 16px;
    font-size: 13px;
    color: var(--color-text-control-primary-default);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .menu-item:hover {
    background-color: var(--color-bg-control-primary-hover);
  }
</style>
