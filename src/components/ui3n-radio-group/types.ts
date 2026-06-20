import { VNode } from 'vue';

/**
 * Radio value type
 */
export type Ui3nRadioValue = boolean | string | number;

/**
 * Radio component properties
 */
export interface Ui3nRadioProps {
  /**
   * Root element id
   */
  id?: string;
  /**
   * HTML name attribute for form submission (used if radio is outside a group)
   */
  name?: string;
  /**
   * Current radio value
   */
  modelValue?: Ui3nRadioValue;
  /**
   * Value when radio is checked
   */
  checkedValue?: Ui3nRadioValue;
  /**
   * Value when radio is unchecked
   */
  uncheckedValue?: Ui3nRadioValue;
  /**
   * Radio size
   */
  size?: number | string;
  /**
   * Radio color
   */
  color?: string;
  /**
   * Whether radio is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Radio component emits
 */
export interface Ui3nRadioEmits {
  /**
   * Emitted when radio value changes
   */
  (ev: 'change', value: Ui3nRadioValue): void;
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', value: Ui3nRadioValue): void;
}

export interface Ui3nRadioExpose {
  clear: () => void;
}

/**
 * Radio component slots
 */
export interface Ui3nRadioSlots {
  /**
   * Checked icon slot
   */
  checkedIcon: () => VNode;
  /**
   * Unchecked icon slot
   */
  uncheckedIcon: () => VNode;
  /**
   * Default slot
   */
  default: () => VNode;
}

/**
 * Radio group component properties
 */
export interface Ui3nRadioGroupProps {
  /**
   * Root element id
   */
  id?: string;
  /**
   * Radio group name
   */
  name: string;
  /**
   * Current radio group value
   */
  modelValue: Ui3nRadioValue;
  /**
   * Radio group direction
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Whether radio group is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Radio group component emits
 */
export interface Ui3nRadioGroupEmits {
  /**
   * Emitted when radio group value changes
   */
  (ev: 'change', value: Ui3nRadioValue): void;
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', value: Ui3nRadioValue): void;
}

/**
 * Radio group component slots
 */
export interface Ui3nRadioGroupSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}

export interface Ui3nRadioGroupExpose {
  clear: () => void;
}
