export interface Ui3nIconProps {
  /**
   * Root element id
   */
  id?: string;
  /** Icon name */
  icon: string;
  /** Icon title */
  title?: string;
  /** Icon size */
  size?: string | number;
  /** Icon width */
  width?: string | number;
  /** Icon height */
  height?: string | number;
  /** Icon color */
  color?: string;
  /** Flip icon horizontally */
  horizontalFlip?: boolean;
  /** Flip icon vertically */
  verticalFlip?: boolean;
  /** Icon rotation in degrees */
  rotate?: number;
}

export interface Ui3nIconEmits {
  /** Called when the icon is clicked */
  (ev: 'click', value: MouseEvent): void;
}
