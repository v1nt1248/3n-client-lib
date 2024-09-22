import type { DirectiveBinding } from 'vue';

export interface Ui3nRippleDirectiveProps {
  color?: string;
  duration?: number;
  eventsTriggers?: Array<'click' | 'enter'>;
  disabled?: boolean;
}

export type Ui3nRippleDirectiveBinding = DirectiveBinding<Ui3nRippleDirectiveProps>;

const controllers: Record<string, AbortController> = {};
let colorValue = '';

function createRipple({ el, duration }: { el: HTMLElement; duration?: number }) {
  const circle = document.createElement('div');
  const diameter = Math.max(el.clientWidth, el.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${Math.round(el.clientWidth / 2 - radius)}px`;
  circle.style.top = `${Math.round(el.clientHeight / 2 - radius)}px`;
  circle.classList.add('ui3n-ripple');
  colorValue && circle.style.setProperty('--ui3n-ripple-bg-color', colorValue);
  duration && circle.style.setProperty('--ui3n-ripple-duration', `${duration}ms`);

  const ripple = el.getElementsByClassName('ui3n-ripple')[0];
  if (ripple) ripple.remove();
  el.appendChild(circle);
}

function addEventListener({
  eventName,
  el,
  duration,
}: {
  eventName: string;
  el: HTMLElement;
  color?: string;
  duration?: number;
}) {
  if (!['click', 'keydown'].includes(eventName)) return;

  controllers[eventName] = new AbortController();
  // @ts-ignore
  el.addEventListener(
    eventName,
    function () {
      createRipple({ el, duration });
    },
    { signal: controllers[eventName].signal } as AddEventListenerOptions,
  );
}

export default {
  mounted(el: HTMLElement, binding: Ui3nRippleDirectiveBinding) {
    const { color, duration, eventsTriggers = [], disabled = false } = binding.value || {};
    colorValue = color || '';

    if (disabled) return;

    if (!eventsTriggers.length || (eventsTriggers.length && eventsTriggers.includes('click'))) {
      addEventListener({
        eventName: 'click',
        el,
        duration,
      });
    }

    if (eventsTriggers.length && eventsTriggers.includes('enter')) {
      addEventListener({
        eventName: 'keydown',
        el,
        duration,
      });
    }
  },

  beforeUnmount() {
    Object.keys(controllers).forEach(key => {
      controllers[key].abort();
    });
  },
};
