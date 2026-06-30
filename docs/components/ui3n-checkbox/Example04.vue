<script setup lang="ts">
import { ref } from 'vue';

/**
 * Checkbox colors
 * Custom checkbox colors using the color prop
 */

const blue = ref(true);
const green = ref(true);
const red = ref(true);
const purple = ref(true);
const orange = ref(true);
</script>

<template>
  <div class="example-container">
    <ui3n-checkbox
      v-model="blue"
      color="#3b82f6"
    >
      Blue
    </ui3n-checkbox>

    <ui3n-checkbox
      v-model="green"
      color="#22c55e"
    >
      Green
    </ui3n-checkbox>

    <ui3n-checkbox
      v-model="red"
      color="#ef4444"
    >
      Red
    </ui3n-checkbox>

    <ui3n-checkbox
      v-model="purple"
      color="#a855f7"
    >
      Purple
    </ui3n-checkbox>

    <ui3n-checkbox
      v-model="orange"
      color="#f97316"
    >
      Orange
    </ui3n-checkbox>
  </div>
</template>

<style scoped>
.example-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>