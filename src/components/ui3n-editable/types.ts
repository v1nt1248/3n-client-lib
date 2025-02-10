import type { Nullable } from '@/components/types';

export interface Ui3nContentEditableProps {
  modelValue: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  selectAllOnFocus?: boolean;
  isMultiline?: boolean;
  disallowEmptyValue?: boolean;
  debounceDelay?: number;
}

export interface Ui3nContentEditableEmits {
  (event: 'init', value: HTMLElement): void;
  (event: 'update:modelValue', value: Nullable<string>): void;
  (event: 'input', value: Nullable<string>): void;
  (event: 'change', value: Nullable<string>): void;
  (event: 'click', value: MouseEvent): void;
  (event: 'keydown', value: KeyboardEvent): void;
  (event: 'focusin', value: FocusEvent): void;
  (event: 'focusout', value: FocusEvent): void;
}

export interface Ui3nEditableProps {
  modelValue: string;
  placeholder?: string;
  maxLength?: number;
  maxWidth?: string | number;
  tooltipWidth?: number;
  disabled?: boolean;
  selectAllOnFocus?: boolean;
  disallowEmptyValue?: boolean;
}

export interface Ui3nEditableEmits {
  (event: 'update:modelValue', value: Nullable<string>): void;
  (event: 'toggle:editMode', value: boolean): void;
  (event: 'done'): void;
  (event: 'cancel'): void;
  (event: 'focusin', value: FocusEvent): void;
  (event: 'focusout'): void;
}
