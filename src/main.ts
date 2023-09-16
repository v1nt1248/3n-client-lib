import { createApp } from 'vue'
import { dialogs, notifications, vueBus, useIcons } from './plugins'
import './assets/styles/style.css'

import App from './App.vue'

createApp(App)
  .use(useIcons)
  .use(dialogs)
  .use(notifications)
  .use(vueBus)
  .mount('#ui3nLib')
