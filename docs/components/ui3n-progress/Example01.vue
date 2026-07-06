<template>
  <div class="progress-container">
    <Ui3nProgressLinear :value="progress" />
    <Ui3nProgressLinear
      :value="progress"
      :with-text="true"
    />

    <Ui3nButton @click="increaseProgress"> Increase (+10%) </Ui3nButton>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const progress = ref(30);

  const increaseProgress = () => {
    progress.value = Math.min(100, progress.value + 10);
    if (progress.value >= 100) {
      progress.value = 0;
    }
  };
</script>

<style scoped>
  .progress-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 300px;
  }
</style>
