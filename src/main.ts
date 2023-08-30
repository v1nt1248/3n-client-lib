import { createApp } from 'vue'
import { useIcons } from './plugins/icons'
import { notifications } from './plugins/notifications'
import './assets/styles/style.css'

import App from './App.vue'

createApp(App)
  .use(useIcons)
  .use(notifications)
  .mount('#ui3nLib')
