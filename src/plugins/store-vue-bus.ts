/* eslint-disable @typescript-eslint/no-explicit-any */
interface EventBus {
  on: (type: string|symbol, handler: Function) => void;
  off: (type: string|symbol, handler?: Function) => void;
  emit:(type: string|symbol, args?: any) => void;
  once: (type: string|symbol, handler: Function) => void;
  clear: () => void;
}

export function storeVueBus(context: any): { $emitter: EventBus } {
  const { app = {} } = context
  const { config = {} } = app
  const { globalProperties = {} } = config
  const { $emitter } = globalProperties
  return { $emitter }
}
