import type { DirectiveBinding } from 'vue';

export interface Ui3nRippleDirectiveProps {
  color?: string;
  duration?: number;
  eventsTriggers?: Array<'click' | 'enter'>;
  disabled?: boolean;
}

export type Ui3nRippleDirectiveBinding = DirectiveBinding<Ui3nRippleDirectiveProps>;

interface RippleState {
  controller: AbortController;
}

const states = new WeakMap<HTMLElement, RippleState>();

function createRipple(el: HTMLElement, color?: string, duration?: number) {
  const circle = document.createElement('div');
  const diameter = Math.max(el.clientWidth, el.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${Math.round(el.clientWidth / 2 - radius)}px`;
  circle.style.top = `${Math.round(el.clientHeight / 2 - radius)}px`;
  circle.classList.add('ui3n-ripple');
  if (color) {
    circle.style.setProperty('--ui3n-ripple-bg-color', color);
  }
  if (duration) {
    circle.style.setProperty('--ui3n-ripple-duration', `${duration}ms`);
  }

  const ripple = el.getElementsByClassName('ui3n-ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  el.appendChild(circle);
}

function bindListeners(el: HTMLElement, binding: Ui3nRippleDirectiveBinding) {
  states.get(el)?.controller.abort();

  const { color, duration, eventsTriggers = [], disabled = false } = binding.value || {};
  if (disabled) {
    states.delete(el);
    return;
  }

  const controller = new AbortController();
  const opts = { signal: controller.signal } as AddEventListenerOptions;

  if (!eventsTriggers.length || eventsTriggers.includes('click')) {
    el.addEventListener('click', () => createRipple(el, color, duration), opts);
  }

  if (eventsTriggers.length && eventsTriggers.includes('enter')) {
    el.addEventListener(
      'keydown',
      (ev: KeyboardEvent) => {
        if (ev.key === 'Enter') {
          createRipple(el, color, duration);
        }
      },
      opts,
    );
  }

  states.set(el, { controller });
}

export default {
  mounted(el: HTMLElement, binding: Ui3nRippleDirectiveBinding) {
    bindListeners(el, binding);
  },

  updated(el: HTMLElement, binding: Ui3nRippleDirectiveBinding) {
    bindListeners(el, binding);
  },

  beforeUnmount(el: HTMLElement) {
    states.get(el)?.controller.abort();
    states.delete(el);
  },
};
