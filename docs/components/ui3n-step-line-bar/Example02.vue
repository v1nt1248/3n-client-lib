<template>
  <div class="step-container">
    <Ui3nStepLineBar
      label="Checkout Process"
      :current="currentStep"
      :steps="totalSteps"
    />
    <div class="controls">
      <Ui3nButton
        :disabled="currentStep <= 1"
        @click="currentStep--"
      >
        Previous
      </Ui3nButton>
      <Ui3nButton
        :disabled="currentStep >= totalSteps"
        @click="currentStep++"
      >
        Next
      </Ui3nButton>
    </div>
    <p>Step {{ currentStep }} of {{ totalSteps }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentStep = ref(1);
const totalSteps = 5;
</script>

<style scoped>
.step-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
}

.controls {
  display: flex;
  gap: 8px;
}
</style>