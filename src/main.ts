import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { dialogs, notifications, storeVueBus, vueBus, useIcons } from './plugins'
import { Ui3nClickOutside } from './directives'
import './assets/styles/style.css'

import App from './App.vue'

const store = createPinia()
store.use(storeVueBus)

createApp(App)
  .use(store)
  .use(useIcons)
  .use(dialogs)
  .use(notifications)
  .use(vueBus)
  .directive('ui3n-click-outside', Ui3nClickOutside)
  .mount('#ui3nLib')
