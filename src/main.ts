import { createApp } from 'vue'
import { useIcons } from './plugins/icons'
import './assets/styles/style.css'

import App from './App.vue'

createApp(App)
  .use(useIcons)
  .mount('#ui3nLib')
