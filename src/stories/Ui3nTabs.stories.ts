import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3'
import Ui3nTabs from '../components/ui3n-tabs.vue'
import type { Ui3nTabsProps } from '../components/ui3n-tabs.vue'

const meta: Meta<typeof Ui3nTabs> = {
  title: 'Example/Ui3nTabs',
  component: Ui3nTabs,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

const Template: StoryFn<typeof Ui3nTabs> = (args: Ui3nTabsProps) => ({
  components: { Ui3nTabs },
  setup() {
    const value = ref<number>(0)
    return { args, value } 
  },
  template: `
    <div style="font-family: sans-serif; position: relative; width: 600px;">
      <ui3n-tabs
        v-bind="args"
        v-model="value"
      >
        <div style="display: flex; width: 100px; justify-content: center; align-items: center;">Option 1</div>
        <div style="display: flex; width: 100px; justify-content: center; align-items: center;">Option 2</div>
        <div style="display: flex; width: 100px; justify-content: center; align-items: center;" disabled>Option 3</div>
        <div style="display: flex; width: 100px; justify-content: center; align-items: center;">Option 4</div>
      </ui3n-tabs>
    </div>
  `,
})

export const Default = Template.bind({})
