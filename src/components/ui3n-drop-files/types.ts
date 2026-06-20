import { VNode } from 'vue';

/**
 * Drop files component properties
 */
export interface Ui3nDropFilesProps {
  /**
   * HTML name attribute for form submission
   */
  name?: string;
  /**
   * Drop files title
   */
  title?: string;
  /**
   * Drop files text
   */
  text?: string;
  /**
   * Additional text
   */
  additionalText?: string;
  /**
   * Whether to permanently display the component
   * @default false
   */
  permanentDisplay?: boolean;
}

/**
 * Drop files component emits
 */
export interface Ui3nDropFilesEmits {
  /**
   * Called when files are selected
   */
  (e: 'select', fileList: FileList): void;
}

/**
 * Drop files component slots
 */
export interface Ui3nDropFilesSlots {
  /**
   * Default slot
   */
  default: () => VNode;
  /**
   * Additional text slot
   */
  'additional-text': () => VNode;
}

export interface Ui3nDropFilesExpose {
  clear: () => void;
}
