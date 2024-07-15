import type { DirectiveBinding } from 'vue';

type ClickOutside = (event: MouseEvent) => void;

interface ExtendedHTMLElement extends HTMLElement {
  clickOutside: ClickOutside;
}

function clickOutside(this: ExtendedHTMLElement, binding: DirectiveBinding<Function>): ClickOutside {
  return (event: MouseEvent) => {
    if (event.target instanceof Element) {
      if (!(this === event.target || this.contains(event.target))) {
        binding.value(event);
      }
    }
  };
}

export default {
  beforeMount(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    const isDirectiveValueFunction = binding?.value?.constructor.name === 'Function';
    if (!isDirectiveValueFunction) {
      throw Error('[v-ui3n-click-outside] Function should be provided in the directive');
    }

    el.clickOutside = clickOutside.bind(el)(binding);
    window.addEventListener('click', el.clickOutside);
  },
  beforeUnmount(el: ExtendedHTMLElement) {
    window.removeEventListener('click', el.clickOutside);
  },
};
