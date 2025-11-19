export interface Ui3nInputProps {
  modelValue: string;
  label?: string;
  type?: 'text' | 'password';
  placeholder?: string;
  clearable?: boolean;
  autofocus?: boolean;
  icon?: string;
  iconColor?: string;
  rules?: Array<(v: unknown) => boolean | string>;
  displayStateMode?: 'error' | 'success';
  displayStateWithIcon?: boolean;
  displayStateMessage?: string;
  disabled?: boolean;
}

export interface Ui3nInputEmits {
  (event: 'init', value: HTMLInputElement): void;
  (event: 'input', value: string): void;
  (event: 'keydown', value: KeyboardEvent): void;
  (event: 'focus', value: Event): void;
  (event: 'blur', value: Event): void;
  (event: 'clear'): void;
  (event: 'change', value: string): void;
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
  (event: 'escape', value: Event): void;
  (event: 'update:modelValue', value: string): void;
  (event: 'update:valid', value: boolean): void;
}
