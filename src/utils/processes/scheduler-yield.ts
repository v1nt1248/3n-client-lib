export function schedulerYield() {
// @ts-ignore
  if ('scheduler' in window && 'yield' in scheduler) {
    // @ts-ignore
    return scheduler.yield();
  }

  {
    return new Promise((resolve => {
      setTimeout(resolve, 0);
    }));
  }
}
