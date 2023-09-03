/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ui3nDialogComponentProps } from '../components/ui3n-dialog.vue'

export function storeDialogs(context: any): { $openDialog: (params: Ui3nDialogComponentProps) => void } {
  const { app = {} } = context
  const { config = {} } = app
  const { globalProperties = {} } = config
  const { $openDialog } = globalProperties
  return { $openDialog }
}