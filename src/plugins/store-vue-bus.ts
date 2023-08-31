/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VueEventBus } from '../constants'

export function storeVueBus(context: any): { $emitter: VueEventBus } {
  console.log('CONTEXT: ', context)
  const { app = {} } = context
  const { config = {} } = app
  const { globalProperties = {} } = config
  const { $emitter } = globalProperties
  return { $emitter }
}
