<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nEditable from '@/components/ui3n-editable/ui3n-editable.vue';
  import type { Ui3nEditableExpose } from '@/components/ui3n-editable/types';

  const value = ref('report.pdf');
  const error = ref('');
  const editableEl = ref<Ui3nEditableExpose>();

  function validateName(name: string): true | string {
    if (!name || name === '.' || name === '..' || name.includes('/')) {
      return `"${name}" is not a valid file name`;
    }
    return true;
  }

  function onInvalid(message: string) {
    error.value = message;
  }

  // a save that fails later: the shown value is put back with reset()
  async function onUpdate(name: string) {
    error.value = '';
    if (name.startsWith('locked')) {
      error.value = `Couldn't rename to "${name}"`;
      editableEl.value?.reset();
      return;
    }
    value.value = name;
  }
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEditable
      ref="editableEl"
      :model-value="value"
      :validator="validateName"
      @update:model-value="onUpdate"
      @invalid="onInvalid"
    />
    <div :class="$style.info">
      Try "..", "a/b" (rejected by the validator) or a name starting with "locked" (rejected after saving)
    </div>
    <div
      v-if="error"
      :class="$style.error"
    >
      {{ error }}
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

  .error {
    font-size: 12px;
    color: var(--error-content-default);
  }
</style>
