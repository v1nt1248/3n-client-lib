<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Ui3nDropFilesEmits, Ui3nDropFilesProps, Ui3nDropFilesSlots } from './types';

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
const wrapperElementHeight = ref(0);
const isOverDropPlace = ref(false);
const isOverDropZone = ref(false);

onMounted(() => {
  if (wrapperElement.value) {
    wrapperElementHeight.value = wrapperElement.value.clientHeight;
    wrapperElement.value.style.setProperty('--dropzone-height', `${wrapperElementHeight.value}px`);
    let titleFontSize = 12;
    if (wrapperElementHeight.value > 100 && wrapperElementHeight.value <= 240) {
      titleFontSize = 16;
    } else if (wrapperElementHeight.value > 240) {
      titleFontSize = 20;
    }
    wrapperElement.value.style.setProperty('--dropzone-title-font', `${titleFontSize}px`);
  }
});

const onDragenter = (ev: MouseEvent) => {
  ev.preventDefault();
  isOverDropPlace.value = true;
};
const onDragleave = (ev: MouseEvent) => {
  ev.preventDefault();
  isOverDropPlace.value = false;
};
const onDropzoneDragover = (ev: MouseEvent) => {
  ev.preventDefault();
  ev.stopPropagation();
};
const onDropzoneDragenter = (ev: MouseEvent) => {
  ev.preventDefault();
  isOverDropZone.value = true;
};
const onDropzoneDragleave = (ev: MouseEvent) => {
  ev.preventDefault();
  isOverDropZone.value = false;
};
const onDrop = (ev: DragEvent) => {
  ev.stopPropagation();
  ev.preventDefault();
  if (ev.dataTransfer!.files) {
    emits('select', ev.dataTransfer!.files);
  }
  isOverDropPlace.value = false;
  isOverDropZone.value = false;
};
</script>

<template>
  <!-- eslint-disable max-len -->
  <div
    ref="wrapperElement"
    :class="$style.ui3nDropFiles"
    @dragenter="onDragenter"
    @dragleave="onDragleave"
  >
    <slot />

    <div
      v-if="isOverDropPlace || isOverDropZone"
      :class="$style.ui3nDropFilesDropzone"
      @dragenter="onDropzoneDragenter"
      @dragover="onDropzoneDragover"
      @dragleave="onDropzoneDragleave"
      @drop="onDrop"
    >
      <div :class="$style.ui3nDropFilesDropzoneBorder" />
      <h3 :class="$style.ui3nDropFilesDropzoneTitle">
        {{ title }}
      </h3>
      <div :class="$style.ui3nDropFilesDropzoneIcon">
        <svg
          :width="wrapperElementHeight / 2"
          :height="wrapperElementHeight / 2"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M51 152C47.9333 152 45.3333 150.934 43.2 148.8C41.0667 146.667 40 144.067 40 141V119.8H46.2V141C46.2 142.2 46.7 143.3 47.7 144.3C48.7 145.3 49.8 145.8 51 145.8H141C142.2 145.8 143.3 145.3 144.3 144.3C145.3 143.3 145.8 142.2 145.8 141V119.8H152V141C152 144.067 150.933 146.667 148.8 148.8C146.667 150.934 144.067 152 141 152H51ZM93 122.4V49.2002L72.8 69.2002L68.4 65.0002L96 37.2002L123.6 65.0002L119.2 69.2002L99 49.2002V122.4H93Z"
            fill="var(--color-icon-button-tritery-default)"
          />
        </svg>
      </div>
      <div v-if="text" :class="$style.ui3nDropFilesDropzoneText">
        {{ text }}
      </div>
      <div v-if="additionalText" :class="$style.ui3nDropFilesDropzoneText">
        {{ additionalText }}
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
}

.ui3nDropFilesDropzone {
  box-sizing: border-box;
  position: absolute;
  background-color: var(--color-bg-block-primary-default);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  inset: var(--spacing-xs) var(--spacing-s);
  border-radius: var(--spacing-s);
  z-index: 5;
}

.ui3nDropFilesDropzoneBorder {
  box-sizing: border-box;
  position: absolute;
  top: calc(var(--spacing-s) + 1px);
  bottom: calc(var(--spacing-s) + 1px);
  left: calc(var(--spacing-s) + 1px);
  right: calc(var(--spacing-s) + 1px);
  border-radius: var(--spacing-s);
  border: 2px dashed var(--fill-s-focused);
  pointer-events: none;
}

.ui3nDropFilesDropzoneTitle {
  margin: 0 0 var(--dropzone-title-font);
  font-size: var(--dropzone-title-font);
  font-weight: 600;
  color: var(--fill-pressed);
  pointer-events: none;
}

.ui3nDropFilesDropzoneIcon {
  position: relative;
  width: calc(var(--dropzone-height) * 0.4);
  height: calc(var(--dropzone-height) * 0.4);
  border-radius: 50%;
  background-color: var(--fill-s-focused);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.ui3nDropFilesDropzoneText {
  margin-top: var(--spacing-ml);
  font-size: var(--font-12);
  line-height: var(--font-16);
  font-weight: 400;
  color: var(--fill-pressed);
}

.ui3nDropFilesDropzoneAdditional {
  margin-top: var(--spacing-xs);
  font-size: var(--font-12);
  font-weight: 500;
  color: var(--color-text-control-primary-default);
}
</style>
