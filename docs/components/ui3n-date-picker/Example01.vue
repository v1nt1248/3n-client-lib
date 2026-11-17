<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';

  const date = ref<Date | null>(null);
</script>

<template>
  <div class="demo-wrapper">
    <Ui3nDatePicker v-model="date" />

    <p class="result-text">
      Selected date: <strong>{{ date ? date.toLocaleDateString() : 'null' }}</strong>
    </p>
  </div>
</template>

<style scoped>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .result-text {
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }
</style>
