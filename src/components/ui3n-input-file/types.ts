export interface Ui3nInputFileProps {
  /**
   * Selected files
   */
  modelValue?: File[] | FileList;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Whether multiple files can be selected
   * @default false
   */
  multiple?: boolean;
  /**
   * Maximum number of files
   */
  maxNumberOfFiles?: number | string;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
  /**
   * Allowed file types
   */
  allowedFileTypes?: string;
  /**
   * Whether input is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface Ui3nInputFileEmits {
  /**
   * Called when model value updates
   */
  (event: 'update:modelValue', value: File[] | FileList): void;
  /**
   * Called when error occurs
   */
  (event: 'error', value: string): void;
}

export interface Ui3nInputFileSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}
