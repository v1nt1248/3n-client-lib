export interface Ui3nIconProps {
  icon: string;
  title?: string;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  flip?: string;
  rotate?: number;
  color?: string;
  onLoad?: Function;
}

export interface Ui3nIconEmits {
  (ev: 'click', value: Event): void;
}
