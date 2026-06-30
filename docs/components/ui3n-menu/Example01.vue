<template>
  <Ui3nMenu>
    <Ui3nButton>Open Menu</Ui3nButton>
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
  padding: 8px 0;
  min-width: 150px;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>