// @ts-nocheck
import type { Meta, StoryFn } from '@storybook/vue3'
import { inject, defineAsyncComponent } from 'vue'
import { DIALOGS_KEY } from '../plugins/dialogs'
import type { DialogsPlugin } from '../plugins/dialogs'
import Ui3nDialog from '../components/ui3n-dialog.vue'
import type { Ui3nDialogComponentProps } from '../components/ui3n-dialog.vue'

const meta: Meta<typeof Ui3nDialog> = {
  title: 'Example/Ui3nDialog',
  component: Ui3nDialog,
  tags: ['autodocs'],
  argTypes: {
    component: { description: 'Vue component', table: { type: { summary: 'Component' } } },
    componentProps: { description: 'Properties of the Vue component used', table: { type: { summary: 'object' } }},
    dialogProps: { description: 'Properties of the Ui3nDialog component', table: { type: { summary: 'object' } } },
    'dialogProps.teleport': { description: 'The location of the dialog to mount', table: { type: { summary: 'string' }, defaultValue: { summary: 'body' } } },
    'dialogProps.title': { description: 'The dialog title', table: { type: { summary: 'string' } } },
    'dialogProps.width': { description: 'The dialog width (px)', table: { type: { summary: 'number | string' }, defaultValue: { summary: 380 } } },
    'dialogProps.cssClass': { description: 'The dialog body CSS class', table: { type: { summary: 'string' } } },
    'dialogProps.cssStyle': { description: 'The dialog body CSS style', table: { type: { summary: 'Record<string, string>' } } },
    'dialogProps.contentCssClass': { description: 'The dialog content wrapper CSS class', table: { type: { summary: 'string' } } },
    'dialogProps.contentCssStyle': { description: 'The dialog content wrapper CSS style', table: { type: { summary: 'Record<string, string>' } } },
    'dialogProps.confirmButton': { description: 'Whether to display the confirm button', table: { type: { summary: 'boolean' }, defaultValue: { summary: true } } },
    'dialogProps.cancelButton': { description: 'Whether to display the cancel button', table: { type: { summary: 'boolean' }, defaultValue: { summary: true } } },
    'dialogProps.confirmButtonText': { description: 'The confirm button text', table: { type: { summary: 'string' }, defaultValue: { summary: 'Done' } } },
    'dialogProps.cancelButtonText': { description: 'The cancel button text', table: { type: { summary: 'string' }, defaultValue: { summary: 'Cancel' } } },
    'dialogProps.confirmButtonColor': { description: 'The confirm button text color', table: { type: { summary: 'string' }, defaultValue: { summary: '#fff' } } },
    'dialogProps.cancelButtonColor': { description: 'The cancel button text color', table: { type: { summary: 'string' }, defaultValue: { summary: '#0090ec' } } },
    'dialogProps.confirmButtonBackground': { description: 'The confirm button background color', table: { type: { summary: 'string' }, defaultValue: { summary: '#0090ec' } } },
    'dialogProps.cancelButtonBackground': { description: 'The cancel button background color', table: { type: { summary: 'string' }, defaultValue: { summary: '#fff' } } },
    'dialogProps.closeOnClickOverlay': { description: 'Whether to click the overlay to close the dialog', table: { type: { summary: 'boolean' }, defaultValue: { summary: true } } },
    'dialogProps.onConfirm': { description: 'Confirm callback', table: { type: { summary: '(data: any) => void' } } },
    'dialogProps.onCancel': { description: 'Cancel callback', table: { type: { summary: '(data: any) => void' } } },
  },
}

export default meta

const Template: StoryFn<typeof Ui3nDialog> = (args: Ui3nDialogComponentProps) => ({
  components: { Ui3nDialog },
  setup() {
    const dialogs = inject<DialogsPlugin>(DIALOGS_KEY)

    const openDialog = () => {
      const testDialogComponent = defineAsyncComponent(() => import('./data/Dialog.vue'))
      dialogs?.$openDialog({
        component: testDialogComponent,
        componentProps: {
          dialogText: 'You try delete this entity.',
          additionalDialogText: 'Are you sure?'
        },
        dialogProps: {
          title: 'Delete entity',
          onConfirm: () => {
            console.info('You have clicked Confirm')
          },
          onCancel: () => {
            console.info('You have clicked Cancel')
          },
        },
      })
    }

    return { args, openDialog }
  },
  template: `
    <button
      style="padding: 8px 16px; cursor: pointer"
      @click="openDialog"
    >
      Open dialog
    </button>
  `,
})

export const Default = Template.bind({})
