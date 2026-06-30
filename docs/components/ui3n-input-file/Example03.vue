<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';

const files = ref<File[]>([]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInputFile
      v-model="files"
      button-text="Select image (max 1MB)"
      allowed-file-types=".jpg,.jpeg,.png,.gif"
      :max-file-size="1048576"
    />
    <div v-if="files.length" style="font-size: 12px;">
      Selected: {{ files[0].name }} ({{ (files[0].size / 1024).toFixed(1) }} KB)
    </div>
  </div>
</template>