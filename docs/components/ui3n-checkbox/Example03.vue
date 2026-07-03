<script setup lang="ts">
  import { ref } from 'vue';

  /**
   * Checkbox sizes
   * Different checkbox sizes: 12px, 16px, 24px, 32px
   */

  const small = ref(true);
  const medium = ref(true);
  const large = ref(true);
  const xlarge = ref(true);
</script>

<template>
  <div class="example-container">
    <div class="size-row">
      <ui3n-checkbox
        v-model="small"
        :size="12"
      >
        Small (12px)
      </ui3n-checkbox>
    </div>

    <div class="size-row">
      <ui3n-checkbox
        v-model="medium"
        :size="16"
      >
        Medium (16px) - default
      </ui3n-checkbox>
    </div>

    <div class="size-row">
      <ui3n-checkbox
        v-model="large"
        :size="24"
      >
        Large (24px)
      </ui3n-checkbox>
    </div>

    <div class="size-row">
      <ui3n-checkbox
        v-model="xlarge"
        :size="32"
      >
        Extra Large (32px)
      </ui3n-checkbox>
    </div>
  </div>
</template>

<style scoped>
  .example-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .size-row {
    display: flex;
    align-items: center;
  }
</style>
