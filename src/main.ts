import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { notifications, storeVueBus, vueBus, useIcons } from './plugins'
import './assets/styles/style.css'

import App from './App.vue'

const store = createPinia()
store.use(storeVueBus)

createApp(App)
  .use(store)
  .use(useIcons)
  .use(notifications)
  .use(vueBus)
  .mount('#ui3nLib')
