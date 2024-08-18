import { VNode } from 'vue';

export type Ui3nCheckboxValue = boolean | string | number;

export interface Ui3nCheckboxProps {
  modelValue: Ui3nCheckboxValue;
  checkedValue?: Ui3nCheckboxValue;
  uncheckedValue?: Ui3nCheckboxValue;
  size?: number | string;
  color?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

export interface Ui3nCheckboxEmits {
  (ev: 'change', value: Ui3nCheckboxValue): void;
  (ev: 'update:modelValue', value: Ui3nCheckboxValue): void;
}

export interface Ui3nCheckboxSlots {
  default: () => VNode;
}
