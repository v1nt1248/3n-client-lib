import type { VNode } from 'vue';

export type Ui3nScrollbarAxes = 'vertical' | 'horizontal' | 'both';

export type Ui3nScrollbarVerticalOptions = {
  thumbMinHeight?: number | string;
  thumbHeight?: number | string | 'auto';
  thumbRadius?: number | string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
  trackWidth?: number;
  trackRadius?: number | string;
  trackColor?: string;
  /**
   * Offset of the vertical track from the top of the scrollport (px).
   * Useful when content has a sticky header that should not be covered by the track.
   */
  trackOffsetTop?: number | string;
};

export type Ui3nScrollbarHorizontalOptions = {
  thumbMinWidth?: number | string;
  thumbWidth?: number | string | 'auto';
  thumbRadius?: number | string;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
  trackHeight?: number | string;
  trackRadius?: number | string;
  trackColor?: string;
};

export interface Ui3nScrollbarProps {
  axes?: Ui3nScrollbarAxes;
  vertical?: Ui3nScrollbarVerticalOptions;
  horizontal?: Ui3nScrollbarHorizontalOptions;
  autoUpdate?: boolean;
}

export interface Ui3nScrollbarScrollPayload {
  event: Event;
  scrollTop: number;
  scrollLeft: number;
}

export interface Ui3nScrollbarEmits {
  (ev: 'scroll', value: Ui3nScrollbarScrollPayload): void;
  (ev: 'scroll:vertical', value: Ui3nScrollbarScrollPayload): void;
  (ev: 'scroll:horizontal', value: Ui3nScrollbarScrollPayload): void;
}

export interface Ui3nScrollbarSlots {
  default: () => VNode;
}

export interface Ui3nScrollbarExpose {
  scrollTo(options: ScrollToOptions): void;
  scrollToVertical(options?: { top?: number; behavior?: ScrollBehavior }): void;
  scrollToHorizontal(options?: { left?: number; behavior?: ScrollBehavior }): void;
  getContainer(): HTMLDivElement;
  updateMetrics(): void;
}
