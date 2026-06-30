<template>
  <div class="demo-container">
    <Ui3nButton
      icon="round-info"
      icon-size="16"
    >
      Small icon (16px)
    </Ui3nButton>

    <Ui3nButton
      icon="round-info"
      icon-size="24"
    >
      Medium icon (24px)
    </Ui3nButton>

    <Ui3nButton
      icon="round-info"
      icon-color="#ff6b6b"
    >
      Custom icon color
    </Ui3nButton>

    <Ui3nButton
      type="icon"
      icon="round-info"
      icon-size="32"
      icon-color="#4ecdc4"
      color="#2d3436"
    />
  </div>
</template>

<style scoped>
  .demo-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
</style>