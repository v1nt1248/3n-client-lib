import { createApp } from 'vue';
import { dialogs, notifications, vueBus } from './ui3n-plugins';
import Ui3nHtml from './directives/ui3n-html';
import Ui3nTitle from './directives/ui3n-title';
import './assets/styles/icons.css';
import './assets/styles/variables.css';
import './assets/styles/style.css';

import App from './App.vue';

createApp(App)
  .use(dialogs)
  .use(notifications)
  .use(vueBus)
  .directive('ui3n-html', Ui3nHtml)
  .directive('ui3n-title', Ui3nTitle)
  .mount('#ui-3n-lib');
