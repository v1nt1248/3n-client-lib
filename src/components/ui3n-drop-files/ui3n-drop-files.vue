<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Ui3nResize } from '@/directives';
  import type { Ui3nDropFilesEmits, Ui3nDropFilesProps, Ui3nDropFilesSlots } from './types';

  const vUi3nResize = Ui3nResize;

  withDefaults(
    defineProps<Ui3nDropFilesProps>(),
    {
      title: 'Upload',
      text: '',
      additionalText: '',
    },
  );
  const emits = defineEmits<Ui3nDropFilesEmits>();
  defineSlots<Ui3nDropFilesSlots>();

  const wrapperElement = ref<HTMLDivElement | null>(null);
  const wrapperElementMinSize = ref(0);
  const isOverDropPlace = ref(false);
  const isOverDropZone = ref(false);

  function onDragenter(ev: MouseEvent) {
    ev.preventDefault();
    isOverDropPlace.value = true;
  }

  function onDragleave(ev: MouseEvent) {
    ev.preventDefault();
    isOverDropPlace.value = false;
  }

  function onDropzoneDragover(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  function onDropzoneDragenter(ev: MouseEvent) {
    ev.preventDefault();
    isOverDropZone.value = true;
  }

  function onDropzoneDragleave(ev: MouseEvent) {
    ev.preventDefault();
    isOverDropZone.value = false;
  }

  function onDrop(ev: DragEvent) {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.dataTransfer!.files) {
      emits('select', ev.dataTransfer!.files);
    }
    isOverDropPlace.value = false;
    isOverDropZone.value = false;
  }

  function calcElementsSizes() {
    if (wrapperElement.value) {
      wrapperElementMinSize.value = Math.min(wrapperElement.value.clientHeight, wrapperElement.value.clientWidth);
      wrapperElement.value.style.setProperty('--dropzone-height', `${wrapperElementMinSize.value}px`);
      let titleFontSize = 12;
      if (wrapperElementMinSize.value > 100 && wrapperElementMinSize.value <= 240) {
        titleFontSize = 16;
      } else if (wrapperElementMinSize.value > 240) {
        titleFontSize = 20;
      }
      wrapperElement.value.style.setProperty('--dropzone-title-font', `${titleFontSize}px`);
    }
  }

  onMounted(() => {
    calcElementsSizes();
  });
</script>

<template>
  <!-- eslint-disable max-len -->
  <div
    ref="wrapperElement"
    v-ui3n-resize="() => calcElementsSizes()"
    :class="[
      $style.ui3nDropFiles,
      permanentDisplay && $style.ui3nDropFilesWithBorder,
      (isOverDropPlace || isOverDropZone) && $style.ui3nDropFilesWithAccentBorder
    ]"
    @dragenter="onDragenter"
    @dragleave="onDragleave"
  >
    <slot />

    <div
      v-if="permanentDisplay || isOverDropPlace || isOverDropZone"
      :class="$style.ui3nDropFilesDropzone"
      @dragenter="onDropzoneDragenter"
      @dragover="onDropzoneDragover"
      @dragleave="onDropzoneDragleave"
      @drop="onDrop"
    >
      <h3 :class="$style.ui3nDropFilesDropzoneTitle">
        {{ title }}
      </h3>

      <div :class="$style.ui3nDropFilesDropzoneIcon">
        <svg
          :width="wrapperElementMinSize * 0.35"
          :height="wrapperElementMinSize * 0.35"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M51 152C47.9333 152 45.3333 150.934 43.2 148.8C41.0667 146.667 40 144.067 40 141V119.8H46.2V141C46.2 142.2 46.7 143.3 47.7 144.3C48.7 145.3 49.8 145.8 51 145.8H141C142.2 145.8 143.3 145.3 144.3 144.3C145.3 143.3 145.8 142.2 145.8 141V119.8H152V141C152 144.067 150.933 146.667 148.8 148.8C146.667 150.934 144.067 152 141 152H51ZM93 122.4V49.2002L72.8 69.2002L68.4 65.0002L96 37.2002L123.6 65.0002L119.2 69.2002L99 49.2002V122.4H93Z"
            fill="var(--color-icon-control-primary-default)"
          />
        </svg>
      </div>

      <div
        :class="$style.ui3nDropFilesDropzoneAdditional"
        @dragenter.stop.prevent
        @dragleave.stop.prevent
      >
        <slot name="additional-text" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  .ui3nDropFiles {
    --dropzone-height: 0;
    --dropzone-title-font: 0;

    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: var(--spacing-s);
  }

  .ui3nDropFilesWithBorder {
    border: 2px dashed var(--color-border-block-primary-default);
  }

  .ui3nDropFilesWithAccentBorder {
    border: 2px dashed var(--accent-fill-pressed);
  }

  .ui3nDropFilesDropzone {
    box-sizing: border-box;
    position: absolute;
    background-color: var(--color-bg-block-primary-default);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: var(--spacing-m);
    inset: var(--spacing-xs);
    z-index: 5;
  }

  .ui3nDropFilesDropzoneTitle {
    font-size: var(--dropzone-title-font);
    font-weight: 500;
    color: var(--color-text-table-secondary-default);
    margin: 0;
    pointer-events: none;
  }

  .ui3nDropFilesDropzoneIcon {
    position: relative;
    width: calc(var(--dropzone-height) * 0.4);
    height: calc(var(--dropzone-height) * 0.4);
    border-radius: 50%;
    background-color: var(--color-bg-button-tritery-default);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .ui3nDropFilesDropzoneAdditional {
    position: relative;
    width: max-content;
    max-width: 100%;
  }
</style>
