import { VNode } from 'vue';

export interface Ui3nTabsProps {
  modelValue: number;
  itemDirection?: 'horizontal' | 'vertical';
  activeColor?: string;
  inactiveColor?: string;
  indicatorColor?: string;
  indicatorSize?: number | string;
  indicatorPosition?: 'normal' | 'reverse';
}

export interface Ui3nTabsEmits {
  (ev: 'update:modelValue', val: number): void;
}

export interface Ui3nTabsSlots {
  default: () => VNode;
}
