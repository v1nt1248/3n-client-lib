/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import { App, Plugin } from 'vue';
import mitt from 'mitt';
import { VUEBUS_KEY, VueEventBus } from './types';

const emitter = mitt<any>();

const $emitter: VueEventBus<any> = {
  on: emitter.on.bind(emitter),
  once: (event, handler) => {
    function wrapHandler() {
      emitter.off(event, wrapHandler);
      // @ts-ignore
      // eslint-disable-next-line prefer-spread, prefer-rest-params
      handler.apply(null, arguments);
    }

    emitter.on(event, wrapHandler);
  },
  off: emitter.off.bind(emitter),
  emit: emitter.emit.bind(emitter),
  clear: emitter.all.clear.bind(emitter),
};

export const vueBus: Plugin = {
  install: (app: App) => {
    app.config.globalProperties.$emitter = $emitter;
    app.provide(VUEBUS_KEY, { $emitter });
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $emitter: VueEventBus<any>;
  }
}
