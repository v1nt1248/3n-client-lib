import { toValue } from 'vue';
import { MaybeComputedElementRef, MaybeElement, VueInstance, UnRefElementReturn } from '@/types';

export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = toValue(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}
