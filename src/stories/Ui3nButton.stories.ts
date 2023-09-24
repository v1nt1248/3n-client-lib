import type { Meta, StoryObj, StoryFn } from '@storybook/vue3'
import { icons } from './data/icons'
import Ui3nButton from '../components/ui3n-button.vue'
import type { Ui3nButtonProps } from '../components/ui3n-button.vue'

const meta: Meta<typeof Ui3nButton> = {
  title: 'Example/Ui3nButton',
  component: Ui3nButton,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color', description: 'Background color' },
    textColor: { control: 'color', description: 'Text color' },
    round: { control: 'boolean', description: 'Whether to be round button' },
    elevation: { control: 'boolean', description: 'Whether to be button with elevation' },
    icon: { control: 'select', options: ['', ...icons], description: 'Icon mame' },
    iconSize: { control: 'number', description: 'Icon size in px' },
    iconColor: { control: 'color', description: 'Icon color' },
    disabled: { control: 'boolean', description: 'Whether to disable button' },
  },
}
export default meta

const Template: StoryFn<typeof Ui3nButton> = (args: Ui3nButtonProps) => ({
  components: { Ui3nButton },
  setup() {
    return { args } 
  },
  template: `<ui3n-button v-bind="args">Button</ui3n-button>`
})

export const WithText = Template.bind({})

export const Round: StoryObj<typeof meta> = {
  args: {
    icon: 'brush',
    round: true,
  },
}
