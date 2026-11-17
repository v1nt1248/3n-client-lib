import { defineComponent, h, nextTick, ref, withDirectives } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import clickOutside from '../src/directives/ui3n-click-outside';
import longPress from '../src/directives/ui3n-long-press';
import ui3nHtml from '../src/directives/ui3n-html';
import ripple from '../src/directives/ui3n-ripple';
import resize from '../src/directives/ui3n-resize';
import title from '../src/directives/ui3n-title';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 0 }),
  autoUpdate: vi.fn().mockReturnValue(() => {}),
  offset: vi.fn().mockReturnValue({}),
}));

function mountWithDirective(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  directive: any,
  value: unknown,
  arg?: string,
  modifiers?: Record<string, boolean>,
  tag = 'div',
) {
  return mount(
    defineComponent({
      setup() {
        return () => withDirectives(h(tag, { id: 'target' }), [[directive, value, arg, modifiers]]);
      },
    }),
  );
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('ui3n-click-outside', () => {
  it('calls the handler for a click outside the element', () => {
    const handler = vi.fn();
    mountWithDirective(clickOutside, handler);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does nothing for a click inside the element', () => {
    const handler = vi.fn();
    const wrapper = mountWithDirective(clickOutside, handler);

    wrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('rejects a value that is not a function', () => {
    const el = document.createElement('div');

    expect(() => clickOutside.beforeMount(el, { value: 'nope' } as never)).toThrow();
  });
});

describe('ui3n-long-press', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('fires the handler after the delay', async () => {
    const handler = vi.fn();
    const wrapper = mountWithDirective(longPress, { handler, delay: 500 });

    wrapper.element.dispatchEvent(new MouseEvent('pointerdown', { clientX: 0, clientY: 0, bubbles: true }));
    expect(handler).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(500);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('cancels on pointer up and reports it', async () => {
    const handler = vi.fn();
    const onMouseUpCb = vi.fn();
    const wrapper = mountWithDirective(longPress, { handler, delay: 500, onMouseUpCb });

    wrapper.element.dispatchEvent(new MouseEvent('pointerdown', { clientX: 0, clientY: 0, bubbles: true }));
    wrapper.element.dispatchEvent(new MouseEvent('pointerup', { clientX: 0, clientY: 0, bubbles: true }));

    await vi.advanceTimersByTimeAsync(500);
    expect(handler).not.toHaveBeenCalled();
    expect(onMouseUpCb).toHaveBeenCalledTimes(1);
  });

  it('cancels when the pointer moves past the threshold', async () => {
    const handler = vi.fn();
    const wrapper = mountWithDirective(longPress, { handler, delay: 500, distanceThreshold: 10 });

    wrapper.element.dispatchEvent(new MouseEvent('pointerdown', { clientX: 0, clientY: 0, bubbles: true }));
    wrapper.element.dispatchEvent(new MouseEvent('pointermove', { clientX: 100, clientY: 100, bubbles: true }));

    await vi.advanceTimersByTimeAsync(500);
    expect(handler).not.toHaveBeenCalled();
  });
});

describe('ui3n-html', () => {
  it('inserts a string as-is without sanitize', () => {
    const el = document.createElement('div');

    ui3nHtml(el, { value: '<b>hi</b>' } as never);

    expect(el.innerHTML).toBe('<b>hi</b>');
  });

  it('sanitizes when the argument asks for it', () => {
    const el = document.createElement('div');

    ui3nHtml(el, { arg: 'sanitize', value: '<img src="x" onerror="alert(1)"><b>ok</b>' } as never);

    expect(el.innerHTML).toContain('<b>ok</b>');
    expect(el.innerHTML).not.toContain('onerror');
  });

  it('rejects a non-string value without sanitize', () => {
    const el = document.createElement('div');

    expect(() => ui3nHtml(el, { value: 123 } as never)).toThrow();
  });
});

describe('ui3n-ripple', () => {
  it('adds a ripple on click', () => {
    const wrapper = mountWithDirective(ripple, {});

    wrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(wrapper.element.querySelector('.ui3n-ripple')).not.toBeNull();
  });

  it('adds a ripple on Enter when only the enter trigger is set', () => {
    const wrapper = mountWithDirective(ripple, { eventsTriggers: ['enter'] });

    wrapper.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(wrapper.element.querySelector('.ui3n-ripple')).not.toBeNull();
  });

  it('does nothing while disabled', () => {
    const wrapper = mountWithDirective(ripple, { disabled: true });

    wrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(wrapper.element.querySelector('.ui3n-ripple')).toBeNull();
  });
});

describe('ui3n-resize', () => {
  interface MockResizeObserver {
    cb: ResizeObserverCallback;
    targets: Set<Element>;
    disconnected: boolean;
  }

  let observers: MockResizeObserver[] = [];

  beforeEach(() => {
    observers = [];
    vi.useFakeTimers();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        cb: ResizeObserverCallback;
        targets = new Set<Element>();
        disconnected = false;

        constructor(cb: ResizeObserverCallback) {
          this.cb = cb;
          observers.push(this);
        }

        observe(el: Element) {
          this.targets.add(el);
        }

        unobserve(el: Element) {
          this.targets.delete(el);
        }

        disconnect() {
          this.disconnected = true;
          this.targets.clear();
        }
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function makeEntry(
    target: Element,
    width: number,
    height = 10,
    borderBoxSize: unknown = [{ blockSize: height }],
  ): Partial<ResizeObserverEntry> {
    return {
      target,
      contentRect: { left: 0, top: 0, width, height },
      borderBoxSize,
    } as unknown as Partial<ResizeObserverEntry>;
  }

  function emit(observer: MockResizeObserver, entries: Partial<ResizeObserverEntry>[]) {
    observer.cb(entries as unknown as ResizeObserverEntry[], observer as unknown as ResizeObserver);
  }

  function findObserver(el: Element): MockResizeObserver | undefined {
    return observers.find(observer => observer.targets.has(el));
  }

  it('reports rounded geometry from the observer entry', async () => {
    const handler = vi.fn();
    const wrapper = mountWithDirective(resize, handler);

    emit(findObserver(wrapper.element)!, [
      {
        target: wrapper.element,
        contentRect: { left: 1, top: 2, width: 3, height: 4 },
        borderBoxSize: [{ blockSize: 5 }],
      } as unknown as Partial<ResizeObserverEntry>,
    ]);

    await vi.advanceTimersByTimeAsync(250);
    expect(handler).toHaveBeenCalledWith({ left: 1, top: 2, width: 3, contentHeight: 4, blockHeight: 5 });
  });

  it('observes every element with its own observer', async () => {
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h('div', [
              withDirectives(h('div', { id: 'first' }), [[resize, firstHandler]]),
              withDirectives(h('div', { id: 'second' }), [[resize, secondHandler]]),
            ]);
        },
      }),
    );

    const first = wrapper.find('#first').element;
    const second = wrapper.find('#second').element;
    const firstObserver = findObserver(first);
    const secondObserver = findObserver(second);

    expect(observers).toHaveLength(2);
    expect(firstObserver).toBeDefined();
    expect(secondObserver).toBeDefined();
    expect(firstObserver).not.toBe(secondObserver);

    emit(firstObserver!, [makeEntry(first, 3)]);
    await vi.advanceTimersByTimeAsync(250);

    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).not.toHaveBeenCalled();
  });

  it('keeps the other elements alive when one is unmounted', async () => {
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const showFirst = ref(true);

    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h('div', [
              showFirst.value
                ? withDirectives(h('div', { id: 'first' }), [[resize, firstHandler]])
                : null,
              withDirectives(h('div', { id: 'second' }), [[resize, secondHandler]]),
            ]);
        },
      }),
    );

    const first = wrapper.find('#first').element;
    const second = wrapper.find('#second').element;
    const firstObserver = findObserver(first)!;
    const secondObserver = findObserver(second)!;

    showFirst.value = false;
    await nextTick();

    expect(firstObserver.disconnected).toBe(true);
    expect(secondObserver.disconnected).toBe(false);
    expect(secondObserver.targets.has(second)).toBe(true);

    emit(secondObserver, [makeEntry(second, 4)]);
    await vi.advanceTimersByTimeAsync(250);

    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledWith({
      left: 0,
      top: 0,
      width: 4,
      contentHeight: 10,
      blockHeight: 10,
    });
    expect(firstHandler).not.toHaveBeenCalled();
  });

  it('cancels a pending call on unmount', async () => {
    const handler = vi.fn();
    const wrapper = mountWithDirective(resize, handler);

    emit(findObserver(wrapper.element)!, [makeEntry(wrapper.element, 5)]);
    wrapper.unmount();
    await vi.advanceTimersByTimeAsync(250);

    expect(handler).not.toHaveBeenCalled();
  });

  it('uses the callback from the latest binding update', async () => {
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const handler = ref(firstHandler);

    const wrapper = mount(
      defineComponent({
        setup() {
          return () => withDirectives(h('div'), [[resize, handler.value]]);
        },
      }),
    );

    handler.value = secondHandler;
    await nextTick();

    emit(findObserver(wrapper.element)!, [makeEntry(wrapper.element, 6)]);
    await vi.advanceTimersByTimeAsync(250);

    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(firstHandler).not.toHaveBeenCalled();
  });

  it('falls back when borderBoxSize is a single object or missing', async () => {
    const handler = vi.fn();
    const wrapper = mountWithDirective(resize, handler);
    const observer = findObserver(wrapper.element)!;

    emit(observer, [
      {
        target: wrapper.element,
        contentRect: { left: 0, top: 0, width: 10, height: 8 },
        borderBoxSize: { blockSize: 7 },
      } as unknown as Partial<ResizeObserverEntry>,
    ]);
    await vi.advanceTimersByTimeAsync(250);

    expect(handler).toHaveBeenLastCalledWith({
      left: 0,
      top: 0,
      width: 10,
      contentHeight: 8,
      blockHeight: 7,
    });

    emit(observer, [
      {
        target: wrapper.element,
        contentRect: { left: 0, top: 0, width: 10, height: 8 },
      } as unknown as Partial<ResizeObserverEntry>,
    ]);
    await vi.advanceTimersByTimeAsync(250);

    expect(handler).toHaveBeenLastCalledWith({
      left: 0,
      top: 0,
      width: 10,
      contentHeight: 8,
      blockHeight: 8,
    });
  });

  it('does nothing when ResizeObserver is not available', () => {
    vi.stubGlobal('ResizeObserver', undefined);

    expect(() => mountWithDirective(resize, vi.fn())).not.toThrow();
    expect(observers).toHaveLength(0);
  });

  it('rejects a value that is not a function', () => {
    const el = document.createElement('div');

    expect(() => resize.mounted(el, { value: 'nope' } as never)).toThrow('[v-ui3n-resize]');
  });
});

describe('ui3n-title', () => {
  it('opens on hover and closes on leave', async () => {
    const wrapper = mountWithDirective(title, { text: 'tip' });

    wrapper.element.dispatchEvent(new MouseEvent('mouseenter'));
    await nextTick();
    expect(document.querySelector('.ui3n-title')).not.toBeNull();

    wrapper.element.dispatchEvent(new MouseEvent('mouseleave'));
    expect(document.querySelector('.ui3n-title')).toBeNull();
  });

  it('toggles on click when the click trigger is used', async () => {
    const wrapper = mountWithDirective(title, { text: 'tip', trigger: 'click' });

    wrapper.element.dispatchEvent(new MouseEvent('click'));
    await nextTick();
    expect(document.querySelector('.ui3n-title')).not.toBeNull();

    wrapper.element.dispatchEvent(new MouseEvent('click'));
    expect(document.querySelector('.ui3n-title')).toBeNull();
  });

  it('does not open while disabled', async () => {
    const wrapper = mountWithDirective(title, { text: 'tip', disabled: true });

    wrapper.element.dispatchEvent(new MouseEvent('mouseenter'));
    await nextTick();
    expect(document.querySelector('.ui3n-title')).toBeNull();
  });
});
