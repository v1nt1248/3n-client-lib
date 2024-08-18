export interface Ui3nInputProps {
  modelValue: string;
  label?: string;
  type?: 'text' | 'password';
  placeholder?: string;
  clearable?: boolean;
  autofocus?: boolean;
  icon?: string;
  iconColor?: string;
  rules?: Array<(v: string) => any>;
  displayStateMode?: 'error' | 'success';
  displayStateWithIcon?: boolean;
  displayStateMessage?: string;
  disabled?: boolean;
}

export interface Ui3nInputEmits {
  (ev: 'init', value: HTMLInputElement): void;
  (ev: 'input', value: string): void;
  (ev: 'focus', value: Event): void;
  (ev: 'blur', value: Event): void;
  (ev: 'clear'): void;
  (ev: 'change', value: string): void;
  (ev: 'update:modelValue', value: string): void;
  (ev: 'update:valid', value: boolean): void;
}
