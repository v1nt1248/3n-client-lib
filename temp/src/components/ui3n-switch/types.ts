import { VNode } from 'vue';

export interface Ui3nSwitchProps {
  modelValue: boolean;
  size?: number | string;
  color?: string;
  disabled?: boolean;
}

export interface Ui3nSwitchEmits {
  (ev: 'change', value: boolean): void;
  (ev: 'update:modelValue', value: boolean): void;
}

export interface Ui3nSwitchSlots {
  default: () => VNode;
}
