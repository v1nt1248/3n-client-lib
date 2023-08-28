/* eslint-disable @typescript-eslint/no-explicit-any */
import type Ui3nIcon from './components/ui3n-icon.vue'
import type Ui3nButton from './components/ui3n-button.vue'
import type Ui3nEmoji from './components/ui3n-emoji.vue'
import type Ui3nDropFiles from './components/ui3n-drop-files.vue'
import type Ui3nInput from './components/ui3n-input.vue'
import type Ui3nText from './components/ui3n-text.vue'

export * from "./index"

declare module 'vue' {
  interface GlobalComponents {
    Ui3nIcon: typeof Ui3nIcon;
    Ui3nButton: typeof Ui3nButton;
    Ui3nEmoji: typeof Ui3nEmoji;
    Ui3nDropFiles: typeof Ui3nDropFiles;
    Ui3nInput: typeof Ui3nInput;
    Ui3nText: typeof Ui3nText;
  }

  interface ComponentCustomProperties {
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
    $emitter: {
      on: (type: string|symbol, handler: Function) => void;
      off: (type: string|symbol, handler?: Function) => void;
      emit:(type: string|symbol, arguments?: any) => void;
      once: (type: string|symbol, handler: Function) => void;
      clear: () => void;
    },
  }
}
