<template>
  <div :class="$style.ui3nInputFile">
    <label
      :for="id"
      :class="[$style.label, disabled && $style.disabled]"
      @click.stop.prevent="selectFiles"
    >
      {{ buttonText }}
    </label>

    <input
      :id="id"
      ref="fileInput"
      type="file"
      name="file"
      hidden
      :multiple="multiple"
      :accept="allowedFileTypes"
      :disabled="disabled"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import size from 'lodash/size';
  import last from 'lodash/last';
  import trim from 'lodash/trim';
  import { getRandomId, formatFileSize } from '@/utils';
  import type { Ui3nInputFileProps, Ui3nInputFileEmits } from './types';
  import type { Nullable } from '@/components/types';

  const props = withDefaults(defineProps<Ui3nInputFileProps>(), {
    modelValue: () => [],
    buttonText: 'Select file',
    allowedFileTypes: '*',
  });
  const emits = defineEmits<Ui3nInputFileEmits>();

  const id = getRandomId(4);
  const fileInput = ref<Nullable<HTMLInputElement>>(null);

  function selectFiles(ev: MouseEvent) {
    if (props.disabled) {
      return;
    }

    ev.stopImmediatePropagation();
    fileInput.value!.click();
  }

  function validateFileSize(file: File) {
    if (!file) {
      return false;
    }

    if (!props.maxFileSize) {
      return true;
    }

    const { name, size } = file;
    if (size > props.maxFileSize) {
      emits('error', `The [${name}] file is too big. Maximum file size ${formatFileSize(props.maxFileSize)}`);
      return false;
    }
    return true;
  }

  function validateFileType(file: File) {
    if (!file) {
      return false;
    }

    const { name } = file;
    const fileExt = `.${last(name.split('.'))}`.toLowerCase();
    const allowedFileTypes = props.allowedFileTypes.split(',').map(type => trim(type).toLowerCase());

    const isValid = allowedFileTypes.includes('*') || allowedFileTypes.includes(fileExt);
    if (!isValid) {
      emits('error', `The [${name}] file type is not valid.`);
    }
    return isValid;
  }

  function validateDuplicateFile(file: File) {
    if (!file) {
      return false;
    }

    const { name } = file;
    const isFoundDuplicate = [...props.modelValue].find(file => file.name === name);

    if (isFoundDuplicate) {
      emits('error', `The [${name}] file has already been downloaded.`);
    }

    return !isFoundDuplicate;
  }

  function validateCount(files: File[] = []) {
    if (!props.maxNumberOfFiles) {
      return true;
    }

    const total = files.reduce((acc, file) => {
      const { size } = file;
      if (size) {
        acc += size;
      }
      return acc;
    }, 0);

    const isValid = total <= Number(props.maxNumberOfFiles);
    if (!isValid) {
      emits('error', `You cannot select more than ${props.maxNumberOfFiles} files.`);
    }
    return isValid;
  }

  function processFiles(files: File[]) {
    if (size(files)) {
      if (!validateCount(files)) {
        return;
      }

      const inputValue = files
        .filter(f => validateDuplicateFile(f))
        .filter(f => validateFileSize(f))
        .filter(f => validateFileType(f));

      if (size(inputValue) > 0) {
        emits('update:modelValue', [...props.modelValue, ...inputValue]);
      }
    }
  }

  function onChange() {
    processFiles([...fileInput.value!.files!]);
    fileInput.value!.value = '';
  }
</script>

<style lang="scss" module>
  .ui3nInputFile {
    position: relative;
    width: max-content;
  }

  .label {
    font-size: var(--font-12);
    font-weight: 500;
    line-height: var(--font-16);
    color: var(--color-text-button-secondary-default);
    padding: 0 var(--space-xs);
    cursor: pointer;

    &:hover {
      color: var(--color-text-button-secondary-hover);
    }

    &.disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
</style>
