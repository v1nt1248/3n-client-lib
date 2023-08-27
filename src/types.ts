import type Ui3nButton from './components/ui3n-button.vue'
import type Ui3nEmoji from './components/ui3n-emoji.vue'

export * from "./index"

declare module 'vue' {
  interface GlobalComponents {
    Ui3nButton: typeof Ui3nButton;
    Ui3nEmoji: typeof Ui3nEmoji;
  }
}
