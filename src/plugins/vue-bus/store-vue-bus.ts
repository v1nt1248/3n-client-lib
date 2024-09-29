/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VueEventBus } from './types';

export function storeVueBus(context: any): { $emitter: VueEventBus<any> } {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $emitter } = globalProperties;
  return { $emitter };
}
