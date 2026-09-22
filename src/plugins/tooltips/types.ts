import type { Ui3nTooltipProps } from '../../components/ui3n-tooltip/types';
import type { Ui3nVirtualElement } from '../../components/ui3n-menu/types';

export type TooltipTarget = HTMLElement | Ui3nVirtualElement;

export type Ui3nTooltipShowOptions = Omit<Ui3nTooltipProps, 'modelValue' | 'trigger' | 'id' | 'triggerElement'>;

export interface Ui3nTooltipAttachOptions extends Omit<Ui3nTooltipProps, 'modelValue' | 'id' | 'triggerElement'> {
  trigger?: 'hover' | 'click';
}

export interface TooltipHandle {
  id: string;
  close: () => void;
  update: (patch: Partial<Ui3nTooltipShowOptions>) => void;
}

export interface TooltipsPlugin {
  show: (target: TooltipTarget, options: Ui3nTooltipShowOptions) => TooltipHandle;
  attach: (target: TooltipTarget, options: Ui3nTooltipAttachOptions) => TooltipHandle;
  hide: () => void;
  detach: (targetOrId: HTMLElement | string) => void;
  detachAll: () => void;
}

export interface TooltipInstance extends Ui3nTooltipShowOptions {
  id: string;
  kind: 'show' | 'attach';
  target: TooltipTarget;
  trigger: 'hover' | 'click' | 'manual';
  modelValue?: boolean;
}

export interface TooltipContainerExpose {
  add: (item: TooltipInstance) => void;
  remove: (id: string) => void;
  removeByKind: (kind: 'show' | 'attach') => void;
  removeByTarget: (target: HTMLElement) => void;
  update: (id: string, patch: Partial<Ui3nTooltipShowOptions>) => void;
  clearAll: () => void;
}
