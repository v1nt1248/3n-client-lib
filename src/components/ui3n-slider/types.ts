export interface UI3nSliderProps {
  /**
   * Root element id
   */
  id?: string;
  /**
   * HTML name attribute for form submission
   */
  name?: string;
  /**
   * Current slider value
   */
  modelValue: number | [number, number];
  /**
   * Slider step
   */
  step?: string | number;
  /**
   * Whether slider is range
   * @default false
   */
  range?: boolean;
  /**
   * Minimum value
   */
  min?: string | number;
  /**
   * Maximum value
   */
  max?: string | number;
  /**
   * Label visibility
   * @default 'normal'
   */
  labelVisible?: 'always' | 'normal' | 'never';
  /**
   * Label text color
   */
  labelTextColor?: string;
  /**
   * Label color
   */
  labelColor?: string;
  /**
   * Active color
   */
  activeColor?: string;
  /**
   * Track color
   */
  trackColor?: string;
  /**
   * Track height
   */
  trackHeight?: string | number;
  /**
   * Thumb size
   */
  thumbSize?: string | number;
  /**
   * Thumb color
   */
  thumbColor?: string;
  /**
   * Transform value method
   */
  transformValueMethod?: (value: number) => string;
  /**
   * Whether slider is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface UI3nSliderEmits {
  /**
   * Emitted when model value updates
   */
  (event: 'update:modelValue', value: number | [number, number]): void;
}

export interface UI3nSliderExpose {
  clear: () => void;
}
