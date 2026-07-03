<script setup lang="ts">
  import { ref } from 'vue';
  import Ui3nDropFiles from '@/components/ui3n-drop-files/ui3n-drop-files.vue';

  const fileArray = ref<File[]>([]);

  function onSelect(fileList: FileList) {
    fileArray.value = Array.from(fileList);
  }

  function formatSize(bytes: number): string {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.dropzone">
      <Ui3nDropFiles
        permanent-display
        title="Drop files here"
        @select="onSelect"
      >
        <template #additional-text>
          <div :class="$style.hint">Drag & drop files or click to select</div>
        </template>
      </Ui3nDropFiles>
    </div>

    <div
      v-if="fileArray.length > 0"
      :class="$style.infoBox"
    >
      <div :class="$style.infoTitle">Uploaded files ({{ fileArray.length }}):</div>
      <ul :class="$style.fileList">
        <li
          v-for="(file, index) in fileArray"
          :key="index"
          :class="$style.fileItem"
        >
          <span :class="$style.fileName">{{ file.name }}</span>
          <span :class="$style.fileSize">{{ formatSize(file.size) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" module>
  .wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  .dropzone {
    position: relative;
    width: 300px;
    height: 300px;
  }

  .hint {
    font-size: 12px;
    color: var(--color-text-table-secondary-default);
  }

  .infoBox {
    margin-top: 12px;
    padding: 8px 12px;
    background-color: var(--color-bg-block-secondary-default, #f5f5f5);
    border-radius: 6px;
  }

  .infoTitle {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-table-primary-default);
    margin-bottom: 4px;
  }

  .fileList {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .fileItem {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    padding: 2px 0;
    border-bottom: 1px solid var(--color-border-block-primary-default, #eee);
    &:last-child {
      border-bottom: none;
    }
  }

  .fileName {
    color: var(--color-text-table-primary-default);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 75%;
  }

  .fileSize {
    color: var(--color-text-table-secondary-default);
  }
</style>
