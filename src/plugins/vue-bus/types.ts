export type CbFunction<T> = (arg: T) => void;

export interface VueEventBus<T extends object> {
  on: <Ev extends keyof T>(type: Ev, handler: CbFunction<T[Ev]>) => void;
  off: <Ev extends keyof T>(type: Ev, handler?: CbFunction<T[Ev]>) => void;
  emit: <Ev extends keyof T>(type: Ev, arg: T[Ev]) => void;
  once: <Ev extends keyof T>(type: Ev, handler: CbFunction<T[Ev]>) => void;
  clear: () => void;
}

export interface VueBusPlugin<T extends object> {
  $emitter: VueEventBus<T>;
}
