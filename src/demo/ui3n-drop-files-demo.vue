<script setup lang="ts">
  import { ref } from 'vue';
  import { Nullable } from '@/components/types';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';
  import Ui3nDropFiles from '@/components/ui3n-drop-files/ui3n-drop-files.vue';
  import Ui3nInputFile from '@/components/ui3n-input-file/ui3n-input-file.vue';

  const val1 = ref<Nullable<File[] | FileList>>(null);
  const val2 = ref<Nullable<File[] | FileList>>(null);

  function onSelect1(v: File[] | FileList) {
    val1.value = v;
    console.log('FILES WERE SELECTED: ', v);
  }

  function onSelect2(v: File[] | FileList) {
    val2.value = v;
    console.log('FILES WERE SELECTED: ', v);
  }
</script>

<template>
  <demo-layout title="Ui3nDropFiles, Ui3nInputFile">
    <demo-layout-cell label="Ui3nDropFiles (default)">
      <div :class="$style.block">
        <ui3n-drop-files @select="onSelect1" />
      </div>
    </demo-layout-cell>

    <demo-layout-cell label="Ui3nDropFiles + Ui3nInputFile">
      <div :class="$style.block">
        <ui3n-drop-files permanent-display @select="onSelect2">
          <template #additional-text>
            <div :class="$style.info">
              <span>You can <b>drag&drop</b> files here or</span>&nbsp;
              <ui3n-input-file multiple button-text="Upload Files" @update:model-value="onSelect2" />
            </div>
          </template>
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
