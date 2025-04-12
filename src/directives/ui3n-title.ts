import type { DirectiveBinding } from 'vue';
import { autoUpdate, computePosition, offset } from '@floating-ui/dom';
import { getRandomId } from '@/utils';
import type { Nullable } from '@/components/types';

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
let showTitle = false;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let cleanup: Nullable<Function> = null;
const id = getRandomId(3);

const elsBinding = new WeakMap();
const elsHandlers = new WeakMap();

function getOffsetOptions(placement: Ui3nTitleDirectivePlacement, offsetX: string | number, offsetY: string | number) {
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
  }
  return options;
}

function removeTooltipElement(tooltipId: string) {
  const tooltipEl = document.getElementById(tooltipId);
  tooltipEl && tooltipEl.remove();
}

function makeTooltip(el: HTMLElement, props: Ui3nTitleDirectiveProps, isOpen: boolean) {
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

  showTitle = isOpen;

  if (!showTitle) {
    removeTooltipElement(id);
    return;
  }

  const possibleTooltipElement = document.getElementById(id);
  const tooltipElement = possibleTooltipElement || document.createElement('div');
  if (!possibleTooltipElement) {
    tooltipElement.id = id;
    tooltipElement.classList.add('ui3n-title');
  }

  tooltipElement.innerHTML = text;
  tooltipElement.style.maxWidth = `${maxWidth}px`;
  tooltipElement.style.color = color;
  tooltipElement.style.backgroundColor = bgColor;

  if (Object.keys(style).length) {
    Object.assign(tooltipElement.style, style);
  }

  el.insertAdjacentElement('beforeend', tooltipElement);

  cleanup = autoUpdate(el, tooltipElement, () => {
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
}

export default {
  mounted(el: HTMLElement, binding: Ui3nTitleDirectiveBinding) {
    elsBinding.set(el, binding.value);

    const handler = (ev: MouseEvent) => {
      const props = elsBinding.get(el) as Ui3nTitleDirectiveProps;

      if (props.disabled) {
        removeTooltipElement(id);
        showTitle = false;
        return;
      }

      switch (ev.type) {
        case 'click':
          makeTooltip(el, props, !showTitle);
          break;
        case 'mouseenter':
          makeTooltip(el, props, true);
          break;
        case 'mouseleave':
          makeTooltip(el, props, false);
          break;
      }
    };

    elsHandlers.set(el, handler);

    if (binding.value.trigger === 'click') {
      el.addEventListener('click', handler);
    } else {
      el.addEventListener('mouseenter', handler);
      el.addEventListener('mouseleave', handler);
    }
  },
  updated(el: HTMLElement, binding: Ui3nTitleDirectiveBinding) {
    const isBindingPresent = elsBinding.has(el);
    if (isBindingPresent) {
      elsBinding.delete(el);
    }
    elsBinding.set(el, binding.value);
  },
  beforeUnmount(el: HTMLElement, binding: Ui3nTitleDirectiveBinding) {
    cleanup && cleanup();
    cleanup = null;

    removeTooltipElement(id);
    showTitle = false;

    const handler = elsHandlers.get(el);
    if (binding.value.trigger === 'click') {
      el.removeEventListener('click', handler);
    } else {
      el.removeEventListener('mouseenter', handler);
      el.removeEventListener('mouseleave', handler);
    }
  },
};
