<script setup lang="ts">
import { ref } from 'vue';
import Ui3nDialog from '@/components/ui3n-dialog/ui3n-dialog.vue';

const isLoading = ref(false);

function toggleLoading() {
  isLoading.value = !isLoading.value;
}
</script>

<template>
  <ui3n-dialog
    title="Custom Slots"
    :confirm-button="false"
    :cancel-button="false"
    :hide-close-button="false"
    width="450"
  >
    <template #header>
      <div class="custom-header">
        <ui3n-icon
          icon="outline-settings"
          :size="18"
          color="var(--color-icon-control-primary-default)"
        />
        <span>Custom Header Slot</span>
      </div>
    </template>

    <template #body>
      <div class="dialog-body">
        <p>This dialog uses custom header, body and actions slots.</p>
        <ui3n-button @click="toggleLoading">
          {{ isLoading ? 'Hide Loading' : 'Show Loading' }}
        </ui3n-button>
      </div>
    </template>

    <template #actions>
      <div class="custom-actions">
        <ui3n-button type="secondary">
          Reset
        </ui3n-button>
        <ui3n-button type="primary">
          Apply
        </ui3n-button>
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
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-control-primary-default);
  }

  .dialog-body {
    padding: 24px 16px;
    font-size: 14px;
    color: var(--color-text-block-primary-default);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .custom-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px;
  }

  .loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: oklch(25% 0 0deg / 0.5);
    border-radius: 12px;
  }
</style>