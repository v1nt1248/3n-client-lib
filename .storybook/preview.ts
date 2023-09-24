import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3'
import { useIcons } from './../src/plugins/icons'

setup(app => {
  app.use(useIcons)
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
