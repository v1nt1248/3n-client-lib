<template>
  <div class="radio-group-container">
    <Ui3nRadioGroup
      v-model="selected"
      name="fruits"
    >
      <Ui3nRadio checked-value="apple">
        Apple
      </Ui3nRadio>
      <Ui3nRadio checked-value="banana">
        Banana
      </Ui3nRadio>
      <Ui3nRadio checked-value="cherry">
        Cherry
      </Ui3nRadio>
    </Ui3nRadioGroup>
    <p>Selected: {{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('apple');
</script>

<style scoped>
.radio-group-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>