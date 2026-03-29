// https://vitepress.dev/guide/custom-theme
import '../../../src/assets/styles/variables.css';
import '../../../src/assets/styles/icons.css';
import './style.css';
import Layout from './Layout.vue';

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};
