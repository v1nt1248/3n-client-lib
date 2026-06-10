import type { VNode } from 'vue';

/**
 * Menu component properties
 */
export interface Ui3nMobileMenuProps {
  modelValue: boolean;
  width?: string;
  withBlur?: boolean;
}

/**
 * Menu component emits
 */
export interface Ui3nMobileMenuEmits {
  /**
   * Emitted when model value updates
   */
  (event: 'update:modelValue', value: boolean): void;
}

/**
 * Menu component slots
 */
export interface Ui3nMobileMenuSlots {
  /**
   * Menu Header slot - section to add custom data on top of the menu
   */
  header: () => VNode;
  /**
   * Menu body slot - The section is where your menu items are placed
   */
  menuBody: () => VNode;
  /**
   * Menu footer slot - section to add custm data on the bottom of menu
   */
  footer: () => VNode;
}
