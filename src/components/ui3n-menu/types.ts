import type { Ref, VNode } from 'vue';

/**
 * Menu component properties
 */
export interface Ui3nMenuProps {
  /**
   * Menu open state
   */
  modelValue?: boolean;
  /**
   * Trigger element
   */
  triggerElement?: HTMLElement;
  /**
   * Position strategy
   * @default 'absolute'
   */
  positionStrategy?: 'absolute' | 'fixed';
  /**
   * Whether to update position automatically
   * @default true
   */
  positionAutoupdate?: boolean;
  /**
   * Whether to allow flipping
   * @default true
   */
  allowFlip?: boolean;
  /**
   * Offset X
   * @default 0
   */
  offsetX?: number;
  /**
   * Offset Y
   * @default 0
   */
  offsetY?: number;
  /**
   * Content border radius
   */
  contentBorderRadius?: number | number[];
  /**
   * Content styles
   */
  contentStyles?: Record<string, string>;
  /**
   * Z-index
   */
  zIndex?: number;
  /**
   * Whether to close on click
   * @default true
   */
  closeOnClick?: boolean;
  /**
   * Whether to close on click outside
   * @default true
   */
  closeOnClickOutside?: boolean;
  /**
   * Whether menu is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Menu component emits
 */
export interface Ui3nMenuEmits {
  /**
   * Emitted when menu opens
   */
  (ev: 'open'): void;
  /**
   * Emitted when menu is opened
   */
  (ev: 'opened'): void;
  /**
   * Emitted when menu closes
   */
  (ev: 'close'): void;
  /**
   * Emitted when menu is closed
   */
  (ev: 'closed'): void;
  /**
   * Emitted when click outside
   */
  (ev: 'click-outside'): void;
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', value: boolean): void;
}

/**
 * Menu component slots
 */
export interface Ui3nMenuSlots {
  /**
   * Default slot
   */
  default: () => VNode;
  /**
   * Menu slot
   */
  menu?: () => VNode;
}

/**
 * Menu component expose
 */
export interface Ui3nMenuExpose {
  /**
   * Whether menu is positioned
   */
  isPositioned: Readonly<Ref<boolean>>;
  /**
   * Update position
   */
  update: () => void;
}
