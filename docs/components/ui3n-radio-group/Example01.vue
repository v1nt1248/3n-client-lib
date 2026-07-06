<template>
  <div class="radio-container">
    <Ui3nRadio
      v-model="isAgreed"
      :checked-value="true"
      :unchecked-value="false"
    >
      I accept the user license agreement
    </Ui3nRadio>

    <p class="status-text">
      Agreement state: <strong>{{ isAgreed ? 'Accepted' : 'Rejected' }}</strong>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const isAgreed = ref(false);
</script>

<style scoped>
  .radio-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .status-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
