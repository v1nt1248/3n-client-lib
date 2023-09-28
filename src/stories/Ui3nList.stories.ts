import type { Meta, StoryFn } from '@storybook/vue3'
import { prepareList } from './data/data-to-list'
import Ui3nList from '../components/ui3n-list.vue'

const meta: Meta<typeof Ui3nList> = {
  title: 'Example/Ui3nList',
  // @ts-expect-error
  component: Ui3nList,
  tags: ['autodocs'],
  argTypes: {
    items: { description: 'Array of the list items. It is desirable that the list element contains an "id" field.' },
    title: { description: 'The list title', table: { type: { summary: 'string' } } },
    sticky: { description: 'Whether to enable list title sticky top', table: { type: { summary: 'boolean' }, defaulValue: { summary: true } } },
    disabled: { description: 'Removes the ability to select list item.', table: { type: { summary: 'boolean' }, defaulValue: false } },
  },
}

export default meta

const Template: StoryFn<typeof Ui3nList> = args => ({
  components: { Ui3nList },
  setup() {
    const list = prepareList()
    return { args, list }
  },
  template: `
    <div style="
      position: relative;
      width: 320px;
      height: 400px;
      margin-bottom: 20px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 4px 8px;
      font-family: sans-serif;
      "
    >
      <ui3n-list
        :sticky="false"
        :items="list"
      >
        <template #item="{ item }">
          <ui3n-list
            :title="item.title"
            :items="item.children"
          >
            <template #item="{ item: children }">
              <div>{{ children.title }}</div>
            </template>
          </ui3n-list>
        </template>
      </ui3n-list>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
