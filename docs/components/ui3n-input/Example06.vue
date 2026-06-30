<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInput from '@/components/ui3n-input/ui3n-input.vue';

const value1 = ref('Disabled value');
const value2 = ref('Readonly value');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInput
      v-model="value1"
      label="Disabled input"
      disabled
    />

    <Ui3nInput
      v-model="value2"
      label="Readonly input"
      readonly
    />
  </div>
</template>