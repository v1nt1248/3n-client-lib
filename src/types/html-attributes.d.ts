/**
 * Every ui3n component marks its root element with `data-ui3n`, a stable hook
 * an application can aim a selector at, since the class names are hashed by
 * CSS modules. Vue's strict template checking needs to be told about it.
 */
declare module 'vue' {
  interface HTMLAttributes {
    'data-ui3n'?: string;
  }

  interface ButtonHTMLAttributes {
    'data-ui3n'?: string;
  }
}

export {};
