<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';

const files = ref<File[]>([]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInputFile
      v-model="files"
      button-text="Select multiple files"
      multiple
      :max-number-of-files="5"
    />
    <div v-if="files.length" style="font-size: 12px;">
      <div>Selected {{ files.length }} file(s):</div>
      <ul style="margin: 4px 0; padding-left: 20px;">
        <li v-for="(file, i) in files" :key="i">{{ file.name }}</li>
      </ul>
    </div>
  </div>
</template>