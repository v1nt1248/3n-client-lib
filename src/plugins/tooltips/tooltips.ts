import { type App, type Plugin, createApp, markRaw } from 'vue';
import { getRandomId } from '../../utils';
import Ui3nTooltipContainer from '../../components/ui3n-tooltip/ui3n-tooltip-container.vue';
import { TOOLTIPS_KEY } from '../../constants';
import type {
  TooltipContainerExpose,
  TooltipHandle,
  TooltipInstance,
  TooltipTarget,
  TooltipsPlugin,
  Ui3nTooltipAttachOptions,
  Ui3nTooltipShowOptions,
} from './types';

export const tooltips: Plugin = {
  install: (app: App) => {
    if (typeof window === 'undefined') {
      return;
    }

    const containerDiv = document.createElement('div');
    document.body.appendChild(containerDiv);
    const containerApp = createApp(Ui3nTooltipContainer);

    containerApp._context.provides = app._context.provides;

    const containerInstance = containerApp.mount(containerDiv) as unknown as TooltipContainerExpose;

    function createHandle(id: string, kind: TooltipInstance['kind']): TooltipHandle {
      return {
        id,
        close: () => {
          if (kind === 'show') {
            hide();
          } else {
            detach(id);
          }
        },
        update: patch => containerInstance.update(id, patch),
      };
    }

    function show(target: TooltipTarget, options: Ui3nTooltipShowOptions): TooltipHandle {
      containerInstance.removeByKind('show');
      const id = getRandomId(6);
      containerInstance.add({
        ...options,
        id,
        kind: 'show',
        target: markRaw(target),
        trigger: 'manual',
        modelValue: true,
        positionStrategy: options.positionStrategy ?? 'fixed',
      });
      return createHandle(id, 'show');
    }

    function attach(target: TooltipTarget, options: Ui3nTooltipAttachOptions): TooltipHandle {
      if (target instanceof HTMLElement) {
        containerInstance.removeByTarget(target);
      }

      const id = getRandomId(6);
      containerInstance.add({
        ...options,
        id,
        kind: 'attach',
        target: markRaw(target),
        trigger: options.trigger ?? 'hover',
        positionStrategy: options.positionStrategy ?? 'fixed',
      });
      return createHandle(id, 'attach');
    }

    function hide() {
      containerInstance.removeByKind('show');
    }

    function detach(targetOrId: HTMLElement | string) {
      if (typeof targetOrId === 'string') {
        containerInstance.remove(targetOrId);
      } else {
        containerInstance.removeByTarget(targetOrId);
      }
    }

    function detachAll() {
      containerInstance.clearAll();
    }

    const $tooltip: TooltipsPlugin = { show, attach, hide, detach, detachAll };

    app.config.globalProperties.$tooltip = $tooltip;
    app.provide<TooltipsPlugin>(TOOLTIPS_KEY, $tooltip);
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $tooltip: TooltipsPlugin;
  }
}
