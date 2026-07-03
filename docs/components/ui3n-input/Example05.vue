<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nInput from '@/components/ui3n-input/ui3n-input.vue';

  const value1 = ref('');
  const value2 = ref('Valid text');
  const value3 = ref('');

  const requiredRule = (v: unknown) => !!v || 'Field is required';
  const minLengthRule = (v: unknown) => (typeof v === 'string' && v.length >= 3) || 'Minimum 3 characters';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <Ui3nInput
      v-model="value1"
      label="Required field"
      placeholder="Enter value..."
      :rules="[requiredRule]"
    />

    <Ui3nInput
      v-model="value2"
      label="Success state"
      display-state-mode="success"
      display-state-with-icon
      display-state-message="Looks good!"
      :rules="[requiredRule, minLengthRule]"
      validate-at-startup
    />

    <Ui3nInput
      v-model="value3"
      label="Error state"
      display-state-mode="error"
      display-state-message="This field has an error"
    />
  </div>
</template>
