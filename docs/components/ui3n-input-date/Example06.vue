<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';

  const regular = ref<Date | null>(new Date(2026, 10, 17));
  const large = ref<Date | null>(new Date(2026, 10, 17));
  const disabled = ref<Date | null>(new Date(2026, 10, 17));
</script>

<template>
  <div class="demo-grid">
    <Ui3nInputDate
      v-model="regular"
      label="Regular"
      placeholder="YYYY-MM-DD"
    />

    <Ui3nInputDate
      v-model="large"
      label="Large"
      placeholder="YYYY-MM-DD"
      size="large"
    />

    <Ui3nInputDate
      v-model="disabled"
      label="Disabled"
      placeholder="YYYY-MM-DD"
      disabled
    />
  </div>
</template>

<style scoped>
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    width: 100%;
  }
</style>
