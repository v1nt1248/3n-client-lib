<script setup lang="ts">
  import { ref } from 'vue';

  const message = ref('');
  const isValid = ref(true);

  const rules = [
    (v: string) => v.length >= 10 || 'Message must be at least 10 characters',
    (v: string) => v.length <= 500 || 'Message must be less than 500 characters',
  ];
</script>

<template>
  <div class="text-container">
    <Ui3nText
      v-model="message"
      v-model:valid="isValid"
      label="Message"
      placeholder="Type your message (min 10 characters)..."
      :rules="rules"
      :validate-at-startup="false"
    />

    <p class="result-text">
      Form Field Valid:
      <span :class="isValid ? 'valid' : 'invalid'">
        <strong>{{ isValid }}</strong>
      </span>
    </p>
  </div>
</template>

<style scoped>
  .text-container {
    width: 100%;
    max-width: 400px;
  }

  .result-text {
    margin-top: 8px;
    font-size: 12px;
    color: var(--color-text-control-secondary-default);
  }

  .valid {
    color: #4caf50;
  }

  .invalid {
    color: #f44336;
  }
</style>
