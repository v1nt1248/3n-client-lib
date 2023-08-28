<script setup lang="ts">
  import { ref } from 'vue'
  import Ui3nText from './components/ui3n-text.vue'

  const text = ref('')
</script>

<template>
  <div class="app">
    <h3>Components</h3>

    <div class="app-block">
      <ui3n-text
        v-model:value="text"
      />

      <br>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    padding: 8px;

    &-block {
      position: relative;
      width: 250px;
    }
  }
</style>
