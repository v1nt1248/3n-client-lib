import { VNode } from 'vue';
import type { Ui3nVirtualElement } from '../ui3n-menu/types';

/**
 * Tooltip placement types
 */
export type Ui3nTooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

/**
 * Tooltip component properties
 */
export interface Ui3nTooltipProps {
  /**
   * Root element id
   */
  id?: string;
  /**
   * Whether tooltip is open
   */
  modelValue?: boolean;
  /**
   * Tooltip content
   */
  content?: string;
  /**
   * Maximum content width
   */
  maxContentWidth?: number | string;
  /**
   * Tooltip color
   */
  color?: string;
  /**
   * Tooltip text color
   */
  textColor?: string;
  /**
   * Tooltip placement
   */
  placement?: Ui3nTooltipPlacement;
  /**
   * External element the tooltip is positioned against.
   * When set, this node is the floating-ui reference and receives hover/click listeners.
   */
  triggerElement?: HTMLElement | Ui3nVirtualElement;
  /**
   * Position strategy
   * @default 'absolute' (or 'fixed' when triggerElement is set)
   */
  positionStrategy?: 'absolute' | 'fixed';
  /**
   * Offset X
   */
  offsetX?: string | number;
  /**
   * Offset Y
   */
  offsetY?: string | number;
  /**
   * Trigger type
   * @default 'hover'
   */
  trigger?: 'click' | 'hover' | 'manual';
  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Tooltip component emits
 */
export interface Ui3nTooltipEmits {
  /**
   * Called when tooltip is opening
   */
  (ev: 'open'): void;
  /**
   * Called when tooltip is opened
   */
  (ev: 'opened'): void;
  /**
   * Called when tooltip is closing
   */
  (ev: 'close'): void;
  /**
   * Called when tooltip is closed
   */
  (ev: 'closed'): void;
  /**
   * Emitted when model value updates
   */
  (ev: 'update:modelValue', value: boolean): void;
}

/**
 * Tooltip component slots
 */
export interface Ui3nTooltipSlots {
  /**
   * Default slot
   */
  default?: () => VNode;
  /**
   * Content slot
   */
  content?: () => VNode;
}
