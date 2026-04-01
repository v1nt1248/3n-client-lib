import { VNode } from 'vue';

/**
 * Checkbox value type
 */
export type Ui3nCheckboxValue = boolean | string | number;

/**
 * Checkbox component properties
 */
export interface Ui3nCheckboxProps {
  /**
   * Current checkbox value
   */
  modelValue: Ui3nCheckboxValue;
  /**
   * Value when checkbox is checked
   */
  checkedValue?: Ui3nCheckboxValue;
  /**
   * Value when checkbox is unchecked
   */
  uncheckedValue?: Ui3nCheckboxValue;
  /**
   * Checkbox size
   */
  size?: number | string;
  /**
   * Checkbox color
   */
  color?: string;
  /**
   * Whether checkbox is in indeterminate state
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Whether checkbox is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Checkbox component events
 */
export interface Ui3nCheckboxEmits {
  /**
   * Emitted when checkbox value changes
   */
  (ev: 'change', value: Ui3nCheckboxValue): void;
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', value: Ui3nCheckboxValue): void;
}

/**
 * Checkbox component slots
 */
export interface Ui3nCheckboxSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}
