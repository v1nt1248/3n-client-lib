export interface Ui3nEmojiProps {
  /**
   * Emoji to display
   */
  emoji: string;
  /**
   * Emoji size
   */
  size?: string | number;
  /**
   * Whether emoji is readonly
   * @default false
   */
  readonly?: boolean;
}

export interface Ui3nEmojiEmits {
  /**
   * Called when emoji is clicked
   */
  (ev: 'click', value: Event): void;
}
