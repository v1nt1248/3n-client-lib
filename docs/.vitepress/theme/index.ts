// https://vitepress.dev/guide/custom-theme
import '../../../src/assets/styles/variables.css';
import '../../../src/assets/styles/icons.css';
import './style.css';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import ApiTable from './components/ApiTable.vue';
import Ui3nBudgeSimple from '../../../src/components/ui3n-badge/ui3n-badge-simple.vue';
import Ui3nBadge from '../../../src/components/ui3n-badge/ui3n-badge.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('ApiTable', ApiTable);
    app.component('Ui3nBudgeSimple', Ui3nBudgeSimple);
    app.component('Ui3nBadge', Ui3nBadge);
  },
};
