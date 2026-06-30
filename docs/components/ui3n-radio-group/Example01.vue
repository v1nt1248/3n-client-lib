<template>
  <div class="radio-container">
    <Ui3nRadio
      v-model="selected"
      checked-value="option1"
    >
      Option 1
    </Ui3nRadio>
    <Ui3nRadio
      v-model="selected"
      checked-value="option2"
    >
      Option 2
    </Ui3nRadio>
    <Ui3nRadio
      v-model="selected"
      checked-value="option3"
    >
      Option 3
    </Ui3nRadio>
    <p>Selected: {{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('option1');
</script>

<style scoped>
.radio-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>