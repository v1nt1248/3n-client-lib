export interface Ui3nEmojiProps {
  emoji: string;
  size?: string | number;
  readonly?: boolean;
}

export interface Ui3nEmojiEmits {
  (ev: 'click', value: Event): void;
}
