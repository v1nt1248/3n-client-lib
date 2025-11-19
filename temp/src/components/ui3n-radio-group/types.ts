import { VNode } from 'vue';

export type Ui3nRadioValue = boolean | string | number;

export interface Ui3nRadioProps {
  modelValue?: Ui3nRadioValue;
  checkedValue?: Ui3nRadioValue;
  uncheckedValue?: Ui3nRadioValue;
  size?: number | string;
  color?: string;
  disabled?: boolean;
}

export interface Ui3nRadioEmits {
  (ev: 'change', value: Ui3nRadioValue): void;
  (ev: 'update:modelValue', value: Ui3nRadioValue): void;
}

export interface Ui3nRadioSlots {
  checkedIcon: () => VNode;
  uncheckedIcon: () => VNode;
  default: () => VNode;
}

export interface Ui3nRadioGroupProps {
  name: string;
  modelValue: Ui3nRadioValue;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

export interface Ui3nRadioGroupEmits {
  (ev: 'change', value: Ui3nRadioValue): void;
  (ev: 'update:modelValue', value: Ui3nRadioValue): void;
}

export interface Ui3nRadioGroupSlots {
  default: () => VNode;
}
