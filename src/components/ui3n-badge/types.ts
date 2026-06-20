import type { VNode } from 'vue';

export interface Ui3nBadgeSimpleProps {
  /**
   * Root element id
   */
  id?: string;
  /** For simple display as a circle */
  dot?: boolean;
  /** Text displayed inside the circle */
  value?: string | number;
  /** Background color */
  color?: string;
  /** Text color  */
  textColor?: string;
}

export interface Ui3nBadgeSimpleEmits {
  (event: 'change:size', val: { width: number; height: number }): void;
}

export interface Ui3nBadgeProps {
  /** Root element  id*/
  id?: string;
  /** For simple display as a circle */
  dot?: boolean;
  /** Text displayed inside the circle */
  value?: string | number;
  /** Background color */
  color?: string;
  /** Text color  */
  textColor?: string;
  /** Positioning of the circle */
  position?: 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom';
}

export interface Ui3nBadgeSlots {
  /** Default slot */
  default: () => VNode;
}
