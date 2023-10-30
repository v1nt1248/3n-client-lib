/* eslint-disable max-len */
import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3'
import Ui3nTabs from '../components/ui3n-tabs.vue'
import type { Ui3nTabsProps } from '../components/ui3n-tabs.vue'

const meta: Meta<typeof Ui3nTabs> = {
  title: 'Example/Ui3nTabs',
  component: Ui3nTabs,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { description: 'The value of the conponent.', table: { type: { summary: 'number' } }, defaultValue: { summary: 0 } },
    itemDirection: { control: 'select', options: ['', 'horizontal', 'vertical'], description: 'The layout direction of the tab items.', table: { type: { summary: 'horizontal | vertical' } }, defaultValue: { summary: 'horizontal' } },
    activeColor: { description: 'The text color of the activated tab.', table: { type: { summary: 'string' } }, defaultValue: { summary: '#0090ec' } },
    inactiveColor: { description: 'The text color of the not activated tab.', table: { type: { summary: 'string' } }, defaultValue: { summary: '#212121' } },
    indicatorColor: { description: 'The color of the activity indicator.', table: { type: { summary: 'string' } }, defaultValue: { summary: '#0090ec' } },
    indicatorSize: { control: 'number', description: 'The thickness of the activity indicator.', table: { type: { summary: 'number | string' } }, defaultValue: { summary: 2 } },
    indicatorPosition: { control: 'select', options: ['', 'normal', 'reverse'], description: 'The position of the activity indicator.', table: { type: { summary: 'normal | reverse' } }, defaultValue: { summary: 'normal' } },
  },
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
        <div style="display: flex; width: 100px; min-height: 32px; justify-content: center; align-items: center;">Option 1</div>
        <div style="display: flex; width: 100px; min-height: 32px; justify-content: center; align-items: center;">Option 2</div>
        <div style="display: flex; width: 100px; min-height: 32px; justify-content: center; align-items: center;" disabled>Option 3</div>
        <div style="display: flex; width: 100px; min-height: 32px; justify-content: center; align-items: center;">Option 4</div>
      </ui3n-tabs>
    </div>
  `,
})

export const Default = Template.bind({})
