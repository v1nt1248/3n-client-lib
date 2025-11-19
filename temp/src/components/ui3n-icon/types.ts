export interface Ui3nIconProps {
  icon: string;
  title?: string;
  size?: string | number;
  width?: string | number;
  height?: string | number;
  color?: string;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  rotate?: number;
}

export interface Ui3nIconEmits {
  (ev: 'click', value: Event): void;
}
