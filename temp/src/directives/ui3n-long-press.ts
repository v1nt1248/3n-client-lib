import type { DirectiveBinding, ObjectDirective } from 'vue';
import { unrefElement } from '@/utils';

export type Ui3nLongPressBindingValue = {
  handler: (event: PointerEvent) => void;
  delay?: number;
  distanceThreshold?: number;
  onMouseUpCb?: (event: PointerEvent) => void;
};

export interface Ui3nLongPressModifiers {
  stop?: boolean;
  prevent?: boolean;
  self?: boolean;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

interface Ui3nLongExtendedDirective extends ObjectDirective<HTMLElement, Ui3nLongPressBindingValue> {
  pointerdownEvent: (event: PointerEvent) => void;
  pointerupEvent: (event: PointerEvent) => void;
  pointermoveEvent: (event: PointerEvent) => void;
  timeout: ReturnType<typeof setTimeout> | null;
  posStart: { x: number; y: number };
}

const DEFAULT_DELAY = 500;
const DEFAULT_THRESHOLD = 10;

function getDir(binding: DirectiveBinding<Ui3nLongPressBindingValue>) {
  return binding.dir as Ui3nLongExtendedDirective;
}

function pointerdownEvent(
  binding: DirectiveBinding<Ui3nLongPressBindingValue>,
  event: PointerEvent,
) {
  const { modifiers = {} as Ui3nLongPressModifiers, value = {} as Ui3nLongPressBindingValue } = binding;
  const { handler, delay = DEFAULT_DELAY } = value;

  if (handler.constructor.name !== 'Function') {
    throw Error('[v-ui3n-longpress] The handler as a function should be provided in the directiveю');
  }

  if ('prevent' in modifiers) {
    event.preventDefault();
  }

  if ('stop' in modifiers) {
    event.stopPropagation();
  }

  if ('self' in modifiers) {
    event.stopImmediatePropagation();
  }

  const dir = getDir(binding);
  dir.posStart.x = event.x;
  dir.posStart.y = event.y;

  // dir.timeout = setTimeout(() => el.dispatchEvent(new CustomEvent('longpress')), delay);
  dir.timeout = setTimeout(() => handler(event), delay);
}

function pointerupEvent(
  binding: DirectiveBinding<Ui3nLongPressBindingValue>,
  event: PointerEvent,
) {
  const { modifiers = {} as Ui3nLongPressModifiers, value = {} as Ui3nLongPressBindingValue } = binding;
  const { onMouseUpCb } = value;

  if ('prevent' in modifiers) {
    event.preventDefault();
  }

  if ('stop' in modifiers) {
    event.stopPropagation();
  }

  if ('self' in modifiers) {
    event.stopImmediatePropagation();
  }

  const dir = getDir(binding);
  if (dir.timeout !== null) {
    clearTimeout(dir.timeout);
    dir.timeout = null;
    dir.posStart = { x: 0, y: 0 };
  }

  if (onMouseUpCb) {
    onMouseUpCb(event);
  }
}

function pointermoveEvent(
  binding: DirectiveBinding<Ui3nLongPressBindingValue>,
  event: PointerEvent,
) {
  const { modifiers = {} as Ui3nLongPressModifiers, value = {} as Ui3nLongPressBindingValue } = binding;
  const { distanceThreshold = DEFAULT_THRESHOLD } = value;

  if ('prevent' in modifiers) {
    event.preventDefault();
  }

  if ('stop' in modifiers) {
    event.stopPropagation();
  }

  if ('self' in modifiers) {
    event.stopImmediatePropagation();
  }

  const dir = getDir(binding);
  const dx = event.x - dir.posStart.x;
  const dy = event.y - dir.posStart.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (dir.timeout !== null && distance >= distanceThreshold) {
    clearTimeout(dir.timeout);
    dir.timeout = null;
    dir.posStart = { x: 0, y: 0 };
  }
}

const ui3nLongPress: Ui3nLongExtendedDirective = {
  pointerdownEvent: () => ({}),
  pointerupEvent: () => ({}),
  pointermoveEvent: () => ({}),
  timeout: null,
  posStart: { x: 0, y: 0 },
  mounted(el, binding) {
    const dir = getDir(binding);
    const targetEl = unrefElement(el);
    if (!targetEl) {
      return;
    }

    const { modifiers = {} as Ui3nLongPressModifiers } = binding;
    const listenerOptions: AddEventListenerOptions = {
      capture: modifiers?.capture,
      once: modifiers?.once,
      passive: modifiers?.passive,
    };

    dir.pointerdownEvent = (event: PointerEvent) => pointerdownEvent(binding, event);
    dir.pointerupEvent = (event: PointerEvent) => pointerupEvent(binding, event);
    dir.pointermoveEvent = (event: PointerEvent) => pointermoveEvent(binding, event);

    targetEl.addEventListener('pointerdown', dir.pointerdownEvent, listenerOptions);
    targetEl.addEventListener('pointerup', dir.pointerupEvent, listenerOptions);
    targetEl.addEventListener('pointermove', dir.pointermoveEvent, listenerOptions);
  },
  beforeUnmount(el, binding) {
    const targetEl = unrefElement(el);
    if (!targetEl) {
      return;
    }

    const { modifiers = {} as Ui3nLongPressModifiers } = binding;
    const listenerOptions: AddEventListenerOptions = {
      capture: modifiers?.capture,
      once: modifiers?.once,
      passive: modifiers?.passive,
    };

    const dir = getDir(binding);
    targetEl.removeEventListener('pointerdown', dir.pointerdownEvent, listenerOptions);
    targetEl.removeEventListener('pointerup', dir.pointerupEvent, listenerOptions);
    targetEl.removeEventListener('pointermove', dir.pointermoveEvent, listenerOptions);
  },
};

export default ui3nLongPress;
