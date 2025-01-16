<script setup lang="ts">
  import { ref } from 'vue';
  import { Nullable } from '@/components/types';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nDropFiles from '@/components/ui3n-drop-files/ui3n-drop-files.vue';
  import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';


  const val1 = ref<Nullable<File[] | FileList>>(null);

  function onSelect(v: File[] | FileList) {
    val1.value = v;
    console.log('FILES WERE SELECTED: ', v);
  }
</script>

<template>
  <demo-layout title="Ui3nDropFiles, Ui3nInputFile">
    <demo-layout-cell label="Default use">
      <div :class="$style.block">
        <ui3n-drop-files @select="onSelect">
          <div :class="$style.body">
            <div :class="$style.info">
              <span>You can <b>drag&drop</b> files here or</span>&nbsp;
              <ui3n-input-file multiple button-text="Upload Files" @update:model-value="onSelect" />
            </div>
          </div>
        </ui3n-drop-files>
      </div>
    </demo-layout-cell>
  </demo-layout>
</template>

<style lang="scss" module>
  .block {
    position: relative;
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }

  .body {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-s);
    border: 2px dashed var(--color-border-block-primary-default);
    border-radius: var(--space-s);
  }

  .info {
    font-size: var(--font-12);
    font-weight: 500;
    line-height: var(--font-16);
    color: var(--color-text-control-secondary-default);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: var(--space-xs);

    span {
      display: inline-block;
    }
  }
</style>
