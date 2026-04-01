import { VNode } from 'vue';

/**
 * Tabs component properties
 */
export interface Ui3nTabsProps {
  /**
   * Current active tab index
   */
  modelValue: number;
  /**
   * Direction of tabs
   * @default 'horizontal'
   */
  itemDirection?: 'horizontal' | 'vertical';
  /**
   * Active tab color
   */
  activeColor?: string;
  /**
   * Inactive tab color
   */
  inactiveColor?: string;
  /**
   * Indicator color
   */
  indicatorColor?: string;
  /**
   * Indicator size
   */
  indicatorSize?: number | string;
  /**
   * Indicator position
   * @default 'normal'
   */
  indicatorPosition?: 'normal' | 'reverse';
}

/**
 * Tabs component emits
 */
export interface Ui3nTabsEmits {
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', val: number): void;
}

/**
 * Tabs component slots
 */
export interface Ui3nTabsSlots {
  /**
   * Default slot
   */
  default: () => VNode;
}
