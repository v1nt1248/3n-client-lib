<template>
  <div class="demo-container">
    <Ui3nButton :disabled="true">Disabled</Ui3nButton>

    <Ui3nButton block>Block button</Ui3nButton>

    <Ui3nButton elevation>With elevation</Ui3nButton>
  </div>
</template>

<style scoped>
  .demo-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>
