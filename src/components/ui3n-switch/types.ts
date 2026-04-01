import { VNode } from 'vue';

/**
 * Switch component properties
 */
export interface Ui3nSwitchProps {
  /**
   * Current switch value
   */
  modelValue: boolean;
  /**
   * Switch size
   */
  size?: number | string;
  /**
   * Switch color
   */
  color?: string;
  /**
   * Whether switch is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Switch component emits
 */
export interface Ui3nSwitchEmits {
  /**
   * Emitted when switch value changes
   */
  (ev: 'change', value: boolean): void;
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', value: boolean): void;
}

/**
 * Switch component slots
 */
export interface Ui3nSwitchSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}
