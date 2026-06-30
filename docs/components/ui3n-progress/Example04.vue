<template>
  <div class="progress-container">
    <Ui3nProgressCircular :indeterminate="true" />
    <Ui3nProgressCircular
      :indeterminate="true"
      :size="60"
      color="#ff9800"
    />
    <Ui3nProgressCircular
      :indeterminate="true"
      :size="80"
      :width="10"
      color="#e91e63"
    />
  </div>
</template>

<style scoped>
.progress-container {
  display: flex;
  gap: 24px;
  align-items: center;
}
</style>