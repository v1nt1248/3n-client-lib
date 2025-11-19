export interface Ui3nInputFileProps {
  modelValue?: File[] | FileList;
  buttonText?: string;
  multiple?: boolean;
  maxNumberOfFiles?: number | string;
  maxFileSize?: number;
  allowedFileTypes?: string;
  disabled?: boolean;
}

export interface Ui3nInputFileEmits {
  (event: 'update:modelValue', value: File[] | FileList): void;
  (event: 'error', value: string): void;
}
