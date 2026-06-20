<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import size from 'lodash/size';
  import last from 'lodash/last';
  import trim from 'lodash/trim';
  import { getRandomId, formatFileSize } from '@/utils';
  import type { Nullable } from '@/types';
  import type { Ui3nInputFileProps, Ui3nInputFileEmits, Ui3nInputFileSlots, Ui3nInputFileExpose } from './types';

  const props = withDefaults(defineProps<Ui3nInputFileProps>(), {
    name: undefined,
    modelValue: () => [],
    buttonText: 'Select file',
    allowedFileTypes: '*',
  });
  const emits = defineEmits<Ui3nInputFileEmits>();
  defineSlots<Ui3nInputFileSlots>();

  const id = props.id || getRandomId(4);
  const fileInput = ref<Nullable<HTMLInputElement>>(null);

  function selectFiles(ev: MouseEvent) {
    if (props.disabled) {
      return;
    }

    ev.stopImmediatePropagation();
    fileInput.value?.click();
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

    const totalCount = size(props.modelValue) + size(files);
    const isValid = totalCount <= Number(props.maxNumberOfFiles);
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
    fileInput.value && fileInput.value.files && processFiles([...fileInput.value.files]);
    fileInput.value && (fileInput.value!.value = '');
  }

  function clear() {
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    emits('update:modelValue', []);
  }

  defineExpose<Ui3nInputFileExpose>({
    clear,
  });

  watch(
    () => props.name,
    newName => {
      if (!newName) {
        clear();
      }
    },
  );
</script>

<template>
  <div :class="$style.ui3nInputFile">
    <label
      :for="id"
      :class="[$style.label, disabled && $style.disabled]"
      @click.stop.prevent="selectFiles"
    >
      <slot>{{ buttonText }}</slot>
    </label>

    <input
      :id="id"
      ref="fileInput"
      type="file"
      :name="name || 'file'"
      hidden
      :multiple="multiple"
      :accept="allowedFileTypes"
      :disabled="disabled"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" module>
  .ui3nInputFile {
    --ui3n-input-file-font-size: 12px;
    --ui3n-input-file-padding-inline: 4px;

    position: relative;
    width: max-content;
  }

  .label {
    font-size: var(--ui3n-input-file-font-size);
    font-weight: 500;
    line-height: 1.33;
    color: var(--color-text-button-secondary-default);
    padding: 0 var(--ui3n-input-file-padding-inline);
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
