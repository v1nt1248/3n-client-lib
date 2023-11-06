import type { Meta, StoryFn } from '@storybook/vue3'
import Ui3nIcon from '../components/ui3n-icon.vue'
import Ui3nChip from '../components/ui3n-chip.vue'
import type { Ui3nChipProps } from '../components/ui3n-chip.vue'

const meta: Meta<typeof Ui3nChip> = {
  title: 'Example/Ui3nChip',
  component: Ui3nChip,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number', description: 'The component height', table: { type: { summary: 'number | string' } }, defaultValue: { summary: 24 } },
    maxWidth: { control: 'number', description: 'The max width component', table: { type: { summary: 'number | string' } }, defaultValue: { summary: 200 } },
    plain: { control: 'boolean', description: 'True if the component has a border', defaultValue: { summary: false } },
    round: { control: 'boolean', description: 'True if the component is rounded. ', defaultValue: { summary: true } },
    closeable: { control: 'boolean', description: 'True if the component has close button and emit close event when this button will click', defaultValue: { summary: false } },
    color: { control: 'color', description: 'The component background color.', defaultValue: '#f2f2f2' },
    textSize: { control: 'number', description: 'The component text size.', table: { type: { summary: 'number | string' } }, defaultValue: 10 },
    textColor: { control: 'color', description: 'The component text color.', defaultValue: '#212121' },
  },
}

export default meta

const Template: StoryFn<typeof Ui3nChip> = (args: Ui3nChipProps) => ({
  components: { Ui3nChip },
  setup() {
    return { args }
  },
  template: `
    <div style="font-family: sans-serif">
      <ui3n-chip
        v-bind="args"
      >
        adminuser@test.com
      </ui3n-chip>
    </div>
  `,
})

export const Default = Template.bind({})

export const Closable = Template.bind({
  closeble: true,
})

const Template1: StoryFn<typeof Ui3nChip> = (args: Ui3nChipProps) => ({
  components: { Ui3nChip, Ui3nIcon },
  setup() {
    return { args }
  },
  template: `
    <div style="font-family: sans-serif">
      <ui3n-chip
        v-bind="args"
      >
        adminuser@test.com
        
        <template #left="{ size, color }">
          <ui3n-icon
            icon="person"
            :width="size"
            :height="size"
            :color="color"
          />
        </template>
      </ui3n-chip>
    </div>
  `,
})

export const With_Icon = Template1.bind({})