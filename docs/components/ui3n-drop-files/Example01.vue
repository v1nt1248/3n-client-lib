<script setup lang="ts">
import { ref } from 'vue';
import Ui3nDropFiles from '@/components/ui3n-drop-files/ui3n-drop-files.vue';

const files = ref<FileList | null>(null);

function onSelect(fileList: FileList) {
  files.value = fileList;
}
</script>

<template>
  <div :class="$style.wrapper">
    <Ui3nDropFiles @select="onSelect" />
    <div v-if="files && files.length" :class="$style.info">
      Selected: {{ files.length }} file(s)
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}

.info {
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-text-table-secondary-default);
}
</style>