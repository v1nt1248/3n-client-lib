import type { Ref, VNode } from 'vue';

export interface Ui3nInputProps {
  /**
   * Root element id
   */
  id?: string;
  /**
   * Input value
   */
  modelValue: string;
  /**
   * Input label
   */
  label?: string;
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'password';
  /**
   * Input field size (height)
   * @default 'regular'
   */
  size?: 'regular' | 'large';
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Whether input is clearable
   * @default false
   */
  clearable?: boolean;
  /**
   * Whether input is autofocus
   * @default false
   */
  autofocus?: boolean;
  /**
   * Whether input is readonly
   * @default false
   */
  readonly?: boolean;
  /**
   * Input name attribute (for use in native forms)
   */
  name?: string;
  /**
   * Maximum length of input value
   */
  maxlength?: number;
  /**
   * Minimum length of input value
   */
  minlength?: number;
  /**
   * Autocomplete attribute
   * @default 'off'
   */
  autocomplete?: string;
  /**
   * Validation rules
   */
  rules?: Array<(v: unknown) => boolean | string>;
  /**
   * Whether to validate at startup
   * @default false
   */
  validateAtStartup?: boolean;
  /**
   * Whether to hide bottom space
   * @default false
   */
  hideBottomSpace?: boolean;
  /**
   * Display state mode
   */
  displayStateMode?: 'error' | 'success';
  /**
   * Whether to display state with icon
   * @default false
   */
  displayStateWithIcon?: boolean;
  /**
   * Display state message
   */
  displayStateMessage?: string;
  /**
   * Whether input is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface Ui3nInputEmits {
  /**
   * Called when input is initialized
   */
  (event: 'init', value: HTMLInputElement): void;
  /**
   * Called when input value changes
   */
  (event: 'input', value: string): void;
  /**
   * Called when key is pressed
   */
  (event: 'keydown', value: KeyboardEvent): void;
  /**
   * Called when input is focused
   */
  (event: 'focus', value: Event): void;
  /**
   * Called when input loses focus
   */
  (event: 'blur', value: Event): void;
  /**
   * Called when input is cleared
   */
  (event: 'clear'): void;
  /**
   * Called when input value changes
   */
  (event: 'change', value: string): void;
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
   * Called when model value updates
   */
  (event: 'update:modelValue', value: string): void;
  /**
   * Called when validation status updates
   */
  (event: 'update:valid', value: boolean): void;
}

export interface Ui3nInputSlots {
  /**
   * Slot for prepend icon (displayed at the start of the input)
   */
  'prepend-icon'?: () => VNode[];
  /**
   * Slot for append icon (displayed at the end of the input)
   */
  'append-icon'?: () => VNode[];
}

export interface Ui3nInputExpose {
  /**
   * Reference to the input DOM element
   */
  inputElement: Ref<HTMLInputElement | null>;
  /**
   * Whether the input has been modified
   */
  isDirty: Ref<boolean>;
  /**
   * Whether the input is currently focused
   */
  isFocused: Ref<boolean>;
  /**
   * Clear the input value
   */
  clearValue: () => void;
}
