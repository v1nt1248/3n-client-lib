import type { DirectiveBinding } from 'vue';
import { debounce } from 'lodash';

export type Ui3nResizeCbArg = {
  left: number;
  top: number;
  width: number;
  contentHeight: number;
  blockHeight: number;
};

let resizeObserver: ResizeObserver | null = null;

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const handler = typeof value === 'function' ? debounce(value, 250) : undefined;

    resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { contentRect, borderBoxSize, target } = entry;
        if (target === el && handler) {
          const { left, top, width, height } = contentRect;
          const { blockSize } = borderBoxSize[0];
          handler({
            left: Math.round(left),
            top: Math.round(top),
            width: Math.round(width),
            contentHeight: Math.round(height),
            blockHeight: Math.round(blockSize),
          });
        }
      }
    });

    resizeObserver.observe(el);
  },
  beforeUnmount() {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  },
};
