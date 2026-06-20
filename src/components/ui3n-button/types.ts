import type { ButtonHTMLAttributes, VNode } from 'vue';

export interface Ui3nButtonProps extends /*@vue-ignore */ Omit<ButtonHTMLAttributes, 'type'> {
  /** Button type */
  type?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'icon' | 'custom';
  /** Button size */
  size?: 'small' | 'regular' | 'large';
  /** The unrounded button */
  square?: boolean;
  /** Whether to stretch the button to the full width of the parent block */
  block?: boolean;
  /** Button text color */
  textColor?: string;
  /** Button background color */
  color?: string;
  /** Add a raised effect to the button */
  elevation?: boolean;
  /** The icon displayed on the button */
  icon?: string;
  /** Button icon size */
  iconSize?: string | number;
  /** Button icon color */
  iconColor?: string;
  /** Button icon position */
  iconPosition?: 'left' | 'right';
  /** Put component in disabled mode */
  disabled?: boolean;
}

export interface Ui3nButtonEmits {
  /** Called when the component is initialized */
  (ev: 'init', value: HTMLButtonElement): void;
  /** Called when the button is clicked */
  (ev: 'click', value: Event): void;
  /** Called when the Enter key is pressed */
  (ev: 'enter', value: HTMLButtonElement): void;
  /** Called when the button has focus */
  (ev: 'focus', value: Event): void;
  /** Called when the button loses focus. */
  (ev: 'blur', value: Event): void;
}

export type Ui3nButtonEventName = 'init' | 'click' | 'enter' | 'focus' | 'blur';

export interface Ui3nButtonSlots {
  /** Default slot */
  default: () => VNode;
}
