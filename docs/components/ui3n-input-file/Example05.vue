<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';

const files = ref<File[]>([]);
const errors = ref<string[]>([]);

function handleError(error: string) {
  errors.value.unshift(error);
  if (errors.value.length > 5) {
    errors.value.pop();
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInputFile
      v-model="files"
      button-text="Select files (max 3, images only, max 500KB)"
      multiple
      :max-number-of-files="3"
      :max-file-size="512000"
      allowed-file-types=".jpg,.jpeg,.png"
      @error="handleError"
    />

    <div v-if="files.length" style="font-size: 12px;">
      Selected: {{ files.map(f => f.name).join(', ') }}
    </div>

    <div v-if="errors.length" style="font-size: 12px; color: var(--error-content-default);">
      <div>Errors:</div>
      <ul style="margin: 4px 0; padding-left: 20px;">
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>