export interface Ui3nTextProps {
  text: string;
  rows?: number;
  maxRows?: number;
  label?: string;
  placeholder?: string;
  rules?: Array<(v: string) => string | boolean>;
  disabled?: boolean;
}

export interface Ui3nTextEmits {
  (ev: 'init', value: HTMLTextAreaElement): void;
  (ev: 'input', value: string): void;
  (ev: 'focus', value: Event): void;
  (ev: 'blur', value: Event): void;
  (ev: 'update:text', value: string): void;
  (ev: 'update:valid', value: boolean): void;
}
