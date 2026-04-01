<template>
  <div class="demo-container">
    <Ui3nButton icon="round-info">With icon</Ui3nButton>

    <Ui3nButton
      icon="round-info"
      icon-position="left"
    >
      Icon left
    </Ui3nButton>

    <Ui3nButton
      type="icon"
      icon="round-info"
    />
  </div>
</template>

<style scoped>
  .demo-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>
