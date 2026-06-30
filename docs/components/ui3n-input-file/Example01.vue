<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';

const files = ref<File[]>([]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInputFile v-model="files" />
    <div v-if="files.length" style="font-size: 12px;">
      Selected: {{ files.map(f => f.name).join(', ') }}
    </div>
  </div>
</template>