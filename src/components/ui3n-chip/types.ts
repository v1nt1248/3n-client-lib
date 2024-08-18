import { VNode } from 'vue';

export interface Ui3nChipProps {
  height?: number | string;
  maxWidth?: number | string;
  plain?: boolean;
  round?: boolean;
  closeable?: boolean;
  color?: string;
  textSize?: number | string;
  textColor?: string;
}
export interface Ui3nChipEmits {
  (ev: 'close'): void;
}
export interface Ui3nChipSlots {
  left: (props: { size: number; color: string }) => VNode;
  default: () => VNode;
}
