interface ScrollLockState {
  count: number;
  overscroll: string;
}

const locks = new Map<HTMLElement, ScrollLockState>();

function getVerticalScrollParent(element: HTMLElement | null): HTMLElement {
  if (!element) {
    return document.body;
  }

  let parent: HTMLElement | null = element.parentElement;

  while (parent && parent !== document.body && parent !== document.documentElement) {
    const style = window.getComputedStyle(parent);

    if (/(auto|scroll)/.test(style.overflowY || style.overflow)) {
      if (parent.scrollHeight > parent.clientHeight) {
        return parent;
      }
    }
    parent = parent.parentElement;
  }

  return document.body;
}

function isInsidePicker(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest('[data-ui3n="timepicker"], [data-ui3n="datepicker"]') !== null
  );
}

function preventScrollEvent(event: Event) {
  if (isInsidePicker(event.target)) {
    return;
  }

  event.preventDefault();
}

/**
 * Locks page scrolling for the closest scrollable ancestor of the element and
 * returns that ancestor. Locks are shared between instances, so nested panels
 * do not remove each other's listeners.
 */
export function lockScroll(element: HTMLElement | null): HTMLElement | null {
  const parent = getVerticalScrollParent(element);
  const state = locks.get(parent);

  if (state) {
    state.count += 1;
    return parent;
  }

  locks.set(parent, {
    count: 1,
    overscroll: parent.style.overscrollBehaviorY || '',
  });

  parent.style.overscrollBehaviorY = 'contain';
  parent.addEventListener('wheel', preventScrollEvent, { passive: false });
  parent.addEventListener('touchmove', preventScrollEvent, { passive: false });

  return parent;
}

/**
 * Releases a lock created by `lockScroll`. The listeners are removed only when
 * the last holder of the same scroll parent is unlocked.
 */
export function unlockScroll(parent: HTMLElement | null): void {
  if (!parent) {
    return;
  }

  const state = locks.get(parent);

  if (!state) {
    return;
  }

  state.count -= 1;

  if (state.count > 0) {
    return;
  }

  locks.delete(parent);

  if (state.overscroll) {
    parent.style.overscrollBehaviorY = state.overscroll;
  } else {
    parent.style.removeProperty('overscroll-behavior-y');
  }

  parent.removeEventListener('wheel', preventScrollEvent);
  parent.removeEventListener('touchmove', preventScrollEvent);
}
