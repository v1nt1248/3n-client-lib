import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useIcons } from './plugins/icons'
import { notifications } from './plugins/notifications'
import './assets/styles/style.css'

import App from './App.vue'

const store = createPinia()

createApp(App)
  .use(store)
  .use(useIcons)
  .use(notifications)
  .mount('#ui3nLib')
