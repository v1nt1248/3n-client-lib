import { createApp } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useIcons } from './plugins/icons'
import { notifications } from './plugins/notifications'
import Ui3nHtml from './directives/ui3n-html'

import './assets/styles/style.css'

import App from './App.vue'

dayjs.extend(relativeTime)

createApp(App)
  .use(useIcons)
  .use(notifications)
  .provide('$dayjs', dayjs)
  .directive('ui3n-html', Ui3nHtml)
  .mount('#ui3nLib')
