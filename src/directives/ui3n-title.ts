import type { DirectiveBinding } from 'vue';
import { autoUpdate, computePosition, offset } from '@floating-ui/dom';
import { getRandomId } from '../utils';
import type { Nullable } from '../types';

export type Ui3nTitleDirectivePlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface Ui3nTitleDirectiveProps {
  text: string;
  maxWidth?: number;
  color?: string;
  bgColor?: string;
  placement?: Ui3nTitleDirectivePlacement;
  positionStrategy?: 'absolute' | 'fixed';
  offsetX?: string | number;
  offsetY?: string | number;
  trigger?: 'click' | 'hover';
  style?: Record<string, string>;
  disabled?: boolean;
}

export type Ui3nTitleDirectiveBinding = DirectiveBinding<Ui3nTitleDirectiveProps>;

const baseOffset = 8;

interface TitleState {
  tooltipId: string;
  isOpen: boolean;
  cleanup: Nullable<() => void>;
  handler: (ev: MouseEvent) => void;
  trigger: 'click' | 'hover';
}

const states = new WeakMap<HTMLElement, TitleState>();
const bindings = new WeakMap<HTMLElement, Ui3nTitleDirectiveProps>();
let activeEl: HTMLElement | null = null;

function getOffsetOptions(
  placement: Ui3nTitleDirectivePlacement,
  offsetX: string | number,
  offsetY: string | number,
) {
  const mainPlacement = placement.split('-')[0];
  const options = {
    mainAxis: 0,
    crossAxis: 0,
  };

  switch (mainPlacement) {
    case 'top':
      options.mainAxis = -1 * Number(offsetY) + baseOffset;
      options.crossAxis = Number(offsetX);
      break;
    case 'bottom':
      options.mainAxis = Number(offsetY) + baseOffset;
      options.crossAxis = Number(offsetX);
      break;
    case 'left':
      options.mainAxis = -1 * Number(offsetX) + baseOffset;
      options.crossAxis = Number(offsetY);
      break;
    case 'right':
      options.mainAxis = Number(offsetX) + baseOffset;
      options.crossAxis = Number(offsetY);
      break;
    default:
      break;
  }
  return options;
}

function removeTooltipElement(tooltipId: string) {
  const tooltipEl = document.getElementById(tooltipId);
  tooltipEl?.remove();
}

function closeTitle(el: HTMLElement) {
  const state = states.get(el);
  if (!state) {
    return;
  }

  state.cleanup?.();
  state.cleanup = null;
  state.isOpen = false;
  removeTooltipElement(state.tooltipId);
  if (activeEl === el) {
    activeEl = null;
  }
}

function openTitle(el: HTMLElement, props: Ui3nTitleDirectiveProps) {
  const state = states.get(el);
  if (!state) {
    return;
  }

  if (activeEl && activeEl !== el) {
    closeTitle(activeEl);
  }

  const {
    text,
    maxWidth = 200,
    color = 'var(--color-text-control-primary-default)',
    bgColor = 'var(--color-bg-control-secondary-default)',
    placement = 'top',
    positionStrategy = 'absolute',
    offsetX = 0,
    offsetY = 0,
    style = {},
  } = props || {};

  const possibleTooltipElement = document.getElementById(state.tooltipId);
  const tooltipElement = possibleTooltipElement || document.createElement('div');
  if (!possibleTooltipElement) {
    tooltipElement.id = state.tooltipId;
    tooltipElement.classList.add('ui3n-title');
  }

  tooltipElement.innerHTML = text;
  tooltipElement.style.maxWidth = `${maxWidth}px`;
  tooltipElement.style.color = color;
  tooltipElement.style.backgroundColor = bgColor;

  if (Object.keys(style).length) {
    Object.assign(tooltipElement.style, style);
  }

  document.body.appendChild(tooltipElement);

  state.cleanup?.();
  state.cleanup = autoUpdate(el, tooltipElement, () => {
    computePosition(el, tooltipElement, {
      placement,
      strategy: positionStrategy,
      middleware: [offset(getOffsetOptions(placement, offsetX, offsetY))],
    }).then(({ x, y }) => {
      Object.assign(tooltipElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  });

  state.isOpen = true;
  activeEl = el;
}

function unbindTrigger(el: HTMLElement, state: TitleState) {
  if (state.trigger === 'click') {
    el.removeEventListener('click', state.handler);
  } else {
    el.removeEventListener('mouseenter', state.handler);
    el.removeEventListener('mouseleave', state.handler);
  }
}

function bindTrigger(el: HTMLElement, state: TitleState) {
  if (state.trigger === 'click') {
    el.addEventListener('click', state.handler);
  } else {
    el.addEventListener('mouseenter', state.handler);
    el.addEventListener('mouseleave', state.handler);
  }
}

function createHandler(el: HTMLElement) {
  return (ev: MouseEvent) => {
    const props = bindings.get(el);
    const state = states.get(el);
    if (!props || !state) {
      return;
    }

    if (props.disabled) {
      closeTitle(el);
      return;
    }

    switch (ev.type) {
      case 'click':
        if (state.isOpen) {
          closeTitle(el);
        } else {
          openTitle(el, props);
        }
        break;
      case 'mouseenter':
        openTitle(el, props);
        break;
      case 'mouseleave':
        closeTitle(el);
        break;
      default:
        break;
    }
  };
}

export default {
  mounted(el: HTMLElement, binding: Ui3nTitleDirectiveBinding) {
    const trigger = binding.value?.trigger === 'click' ? 'click' : 'hover';
    const handler = createHandler(el);
    const state: TitleState = {
      tooltipId: `ui3n-title-${getRandomId(3)}`,
      isOpen: false,
      cleanup: null,
      handler,
      trigger,
    };

    bindings.set(el, binding.value);
    states.set(el, state);
    bindTrigger(el, state);
  },

  updated(el: HTMLElement, binding: Ui3nTitleDirectiveBinding) {
    bindings.set(el, binding.value);
    const state = states.get(el);
    if (!state) {
      return;
    }

    const nextTrigger = binding.value?.trigger === 'click' ? 'click' : 'hover';
    if (nextTrigger !== state.trigger) {
      unbindTrigger(el, state);
      state.trigger = nextTrigger;
      bindTrigger(el, state);
    }
  },

  beforeUnmount(el: HTMLElement) {
    const state = states.get(el);
    if (!state) {
      return;
    }

    closeTitle(el);
    unbindTrigger(el, state);
    states.delete(el);
    bindings.delete(el);
  },
};
