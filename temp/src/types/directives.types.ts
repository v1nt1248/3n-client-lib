import type { ComponentPublicInstance, MaybeRef, MaybeRefOrGetter } from 'vue';

export type Fn = () => void;
export type VueInstance = ComponentPublicInstance;
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>;
export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance
  ? Exclude<MaybeElement, VueInstance>
  : T | undefined;
