import type { Nullable } from '@/types';

/**
 * Properties of the Ui3nContentEditable component
 */
export interface Ui3nContentEditableProps {
  /**
   * Current value of the editable content
   */
  modelValue: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Maximum length of the text
   */
  maxLength?: number;
  /**
   * Component disabled flag
   */
  disabled?: boolean;
  /**
   * Flag for automatic selection of all text on focus
   */
  selectAllOnFocus?: boolean;
  /**
   * Multiline mode flag
   */
  isMultiline?: boolean;
  /**
   * Flag to prevent empty values
   */
  disallowEmptyValue?: boolean;
  /**
   * Debounce delay in milliseconds
   */
  debounceDelay?: number;
}

/**
 * Events of the Ui3nContentEditable component
 */
export interface Ui3nContentEditableEmits {
  /**
   * Component initialization event
   */
  (event: 'init', value: HTMLElement): void;
  /**
   * Model value update event
   */
  (event: 'update:modelValue', value: Nullable<string>): void;
  /**
   * Input event
   */
  (event: 'input', value: Nullable<string>): void;
  /**
   * Value change event
   */
  (event: 'change', value: Nullable<string>): void;
  /**
   * Click event
   */
  (event: 'click', value: MouseEvent): void;
  /**
   * Keydown event
   */
  (event: 'keydown', value: KeyboardEvent): void;
  /**
   * Focusin event
   */
  (event: 'focusin', value: FocusEvent): void;
  /**
   * Focusout event
   */
  (event: 'focusout', value: FocusEvent): void;
}

/**
 * Properties of the Ui3nEditable component
 */
export interface Ui3nEditableProps {
  /**
   * Current value of the editable content
   */
  modelValue: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Maximum length of the text
   */
  maxLength?: number;
  /**
   * Maximum width of the component
   */
  maxWidth?: string | number;
  /**
   * Tooltip width
   */
  tooltipWidth?: number;
  /**
   * Component disabled flag
   */
  disabled?: boolean;
  /**
   * Flag for automatic selection of all text on focus
   */
  selectAllOnFocus?: boolean;
  /**
   * Flag to prevent empty values
   */
  disallowEmptyValue?: boolean;
}

/**
 * Events of the Ui3nEditable component
 */
export interface Ui3nEditableEmits {
  /**
   * Model value update event
   */
  (event: 'update:modelValue', value: Nullable<string>): void;
  /**
   * Edit mode toggle event
   */
  (event: 'toggle:editMode', value: boolean): void;
  /**
   * Edit completion event
   */
  (event: 'done'): void;
  /**
   * Edit cancellation event
   */
  (event: 'cancel'): void;
  /**
   * Focusin event
   */
  (event: 'focusin', value: FocusEvent): void;
  /**
   * Focusout event
   */
  (event: 'focusout'): void;
}
