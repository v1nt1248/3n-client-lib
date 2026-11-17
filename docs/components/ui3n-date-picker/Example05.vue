<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';

  const regular = ref<Date | null>(new Date());
  const large = ref<Date | null>(new Date());
  const disabled = ref<Date | null>(new Date());
</script>

<template>
  <div class="demo-row">
    <div class="demo-item">
      <p class="demo-label">Regular</p>
      <Ui3nDatePicker v-model="regular" />
    </div>

    <div class="demo-item">
      <p class="demo-label">Large</p>
      <Ui3nDatePicker
        v-model="large"
        size="large"
      />
    </div>

    <div class="demo-item">
      <p class="demo-label">Disabled</p>
      <Ui3nDatePicker
        v-model="disabled"
        disabled
      />
    </div>
  </div>
</template>

<style scoped>
  .demo-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
  }

  .demo-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .demo-label {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-control-secondary-default);
  }
</style>
