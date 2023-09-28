import { ref } from 'vue'
import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import { icons } from './data/icons'
import Ui3nInput from '../components/ui3n-input.vue'
import type { Ui3nInputProps } from '../components/ui3n-input.vue'

const meta: Meta<typeof Ui3nInput> = {
  title: 'Example/Ui3nInput',
  component: Ui3nInput,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', required: true, options: ['', ...icons], description: 'Icon mame' },
  }
}

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    value: 'Hello!',
  },
}

const Template: StoryFn<typeof Ui3nInput> = (args: Ui3nInputProps) => ({
  components: { Ui3nInput },
  setup() {
    const value = ref<string>('')
    return { args, value }
  },
  template: `
    <div style="font-family: sans-serif;">
      <ui3n-input
        v-bind="args"
        v-model:value="value"
      />
      <p><b>Value:</b> {{ value }}</p>
    </div>
  `,
})

export const With_label = Template.bind({})
With_label.args = {
  label: 'Label',
}

export const With_Placeholder = Template.bind({})
With_Placeholder.args = {
  placeholder: 'Enter text',
}

export const Clearable = Template.bind({})
Clearable.args = {
  clearable: true,
}

export const With_Icon = Template.bind({})
With_Icon.args = {
  icon: 'search',
}

export const With_Color_Icon = Template.bind({})
With_Color_Icon.args = {
  icon: 'search',
  iconColor: '#ff8800',
}

export const With_Rule = Template.bind({})
With_Rule.args = {
  placeholder: 'Enter at least 6 characters',
  rules: [v => v.length > 6 || 'Text length must be greater than 6'],
}

export const Disabled: StoryObj<typeof meta> = {
  args: {
    value: 'Hello!',
    disabled: true,
  },
}
