/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TooltipsPlugin } from './types';

export function storeTooltips(context: any): { $tooltip: TooltipsPlugin } {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $tooltip } = globalProperties;
  return { $tooltip };
}
