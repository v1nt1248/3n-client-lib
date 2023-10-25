import { ref } from 'vue'
import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import Ui3nCheckbox from '../components/ui3n-checkbox.vue'
import type { Ui3nCheckboxProps } from '../components/ui3n-checkbox.vue'

const meta: Meta<typeof Ui3nCheckbox> = {
  title: 'Example/Ui3nCheckbox',
  component: Ui3nCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { description: 'The value of the conponent.', table: { type: { summary: 'boolean | string | number' } } },
    checkedValue: { description: 'Checked value.', table: { type: { summary: 'boolean | string | number' } }, defaultValue: { summary: 'true' } },
    uncheckedValue: { description: 'Unchecked value.', table: { type: { summary: 'boolean | string | number' } }, defaultValue: { summary: 'true' } },
    size: { description: 'Checkbox size.', table: { type: { summary: 'string | number' } }, defaultValue: { summary: '16' } },
    color: { description: 'Checkbox color.', table: { type: { summary: 'string' } }, defaultValue: { summary: '#0090ec' } },
    indeterminate: { description: 'Sets an indeterminate state for the checkbox.', table: { type: { summary: 'boolean' } }, defaultValue: { summary: false } },
    disabled: { control: 'boolean', description: 'Removes the ability to click or target the component.', table: { defaultValue: { summary: false } } },
  },
}

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    modelValue: true,
  },
}

export const Size_24: StoryObj<typeof meta> = {
  args: {
    modelValue: true,
    size: '24',
  },
}

export const Change_Color: StoryObj<typeof meta> = {
  args: {
    modelValue: true,
    size: '24',
    color: '#ffc765',
  },
}

export const Indeterminate: StoryObj<typeof meta> = {
  args: {
    modelValue: true,
    size: '24',
    indeterminate: true,
  },
}

export const Disabled: StoryObj<typeof meta> = {
  args: {
    modelValue: true,
    size: '24',
    disabled: true,
  },
}

const Tmplt: StoryFn<typeof Ui3nCheckbox> = (args: Ui3nCheckboxProps) => ({
  components: { Ui3nCheckbox },
  setup() {
    const value = ref<boolean>(true)
    return { args, value } 
  },
  template: `
    <div style="font-family: sans-serif;">
      <ui3n-checkbox
        v-bind="args"
        v-model="value"
      >
        Label
      </ui3n-checkbox>
    </div>
  `,
})

export const With_Label = Tmplt.bind({})
