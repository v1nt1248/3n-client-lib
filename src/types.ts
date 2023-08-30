import { VNode } from 'vue'
import type { Ui3nNotificationProps, VueEventBus } from './constants'
import type { Ui3nButtonProps, Ui3nButtonEmits } from './components'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $createNotice: (params: Ui3nNotificationProps) => void;
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
    $emitter: VueEventBus;
  }
}

declare module '@v1nt1248/3nclient-lib' {
  class Ui3nButton {
    $props: Ui3nButtonProps;
    $emits: Ui3nButtonEmits;
    $clots: {
      default: () => VNode[];
    }
  }
}
