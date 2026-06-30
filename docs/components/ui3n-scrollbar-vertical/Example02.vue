<template>
  <Ui3nScrollbarVertical
    class="scrollbar-container"
    :thumb-width="10"
    thumb-color="#2196f3"
    thumb-hover-color="#1976d2"
    thumb-active-color="#0d47a1"
    :track-width="12"
    track-color="#e3f2fd"
    :thumb-radius="5"
  >
    <div class="content">
      <p v-for="i in 25" :key="i">
        Item {{ i }}: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
  margin: 0 0 12px 0;
}
</style>