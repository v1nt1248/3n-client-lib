/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey } from 'vue';

export type CbFunction = (...args: any[]) => void;

export interface VueEventBus {
  on: (type: string | symbol, handler: CbFunction) => void;
  off: (type: string | symbol, handler?: CbFunction) => void;
  emit: (type: string | symbol, arg?: any) => void;
  once: (type: string | symbol, handler: CbFunction) => void;
  clear: () => void;
}

export interface VueBusPlugin {
  $emitter: VueEventBus;
}

export const VUEBUS_KEY = Symbol() as InjectionKey<VueBusPlugin>;
