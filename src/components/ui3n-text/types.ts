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
  (event: 'init', value: HTMLTextAreaElement): void;
  (event: 'input', value: string): void;
  (event: 'change', value: string): void;
  (event: 'enter', value: {
    value: string;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
  }): void;
  (event: 'escape', value: Event): void;
  (event: 'focus', value: Event): void;
  (event: 'blur', value: Event): void;
  (event: 'update:text', value: string): void;
  (event: 'update:valid', value: boolean): void;
}
