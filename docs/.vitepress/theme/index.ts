import DefaultTheme from 'vitepress/theme';
import { useIcons } from '../../../src/ui3n-plugins';
// import Layout from './Layout.vue';
import '../../../src/assets/styles/style.css';

export default {
  ...DefaultTheme,
  // Layout,
  enhanceApp({ app }) {
    app.use(useIcons);
  },
};
