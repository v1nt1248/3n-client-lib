<template>
  <div class="demo-container">
    <Ui3nButton type="primary">Primary</Ui3nButton>

    <Ui3nButton type="secondary">Secondary</Ui3nButton>

    <Ui3nButton type="tertiary">Tertiary</Ui3nButton>

    <Ui3nButton type="outline">Outline</Ui3nButton>

    <Ui3nButton
      type="icon"
      icon="round-info"
    >
      Icon
    </Ui3nButton>

    <Ui3nButton
      type="custom"
      color="#ff6b6b"
      textColor="#ffffff"
    >
      Custom
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
