import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import { icons } from './data/icons'
import Ui3nIcon from '../components/ui3n-icon.vue'
import type { Ui3nIconProps } from '../components/ui3n-icon.vue'

const meta: Meta<typeof Ui3nIcon> = {
  title: 'Example/Ui3nIcon',
  component: Ui3nIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', required: true, options: ['', ...icons], description: 'Icon mame' },
    inline: { control: 'boolean', description: 'Changes vertical alignment'},
    width: { description: 'Icon width', table: { defaultValue: { summary: 16 }, type: { summary: 'number | string' } } },
    height: { description: 'Icon height', table: { defaultValue: { summary: 16 }, type: { summary: 'number | string' } } },
    horizontalFlip: { description: 'Flips icon horizontally', table: { defaultValue: { summary: false }, type: { summary: 'boolean' } } },
    verticalFlip: { description: 'Flips icon vertically', table: { defaultValue: { summary: false }, type: { summary: 'boolean' } } },
    flip: { control: 'string', description: 'Alternative to horizontalFlip and verticalFlip' },
    rotate: { control: 'string', description: 'Rotates icon' },
    color: { description: 'Icon color', table: { defaultValue: { summary: '#444' }, type: { summary: 'string' } } },
    onLoad: { control: 'function', description: 'A callback that is called when icon data has been loaded' },
  },
}
export default meta

const Template: StoryFn<typeof Ui3nIcon> = (args: Ui3nIconProps) => ({
  components: { Ui3nIcon },
  setup() {
    return { args, icons }
  },
  template: `
    <div style="position: relative; height: 500px; overflow-y: auto">
      <div
        v-for="icon in icons"
        :key="icon"
        style="
          display: flex;
          justify-content:flex-start;
          align-items: center;
          margin-bottom: 8px
        "
      >
        <ui3n-icon
          :icon="icon"
          width="24"
          height="24"
        />
        <div style="padding-left: 10px; font-size: 18px">
          {{ icon }}
        </div>
      </div>
    </div>
  `,
})

export const Default: StoryObj<typeof meta> = {
  args: {
    icon: 'edit',
    width: 32,
    height: 32,
  },
}

export const All = Template.bind({})
