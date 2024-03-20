import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3'
import { useIcons } from './../src/plugins/icons'
import { dialogs } from './../src/plugins/dialogs'
import { notifications } from './../src/plugins/notifications'

import '../src/assets/styles/style.css'

setup(app => {
  app
    .use(useIcons)
    .use(dialogs)
    .use(notifications)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
