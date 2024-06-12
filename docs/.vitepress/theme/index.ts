import DefaultTheme from 'vitepress/theme'
import { useIcons } from '../../../src/plugins'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(useIcons)
  },
}
