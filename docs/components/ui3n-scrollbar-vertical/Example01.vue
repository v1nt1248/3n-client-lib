<template>
  <Ui3nScrollbarVertical class="scrollbar-container">
    <div class="content">
      <p v-for="i in 20" :key="i">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </Ui3nScrollbarVertical>
</template>

<style scoped>
.scrollbar-container {
  height: 300px;
  width: 400px;
}

.content {
  padding: 16px;
}

.content p {
  margin: 0 0 16px 0;
}
</style>