/* eslint-disable max-len */
import type { Meta, StoryFn } from '@storybook/vue3'
import Ui3nIcon from '../components/ui3n-icon.vue'
import Ui3nBreadcrumb from '../components/ui3n-breadcrumb.vue'
import Ui3nBreadcrumbs from '../components/ui3n-breadcrumbs.vue'
import type { Ui3nBreadcrumdsProps } from '../components/ui3n-breadcrumbs.vue'

const meta: Meta<typeof Ui3nBreadcrumbs> = {
  title: 'Example/Ui3nBreadcrumbs',
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text', description: 'Separator.', defaultValue: { summary: '/' } },
    disabled: { control: 'boolean', description: 'Whether to disable the breadcrumbs' },
  },
}

export default meta

const Template: StoryFn<typeof Ui3nBreadcrumbs> = (args: Ui3nBreadcrumdsProps) => ({
  components: { Ui3nBreadcrumb, Ui3nBreadcrumbs },
  setup() {
    const onClick = (value: string) => {
      console.log(value)
    }

    return { args, onClick }
  },
  template: `
    <ui3n-breadcrumbs
      v-bind="args"
    >
      <ui3n-breadcrumb :is-active="true" @click="onClick('ITEM 1')">ITEM 1</ui3n-breadcrumb>
      <ui3n-breadcrumb :is-active="true" @click="onClick('ITEM 2')">ITEM 2</ui3n-breadcrumb>
      <ui3n-breadcrumb>ITEM 3</ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  `,
})

export const Default = Template.bind({})

export const Another_separator = Template.bind({})
Another_separator.args = {
  separator: '>',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

const Template1: StoryFn<typeof Ui3nBreadcrumbs> = (args: Ui3nBreadcrumdsProps) => ({
  components: { Ui3nBreadcrumb, Ui3nBreadcrumbs, Ui3nIcon },
  setup() {
    const onClick = (value: string) => {
      console.log(value)
    }

    return { args, onClick }
  },
  template: `
    <ui3n-breadcrumbs
      v-bind="args"
    >
      <ui3n-breadcrumb :is-active="true" @click="onClick('ITEM 1')">
        ITEM 1
        <template #separator>
          <ui3n-icon
            icon="arrow-forward"
            width="12"
            height="12"
          />
        </template>
      </ui3n-breadcrumb>
      <ui3n-breadcrumb :is-active="true" @click="onClick('ITEM 2')">
        ITEM 2
        <template #separator>
          <ui3n-icon
            icon="arrow-forward"
            width="12"
            height="12"
          />
        </template>
      </ui3n-breadcrumb>
      <ui3n-breadcrumb>
        ITEM 3
      </ui3n-breadcrumb>
    </ui3n-breadcrumbs>
  `,
})

export const With_separator_slot = Template1.bind({})
