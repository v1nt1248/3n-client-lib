import { App, Plugin } from 'vue';
import { I18N_KEY, type I18nOptions, type I18nPlugin } from './types';

export const i18n: Plugin = {
  install: (app: App, options: I18nOptions) => {
    const { lang, messages } = options;
    const allLanguages = Object.keys(messages) || [];

    const $tr = (key: string, placeholders?: Record<string, string>) => {
      let message = messages[app.config.globalProperties.$locale][key];
      if (!message) {
        return key;
      }

      if (placeholders) {
        for (const item of Object.entries(placeholders)) {
          const [placeholder, value] = item;
          if (message.includes(`{${placeholder}}`)) {
            message = message.replace(`{${placeholder}}`, value);
          }
        }
      }

      return message;
    };

    const $changeLocale = (lang: string) => {
      if (!allLanguages.includes(lang)) {
        throw new Error(`The language ${lang} is undefined.`);
      }
      app.config.globalProperties.$locale = lang;
    };

    app.config.globalProperties.$locale = lang;

    app.config.globalProperties.$tr = $tr;

    app.config.globalProperties.$changeLocale = $changeLocale;

    app.provide<I18nPlugin>(I18N_KEY, { $locale: lang, $tr, $changeLocale });
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $locale: string;
    $tr: (key: string, placeholders?: Record<string, string>) => string;
    $changeLocale: (lang: string) => void;
  }
}
