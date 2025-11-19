export interface Ui3nButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'custom';
  size?: 'regular' | 'small';
  block?: boolean;
  textColor?: string;
  color?: string;
  elevation?: boolean;
  icon?: string;
  iconSize?: string | number;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

export interface Ui3nButtonEmits {
  (ev: 'init', value: HTMLButtonElement): void;
  (ev: 'click', value: Event): void;
  (ev: 'enter', value: HTMLButtonElement): void;
  (ev: 'focus', value: Event): void;
  (ev: 'blur', value: Event): void;
}

export type Ui3nButtonEventName = 'init' | 'click' | 'enter' | 'focus' | 'blur';
