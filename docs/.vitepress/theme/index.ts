// https://vitepress.dev/guide/custom-theme
import '../../../src/assets/styles/variables.css';
import '../../../src/assets/styles/icons.css';
import './style.css';
import Layout from './Layout.vue';

const modules = import.meta.glob('../../../src/components/*/*.vue', { eager: true });

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    for (const path in modules) {
      const component = modules[path].default;
      const name = path.split('/').pop()?.replace('.vue', '');
      if (name) app.component(name, component);
    }
  },
};
