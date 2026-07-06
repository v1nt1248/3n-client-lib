<template>
  <div class="radio-group-container">
    <Ui3nRadioGroup
      v-model="selected"
      name="colors"
      direction="horizontal"
    >
      <Ui3nRadio checked-value="red"> Red </Ui3nRadio>

      <Ui3nRadio checked-value="green"> Green </Ui3nRadio>

      <Ui3nRadio checked-value="blue"> Blue </Ui3nRadio>
    </Ui3nRadioGroup>
    <p>Selected: {{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const selected = ref('red');
</script>

<style scoped>
  .radio-group-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
