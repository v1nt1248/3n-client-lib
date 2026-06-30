<script setup lang="ts">
import { ref } from 'vue';
import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';
import Ui3nButton from '@/components/ui3n-button/ui3n-button.vue';
import Ui3nIcon from '@/components/ui3n-icon/ui3n-icon.vue';

const files = ref<File[]>([]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Ui3nInputFile v-model="files">
      <Ui3nButton type="outline" size="small">
        <template #prepend-icon>
          <Ui3nIcon icon="round-upload-file" :size="16" />
        </template>
        Upload files
      </Ui3nButton>
    </Ui3nInputFile>

    <div v-if="files.length" style="font-size: 12px;">
      Selected: {{ files.map(f => f.name).join(', ') }}
    </div>
  </div>
</template>