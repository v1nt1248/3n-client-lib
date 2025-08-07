import { VNodeProps, AllowedComponentProps } from 'vue';

export type ExtractComponentProps<TComponent> = TComponent extends new () => {
    $props: infer P;
  }
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never;

export type Nullable<T> = T | null;

export type Ui3nIconField = {
  icon: string;
  size?: string | number;
  color?: string;
};
