<template>
  <div class="demo-container">
    <Ui3nButton square>Square</Ui3nButton>

    <Ui3nButton
      type="icon"
      icon="round-info"
      square
    />

    <Ui3nButton
      type="secondary"
      square
    >
      Secondary Square
    </Ui3nButton>
  </div>
</template>

<style scoped>
  .demo-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>