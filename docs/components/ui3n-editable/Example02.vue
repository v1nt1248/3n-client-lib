<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nEditable from '@/components/ui3n-editable/ui3n-editable.vue';

  const value = ref('Required field');

  function onDone() {
    console.log('Edit completed');
  }

  function onCancel() {
    console.log('Edit cancelled');
  }
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEditable
      v-model="value"
      placeholder="Cannot be empty"
      disallow-empty-value
      @done="onDone"
      @cancel="onCancel"
    />
    <div :class="$style.info">This field cannot be empty (disallowEmptyValue)</div>
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
