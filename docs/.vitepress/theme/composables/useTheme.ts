import { ref, onMounted } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'midnight';

const theme = ref<ThemeMode>('light');

export function useTheme() {
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme;
    localStorage.setItem('user-theme', newTheme);
    updateHtmlClasses(newTheme);
  };

  function updateHtmlClasses(theme: ThemeMode) {
    console.log('[##] updateHtmlClasses => ', theme);
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
    }

    if (html.classList.contains('theme-dark')) {
      html.classList.remove('theme-dark');
    }

    if (html.classList.contains('theme-light')) {
      html.classList.remove('theme-light');
    }

    if (!html.classList.contains('colors')) {
      html.classList.add('colors');
    }

    switch (theme) {
      case 'dark': {
        html.classList.remove('default-theme');
        html.classList.remove('dark-theme');
        html.classList.add('dark2-theme');
        break;
      }
      case 'midnight': {
        html.classList.remove('default-theme');
        html.classList.remove('dark2-theme');
        html.classList.add('dark-theme');
        break;
      }
      default: {
        html.classList.remove('dark-theme');
        html.classList.remove('dark2-theme');
        html.classList.add('default-theme');
        break;
      }
    }
  }

  onMounted(() => {
    const saved = localStorage.getItem('user-theme') as ThemeMode;
    if (saved) {
      setTheme(saved || 'light');
    }
  });

  return { theme, setTheme };
}
