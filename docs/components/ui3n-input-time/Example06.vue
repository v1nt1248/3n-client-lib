<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInputTime from '@/components/ui3n-input-time/ui3n-input-time.vue';

  const regular = ref<string | null>('22:30');
  const large = ref<string | null>('22:30');
  const disabled = ref<string | null>('22:30');
  const readonly = ref<string | null>('22:30');
</script>

<template>
  <div class="demo-grid">
    <Ui3nInputTime
      v-model="regular"
      label="Regular"
      placeholder="HH:mm"
    />

    <Ui3nInputTime
      v-model="large"
      label="Large"
      placeholder="HH:mm"
      size="large"
    />

    <Ui3nInputTime
      v-model="disabled"
      label="Disabled"
      placeholder="HH:mm"
      disabled
    />

    <Ui3nInputTime
      v-model="readonly"
      label="Readonly"
      placeholder="HH:mm"
      readonly
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
