import { Comment, Text, VNode } from 'vue';

/**
 * A slot is typed as returning a single VNode (e.g. via defineSlots) or an
 * array of them (Vue's own Slot type); both shapes are accepted here.
 */
type ContentSlot = (...args: unknown[]) => VNode | VNode[];

export function hasSlotContent(slot?: ContentSlot, slotProps: Record<string, unknown> = {}): boolean {
  if (!slot) {
    return false;
  }

  const nodes = slot(slotProps);
  const vnodes = Array.isArray(nodes) ? nodes : [nodes];

  return vnodes.some((vnode: VNode) => {
    if (vnode.type === Comment) {
      return false;
    }

    if (Array.isArray(vnode.children) && !vnode.children.length) {
      return false;
    }

    return vnode.type !== Text || (typeof vnode.children === 'string' && vnode.children.trim() !== '');
  });
}
