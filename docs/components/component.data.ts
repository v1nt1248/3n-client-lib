import { createChecker, type ComponentMetaChecker } from 'vue-component-meta';
import { resolve, basename } from 'node:path';

let globalChecker: ComponentMetaChecker | null = null;

function getChecker(): ComponentMetaChecker {
  if (!globalChecker) {
    const tsconfigPath = resolve(__dirname, '../../tsconfig.json');
    globalChecker = createChecker(tsconfigPath, {
      schema: true,
    });
  }
  return globalChecker;
}

export default {
  watch: ['../../src/components/**/*.vue'],
  load(watchedFiles: string[]) {
    if (!createChecker) {
      console.log('Available in module:', createChecker);
      throw new Error('Still could not find createChecker');
    }

    const checker = getChecker();

    const result = watchedFiles
      .map(file => {
        const meta = checker.getComponentMeta(file);
        return {
          name: basename(file, '.vue'),
          props: meta.props
            .filter(p => !p.global)
            .map(p => ({
              name: p.name,
              description: p.description,
              type: p.type,
              default: p.default,
              required: p.required,
            })),
          slots: meta.slots.map(s => ({
            name: s.name,
            props: s.type,
            description: s.description,
          })),
          events: meta.events.map(e => ({
            name: e.name,
            value: e.type,
            description: e.description,
            signature: e.signature,
          })),
          exposes: meta.exposed.map(ex => ({
            name: ex.name,
            props: ex.type,
            description: ex.description,
          })),
        };
      })
      .filter(Boolean);

    if (process.env.NODE_ENV === 'production' || process.env.VITE_USER_NODE_ENV === 'production') {
      if (typeof checker.clearCache === 'function') {
        checker.clearCache();
      }

      globalChecker = null;
    }

    return result;
  },
};
