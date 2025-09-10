export interface UI3nSliderProps {
  modelValue: number | [number, number];
  step?: string | number;
  range?: boolean;
  min?: string | number;
  max?: string | number;
  labelVisible?: 'always' | 'normal' | 'never';
  labelTextColor?: string;
  labelColor?: string;
  activeColor?: string;
  trackColor?: string;
  trackHeight?: string | number;
  thumbSize?: string | number;
  thumbColor?: string;
  transformValueMethod?: (value: number) => string;
  disabled?: boolean;
}

export interface UI3nSliderEmits {
  (event: 'update:modelValue', value: number | [number, number]): void;
}
