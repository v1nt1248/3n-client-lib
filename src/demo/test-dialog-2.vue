<script lang="ts" setup>
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
import type { Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

const props = defineProps<{
  text?: string;
  dialogProps?: Ui3nDialogComponentProps<unknown>;
}>();
</script>

<template>
  <ui3n-dialog v-bind="dialogProps">
<!--    <template v-slot:header>-->
<!--      <div class="test-dialog-header">-->
<!--        THE TEST DIALOG-2 TITLE-->
<!--      </div>-->
<!--    </template>-->

    <template v-slot:body>
      <div class="test-dialog">
        {{ text }}
      </div>
    </template>
  </ui3n-dialog>
</template>

<style lang="scss" scoped>
.test-dialog {
  font-size: var(--font-14);
  font-weight: 400;
  color: var(--color-text-block-primary-default);
  text-align: center;
  padding: 32px 16px;

  &-header {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 8px;
    justify-content: flex-start;
    align-items: center;
    font-size: var(--font-16);
    text-transform: uppercase;
    color: var(--warning-content-default);
  }
}
</style>
