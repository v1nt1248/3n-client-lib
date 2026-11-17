import IMask from 'imask';

/**
 * IMask entry point used by the library. The full entry keeps the dependency
 * externalized by the current Vite config; subpath imports would be bundled
 * unless `vite.config.ts` also externalizes `imask/*`.
 */
export { IMask };
export type { FactoryArg, InputMask } from 'imask';
