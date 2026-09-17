import { ref, type App } from 'vue';
import { THEME_KEY } from '../../constants';
import type { ThemeId, ThemePlugin, ThemePluginOptions } from './types';

const THEME_IDS: ThemeId[] = ['light', 'dark', 'midnight'];
const THEME_CLASSES = ['light-theme', 'dark-theme', 'midnight-theme'] as const;

function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && THEME_IDS.includes(value as ThemeId);
}

function applyThemeClasses(target: HTMLElement, id: ThemeId) {
  target.classList.add('colors');
  for (const className of THEME_CLASSES) {
    target.classList.remove(className);
  }
  target.classList.add(`${id}-theme`);
}

function resolveInitialTheme(options: ThemePluginOptions): ThemeId {
  if (options.persist) {
    const storageKey = options.storageKey ?? 'ui3n-theme';
    try {
      const saved = localStorage.getItem(storageKey);
      if (isThemeId(saved)) {
        return saved;
      }
    } catch {
      // ignore storage access errors
    }
  }

  if (isThemeId(options.theme)) {
    return options.theme;
  }

  return 'light';
}

export const theme = {
  install(app: App, options: ThemePluginOptions = {}) {
    const persist = options.persist ?? false;
    const storageKey = options.storageKey ?? 'ui3n-theme';
    const current = ref<ThemeId>(
      typeof document === 'undefined' ? (options.theme ?? 'light') : resolveInitialTheme(options),
    );

    function setTheme(id: ThemeId) {
      if (!isThemeId(id)) {
        return;
      }

      current.value = id;

      if (typeof document === 'undefined') {
        return;
      }

      const target = options.target ?? document.documentElement;
      applyThemeClasses(target, id);

      if (persist) {
        try {
          localStorage.setItem(storageKey, id);
        } catch {
          // ignore storage access errors
        }
      }
    }

    if (typeof document !== 'undefined') {
      setTheme(current.value);
    }

    const api: ThemePlugin = {
      theme: current,
      setTheme,
    };

    app.provide(THEME_KEY, api);
    app.config.globalProperties.$theme = api;
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $theme: ThemePlugin;
  }
}
