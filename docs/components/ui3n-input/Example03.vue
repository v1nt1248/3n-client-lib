<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInput from '@/components/ui3n-input/ui3n-input.vue';

const value = ref('Clearable text');
</script>

<template>
  <Ui3nInput
    v-model="value"
    label="Clearable input"
    placeholder="Type something..."
    clearable
  />
</template>