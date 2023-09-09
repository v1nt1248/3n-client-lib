import { App, Plugin } from 'vue'
import type { InjectionKey } from 'vue'

export interface I18nOptions {
  lang: string;
  messages: Record<string, Record<string, string>>;
}

export interface I18nPlugin {
  $locale: string;
  $tr: (key: string, placeholders?: Record<string, string>) => string;
  $changeLocale: (lang: string) => void;
}

export const I18N_KEY = Symbol() as InjectionKey<I18nPlugin>

export const i18n: Plugin = {
  install: (app: App, options: I18nOptions) => {
    const { lang, messages } = options
    const allLanguages = Object.keys(messages) || []

    const $tr = (key: string, placeholders?: Record<string, string>) => {
      let message = messages[app.config.globalProperties.$locale][key]
      if (!message) {
        return key
      }

      if (placeholders) {
        for (const item of Object.entries(placeholders)) {
          const [placeholder, value] = item
          if (message.includes(`{${placeholder}}`)) {
            message = message.replace(`{${placeholder}}`, value)
          }
        }
      }

      return message
    }

    const $changeLocale = (lang: string) => {
      if (!allLanguages.includes(lang)) {
        throw new Error(`The language ${lang} is undefined.`)
      }
      app.config.globalProperties.$locale = lang
    }

    app.config.globalProperties.$locale = lang

    app.config.globalProperties.$tr = $tr

    app.config.globalProperties.$changeLocale = $changeLocale

    app.provide<I18nPlugin>(I18N_KEY, { $locale: lang, $tr, $changeLocale })
  },
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
  }
}
