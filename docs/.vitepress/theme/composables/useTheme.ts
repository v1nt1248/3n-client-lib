import { inject, onMounted, ref } from 'vue';
import { THEME_KEY } from '../../../../src/constants/plugins-keys';
import type { ThemeId } from '../../../../src/plugins/theme/types';

export type ThemeMode = 'light' | 'dark' | 'midnight';

const theme = ref<ThemeMode>('light');

function toPluginTheme(mode: ThemeMode): ThemeId {
  switch (mode) {
    case 'dark':
      return 'dark';
    case 'midnight':
      return 'midnight';
    default:
      return 'light';
  }
}

function toUiTheme(saved: string | null): ThemeMode {
  if (saved === 'dark' || saved === 'midnight') {
    return saved;
  }
  return 'light';
}

export function useTheme() {
  const themePlugin = inject(THEME_KEY);

  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme;
    localStorage.setItem('user-theme', newTheme);
    themePlugin?.setTheme(toPluginTheme(newTheme));
  };

  onMounted(() => {
    const saved = toUiTheme(localStorage.getItem('user-theme'));
    setTheme(saved);
  });

  return { theme, setTheme };
}
