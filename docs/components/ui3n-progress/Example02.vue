<template>
  <div class="progress-container">
    <Ui3nProgressLinear :indeterminate="true" />
    <Ui3nProgressLinear
      :indeterminate="true"
      color="#4caf50"
      :height="8"
    />
  </div>
</template>

<style scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
}
</style>