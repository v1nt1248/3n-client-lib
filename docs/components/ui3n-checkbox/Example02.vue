<script setup lang="ts">
  import { ref } from 'vue';

  /**
   * Checkbox with label
   * Using default slot for text label
   */

  const agreeTerms = ref(false);
  const subscribeNewsletter = ref(true);
</script>

<template>
  <div class="example-container">
    <ui3n-checkbox v-model="agreeTerms"> I agree to the Terms and Conditions </ui3n-checkbox>

    <ui3n-checkbox v-model="subscribeNewsletter"> Subscribe to newsletter </ui3n-checkbox>
  </div>
</template>

<style scoped>
  .example-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
