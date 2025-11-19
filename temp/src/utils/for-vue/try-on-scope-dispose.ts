import { getCurrentScope, onScopeDispose } from 'vue';
import type { Fn } from '@/types';

export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
