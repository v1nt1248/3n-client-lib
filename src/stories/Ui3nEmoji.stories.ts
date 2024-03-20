import type { Meta, StoryFn, StoryObj } from '@storybook/vue3'
import { emoticons } from '../constants/emoticons'
import Ui3nEmoji from '../components/ui3n-emoji.vue'
import type { Ui3nEmojiProps } from '../components/ui3n-emoji.vue'

const meta: Meta<typeof Ui3nEmoji> = {
  title: 'Example/Ui3nEmoji',
  component: Ui3nEmoji,
  tags: ['autodocs'],
  argTypes: {
    emoji: { control: 'text', description: 'Emoji name' },
    size: { description: 'Emoji size (px)', table: { defaultValue: { summary: 16 }, type: { summary: 'number | string' } } },
    readonly: { description: 'Whether the readonly', table: { defaultValue: { summary: false }, type: { summary: 'boolean' } } },
  },
}

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    emoji: 'smile',
    size: 32,
  },
}

const Template: StoryFn<typeof Ui3nEmoji> = (args: Ui3nEmojiProps) => ({
  components: { Ui3nEmoji },
  setup() {
    return { args, emoticons}
  },
  template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, 24px); gap: 10px 10px">
      <ui3n-emoji
        v-for="(data, emoji) in emoticons"
        :key="emoji"
        :emoji="emoji"
        size="24"
      />
    </div>
  `,
})

export const All = Template.bind({})
