<script setup lang="ts">
import { ref } from 'vue';
import Ui3nEditable from '@/components/ui3n-editable/ui3n-editable.vue';

const value = ref('Disabled field');
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nEditable
      v-model="value"
      placeholder="Disabled"
      disabled
    />
    <div :class="$style.info">
      Disabled state — editing is not available
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