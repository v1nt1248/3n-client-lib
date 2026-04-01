/**
 * Circular progress component properties
 */
export interface Ui3nProgressCircularProps {
  /**
   * Progress value
   */
  value?: number | string;
  /**
   * Progress size
   */
  size?: number | string;
  /**
   * Progress width
   */
  width?: number | string;
  /**
   * Whether to show text
   * @default false
   */
  withText?: boolean;
  /**
   * Background color
   */
  bgColor?: string;
  /**
   * Progress color
   */
  color?: string;
  /**
   * Whether progress is indeterminate
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * Linear progress component properties
 */
export interface Ui3nProgressLinearProps {
  /**
   * Progress value
   */
  value?: number | string;
  /**
   * Progress height
   */
  height?: number | string;
  /**
   * Whether to show text
   * @default false
   */
  withText?: boolean;
  /**
   * Background color
   */
  bgColor?: string;
  /**
   * Progress color
   */
  color?: string;
  /**
   * Whether progress is indeterminate
   * @default false
   */
  indeterminate?: boolean;
}
