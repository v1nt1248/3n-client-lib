/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type */
import { VNodeProps, AllowedComponentProps } from 'vue';

export type Nullable<T> = T | null;

export type Ui3nIconField = {
  icon: string;
  size?: string | number;
  color?: string;
};

export type ExtractComponentProps<TComponent> = TComponent extends new () => {
  $props: infer P;
}
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never;

export interface PrepareComponentEmits<ComponentsEventMap> {
  <K extends keyof ComponentsEventMap>(event: K, value?: ComponentsEventMap[K]): void;
}

export type ComponentsEmitsToMap<T> = T extends {
  (event: infer E1, ...args: infer A1): any;
  (event: infer E2, ...args: infer A2): any;
  (event: infer E3, ...args: infer A3): any;
  (event: infer E4, ...args: infer A4): any;
  (event: infer E5, ...args: infer A5): any;
  (event: infer E6, ...args: infer A6): any;
  (event: infer E7, ...args: infer A7): any;
  (event: infer E8, ...args: infer A8): any;
  (event: infer E9, ...args: infer A9): any;
  (event: infer E10, ...args: infer A10): any;
}
  ? (E1 extends string ? { [K in E1]: A1[0] } : {}) &
      (E2 extends string ? { [K in E2]: A2[0] } : {}) &
      (E3 extends string ? { [K in E3]: A3[0] } : {}) &
      (E4 extends string ? { [K in E4]: A4[0] } : {}) &
      (E5 extends string ? { [K in E5]: A5[0] } : {}) &
      (E6 extends string ? { [K in E6]: A6[0] } : {}) &
      (E7 extends string ? { [K in E7]: A7[0] } : {}) &
      (E8 extends string ? { [K in E8]: A8[0] } : {}) &
      (E9 extends string ? { [K in E9]: A9[0] } : {}) &
      (E10 extends string ? { [K in E10]: A10[0] } : {})
  : never;
