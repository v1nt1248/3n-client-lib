export interface Ui3nInputProps {
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
   * Input icon
   */
  icon?: string;
  /**
   * Input icon color
   */
  iconColor?: string;
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
