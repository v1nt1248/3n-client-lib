/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThemePlugin } from './types';

export function storeTheme(context: any): { $theme: ThemePlugin } {
  const { app = {} } = context;
  const { config = {} } = app;
  const { globalProperties = {} } = config;
  const { $theme } = globalProperties;
  return { $theme };
}
