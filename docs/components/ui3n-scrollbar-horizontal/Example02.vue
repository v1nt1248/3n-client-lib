<template>
  <Ui3nScrollbarHorizontal
    class="scrollbar-container"
    :thumb-height="10"
    thumb-color="#4caf50"
    thumb-hover-color="#388e3c"
    thumb-active-color="#1b5e20"
    :track-height="12"
    track-color="#e8f5e9"
    :thumb-radius="5"
  >
    <div class="content">
      <div
        v-for="i in 30"
        :key="i"
        class="item"
      >
        Card {{ i }}
      </div>
    </div>
  </Ui3nScrollbarHorizontal>
</template>

<style scoped>
.scrollbar-container {
  width: 400px;
  height: 100px;
}

.content {
  display: flex;
  gap: 12px;
  padding: 16px;
  white-space: nowrap;
}

.item {
  flex-shrink: 0;
  padding: 12px 20px;
  background-color: #e8f5e9;
  border-radius: 8px;
  font-weight: 500;
}
</style>