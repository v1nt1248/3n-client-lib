<template>
  <div class="progress-container">
    <Ui3nProgressCircular :value="progress" />
    <Ui3nProgressCircular
      :value="progress"
      :with-text="true"
    />
    <Ui3nProgressCircular
      :value="progress"
      :size="80"
      :width="8"
      color="#2196f3"
    />
    <Ui3nButton @click="increaseProgress">
      Increase (+10%)
    </Ui3nButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const progress = ref(45);

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
  align-items: center;
}
</style>