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
  placement?: Ui3nTitleDirectivePlacement;
  positionStrategy?: 'absolute' | 'fixed';
  offsetX?: string | number;
  offsetY?: string | number;
  trigger?: 'click' | 'hover';
  disabled?: boolean;
}

export type Ui3nTitleDirectiveBinding = DirectiveBinding<Ui3nTitleDirectiveProps>;

const baseOffset = 8;
const controllers: Record<string, AbortController> = {};
let showTitle = false;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let cleanup: Nullable<Function> = null;
const id = getRandomId(3);

function addEventListener(
  eventName: 'click' | 'mouseenter' | 'mouseleave',
  el: HTMLElement,
  props: Ui3nTitleDirectiveProps,
) {
  controllers[eventName] = new AbortController();
  el.addEventListener(
    eventName,
    function () {
      switch (eventName) {
        case 'click':
          onClick(el, props);
          break;
        case 'mouseenter':
          onMouseEnter(el, props);
          break;
        case 'mouseleave':
          onMouseLeave(el, props);
          break;
      }
    },
    { signal: controllers[eventName].signal },
  );
}

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
    placement = 'top',
    positionStrategy = 'absolute',
    offsetX = 0,
    offsetY = 0,
  } = props || {};

  showTitle = isOpen;

  if (!showTitle) {
    removeTooltipElement(id);
    return;
  }

  const tooltipElement = document.createElement('div');
  tooltipElement.id = id;
  tooltipElement.innerText = text;
  tooltipElement.classList.add('ui3n-title');
  tooltipElement.style.maxWidth = `${maxWidth}px`;
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

function onClick(el: HTMLElement, props: Ui3nTitleDirectiveProps) {
  console.log('onClick => ', props.disabled);
  if (props.disabled) {
    removeTooltipElement(id);
    showTitle = false;
    return;
  }

  makeTooltip(el, props, !showTitle);
}

function onMouseEnter(el: HTMLElement, props: Ui3nTitleDirectiveProps) {
  console.log('onMouseEnter => ', props.disabled);
  if (props.disabled) {
    removeTooltipElement(id);
    showTitle = false;
    return;
  }

  makeTooltip(el, props, true);
}

function onMouseLeave(el: HTMLElement, props: Ui3nTitleDirectiveProps) {
  console.log('onMouseLeave => ', props.disabled);
  if (props.disabled) {
    removeTooltipElement(id);
    showTitle = false;
    return;
  }

  makeTooltip(el, props, false);
}

function handle(el: HTMLElement, props: Ui3nTitleDirectiveProps) {
  if (props.trigger === 'click') {
    addEventListener('click', el, props);
  } else {
    addEventListener('mouseenter', el, props);
    addEventListener('mouseleave', el, props);
  }
}

export default {
  mounted(el: HTMLElement, binding: Ui3nTitleDirectiveBinding) {
    console.log('[ui3n-title] MOUNTED', el, binding.value);
    handle(el, binding.value);
  },
  updated: (el: HTMLElement, binding: Ui3nTitleDirectiveBinding) => {
    console.log('[ui3n-title] UPDATED', el, binding.value);
    handle(el, binding.value);
  },
  beforeUnmount() {
    cleanup && cleanup();
    cleanup = null;

    removeTooltipElement(id);
    showTitle = false;

    Object.keys(controllers).forEach(key => {
      controllers[key].abort();
    });
  },
};
