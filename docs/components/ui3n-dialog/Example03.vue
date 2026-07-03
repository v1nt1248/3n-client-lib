<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';
  import type { Ui3nDialogEvent, Ui3nDialogComponentProps } from '@/components/ui3n-dialog/types';

  defineProps<{
    dialogProps?: Ui3nDialogComponentProps<any>;
  }>();

  const emits = defineEmits<{
    (event: 'action', value: { event: Ui3nDialogEvent; data?: any }): void;
  }>();

  const isLoading = ref(false);
</script>

<template>
  <ui3n-dialog
    v-bind="dialogProps"
    @action="emits('action', $event)"
  >
    <template #header>
      <div class="custom-header">
        <ui3n-icon
          icon="outline-settings"
          :size="18"
          color="var(--color-icon-control-primary-default)"
        />
        <span>Advanced Settings Custom Title</span>
      </div>
    </template>

    <template #body>
      <div class="dialog-body">
        <p>
          This dialog uses custom header, body, actions, and loading slots defined entirely inside the template.
        </p>
        <ui3n-button @click="isLoading = !isLoading">
          {{ isLoading ? 'Hide Loading Overlay' : 'Show Loading Overlay' }}
        </ui3n-button>
      </div>
    </template>

    <template #actions>
      <div class="custom-actions">
        <ui3n-button
          type="secondary"
          @click="emits('action', { event: 'cancel' })"
          >Reset</ui3n-button
        >
        <ui3n-button
          type="primary"
          @click="emits('action', { event: 'confirm' })"
          >Apply Settings</ui3n-button
        >
      </div>
    </template>

    <template
      v-if="isLoading"
      #loading
    >
      <div class="loading-overlay">
        <ui3n-icon
          icon="spinner"
          :size="32"
          color="var(--color-icon-control-primary-default)"
        />
      </div>
    </template>
  </ui3n-dialog>
</template>

<style scoped>
  .custom-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    height: 100%;
    font-weight: 600;
  }

  .dialog-body {
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 14px;
  }

  .custom-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
  }
</style>
