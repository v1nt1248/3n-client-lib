<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nEditable from '@/components/ui3n-editable/ui3n-editable.vue';

  const value = ref('Editable text');
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEditable
      v-model="value"
      placeholder="Enter text"
    />
    <div :class="$style.info">
      Current value: <b>{{ value }}</b>
    </div>
  </div>
</template>

<style lang="scss" module>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .info {
    font-size: 12px;
    color: var(--color-text-table-secondary-default);
  }
</style>
