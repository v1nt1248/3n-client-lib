export interface Ui3nTextProps {
  /**
   * Text value
   */
  modelValue: string;
  /**
   * Number of rows
   */
  rows?: number;
  /**
   * Maximum number of rows
   */
  maxRows?: number;
  /**
   * Text label
   */
  label?: string;
  /**
   * Text placeholder
   */
  placeholder?: string;
  /**
   * Validation rules
   */
  rules?: Array<(v: string) => string | boolean>;
  /**
   * Whether to validate at startup
   * @default false
   */
  validateAtStartup?: boolean;
  /**
   * Whether text is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface Ui3nTextEmits {
  /**
   * Called when text is initialized
   */
  (event: 'init', value: HTMLTextAreaElement): void;
  /**
   * Called when text value changes
   */
  (event: 'input', value: string): void;
  /**
   * Called when text value changes
   */
  (event: 'change', value: string): void;
  /**
   * Called when key is pressed
   */
  (event: 'keydown', value: KeyboardEvent): void;
  /**
   * Called when Enter key is pressed
   */
  (
    event: 'enter',
    value: {
      value: string;
      altKey: boolean;
      ctrlKey: boolean;
      shiftKey: boolean;
      metaKey: boolean;
    },
  ): void;
  /**
   * Called when Escape key is pressed
   */
  (event: 'escape', value: Event): void;
  /**
   * Called when text is focused
   */
  (event: 'focus', value: Event): void;
  /**
   * Called when text loses focus
   */
  (event: 'blur', value: Event): void;
  /**
   * Called when model value updates
   */
  (event: 'update:modelValue', value: string): void;
  /**
   * Called when validation status updates
   */
  (event: 'update:valid', value: boolean): void;
}
