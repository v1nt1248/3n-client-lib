/* eslint-disable max-len */
import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import Ui3nBadge from '../components/ui3n-badge.vue'
import type { Ui3nBadgeProps } from '../components/ui3n-badge.vue'

const meta: Meta<typeof Ui3nBadge> = {
  title: 'Example/Ui3nBadge',
  component: Ui3nBadge,
  tags: ['autodocs'],
  argTypes: {
    dot: { control: 'boolen', description: `The badget is a dot if this field's value is true.`, defaultValue: { summary: false } },
    value: { control: 'text', description: 'The value shown in the badge (takes effect when dot is false).', table: { type: { summary: 'number | string' } } },
    color: { control: 'color', description: 'Custom badge color.', defaultValue: { summary: '#0090ec' } },
    textColor: { control: 'color', description: 'Custom color of the value shown in the badge.', defaultValue: { summary: '#fff' } },
    position: { control: 'select', options: ['right-top', 'right-bottom', 'left-top', 'left-bottom'], description: 'The badget position relative to the element (component) “passed” through the default slot', table: { type: { summary: 'right-top | right-bottom | left-top | left-bottom' } }, defaultValue: { summary: 'right-top' } },
  },
}

export default meta

export const Badge_Simple: StoryObj<typeof meta> = {
  args: {
    value: '1',
  },
}

const Template: StoryFn<typeof Ui3nBadge> = (args: Ui3nBadgeProps) => ({
  components: { Ui3nBadge },
  setup() {
    return { args } 
  },
  template: `
    <div style="font-family: sans-serif;">
      <ui3n-badge
        v-bind="args"
      >
        <div style="position: relative; width: 120px; height: 30px; color: green; border: 1px solid green; display: flex; justify-content: center; align-items: center;">
          Hello!
        </div>
      </ui3n-badge>
    </div>
  `,
})

export const Use_Slot = Template.bind({})
Use_Slot.args = {
  value: 9,
}
