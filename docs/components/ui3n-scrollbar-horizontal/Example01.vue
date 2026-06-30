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
  width: 400px;
  height: 100px;
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
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>