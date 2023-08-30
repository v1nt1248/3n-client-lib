// import type { Ui3nNotificationProps, VueEventBus } from './constants'
// export * from './constants'
// export * from './tools'
// export * from './plugins'
// export * from './directives'
// export * from './components'


import Ui3nIcon from './components/ui3n-icon.vue'
import type { Ui3nIconProps, Ui3nIconEmits } from './components/ui3n-icon.vue'
import Ui3nButton from './components/ui3n-button.vue'
import type { Ui3nButtonProps, Ui3nButtonEmits } from './components/ui3n-button.vue'

export {
  Ui3nIcon,
  Ui3nIconProps,
  Ui3nIconEmits,
  Ui3nButton,
  Ui3nButtonProps,
  Ui3nButtonEmits,
}


// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $createNotice: (params: Ui3nNotificationProps) => void;
//     $locale: string;
//     $tr: (key: string, placeholders?: Record<string, string>) => string;
//     $changeLocale: (lang: string) => void;
//     $emitter: VueEventBus;
//   }
// }