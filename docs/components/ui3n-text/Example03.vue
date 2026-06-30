<template>
  <div class="text-container">
    <Ui3nText
      v-model="message"
      label="Message"
      placeholder="Type your message (min 10 characters)..."
      :rules="rules"
      :validate-at-startup="false"
    />
    <p>Valid: {{ isValid }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');
const isValid = ref(true);

const rules = [
  (v: string) => v.length >= 10 || 'Message must be at least 10 characters',
  (v: string) => v.length <= 500 || 'Message must be less than 500 characters',
];
</script>

<style scoped>
.text-container {
  width: 400px;
}
</style>