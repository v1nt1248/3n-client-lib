import type { Ref } from 'vue';

export type ThemeId = 'light' | 'dark' | 'midnight';

export interface ThemePluginOptions {
  theme?: ThemeId;
  persist?: boolean;
  storageKey?: string;
  target?: HTMLElement;
}

export interface ThemePlugin {
  theme: Ref<ThemeId>;
  setTheme: (id: ThemeId) => void;
}
