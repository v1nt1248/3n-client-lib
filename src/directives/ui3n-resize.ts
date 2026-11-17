import type { DirectiveBinding } from 'vue';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

export type Ui3nResizeCbArg = {
  left: number;
  top: number;
  width: number;
  contentHeight: number;
  blockHeight: number;
};

type Ui3nResizeHandler = (arg: Ui3nResizeCbArg) => void;

interface ResizeState {
  callback: Ui3nResizeHandler;
  debounced: DebouncedFunc<(arg: Ui3nResizeCbArg) => void>;
  observer: ResizeObserver | null;
}

const DEBOUNCE_DELAY = 250;
const states = new WeakMap<HTMLElement, ResizeState>();

/**
 * Converts a ResizeObserver entry into the payload passed to the directive handler.
 * Falls back to the content height when the browser does not expose `borderBoxSize`.
 *
 * @param entry - a ResizeObserver entry of the observed element
 * @returns rounded geometry in pixels
 */
function toCbArg(entry: ResizeObserverEntry): Ui3nResizeCbArg {
  const { left, top, width, height } = entry.contentRect;
  const borderBox = entry.borderBoxSize as unknown as
    | ResizeObserverSize
    | readonly ResizeObserverSize[]
    | undefined;
  const size = Array.isArray(borderBox) ? borderBox[0] : borderBox;

  return {
    left: Math.round(left),
    top: Math.round(top),
    width: Math.round(width),
    contentHeight: Math.round(height),
    blockHeight: Math.round(size?.blockSize ?? height),
  };
}

/**
 * Reports the observed element geometry to the directive value.
 * Every element gets its own ResizeObserver and debounce timer, so any number
 * of directive instances on a page are independent of each other.
 */
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<Ui3nResizeHandler>) {
    if (typeof binding.value !== 'function') {
      throw Error('[v-ui3n-resize] A function should be provided as the directive value');
    }

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const state: ResizeState = {
      callback: binding.value,
      debounced: debounce((arg: Ui3nResizeCbArg) => state.callback(arg), DEBOUNCE_DELAY),
      observer: null,
    };

    state.observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === el) {
          state.debounced(toCbArg(entry));
        }
      }
    });

    state.observer.observe(el);
    states.set(el, state);
  },

  updated(el: HTMLElement, binding: DirectiveBinding<Ui3nResizeHandler>) {
    const state = states.get(el);
    if (!state || typeof binding.value !== 'function') {
      return;
    }

    state.callback = binding.value;
  },

  beforeUnmount(el: HTMLElement) {
    const state = states.get(el);
    if (!state) {
      return;
    }

    state.debounced.cancel();
    state.observer?.disconnect();
    state.observer = null;
    states.delete(el);
  },
};
