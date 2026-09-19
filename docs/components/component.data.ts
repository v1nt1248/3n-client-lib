import { createChecker, type ComponentMetaChecker } from 'vue-component-meta';
import { resolve, basename } from 'node:path';
import { readFileSync } from 'node:fs';

/**
 * A component's public CSS variables are read, never declared, so they cannot
 * be found in its types. Collect them from the style block instead: each is a
 * `var(--ui3n-*, <default>)`, and the default is what the component shows when
 * nothing sets the variable.
 */
function cssVariablesOf(file: string): Array<{ name: string; default: string }> {
  const source = readFileSync(file, 'utf8');
  const at = source.indexOf('<style');
  if (at === -1) {
    return [];
  }

  const style = source
    .slice(at)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');

  const found = new Map<string, string>();
  for (const match of style.matchAll(/var\((--ui3n-[a-z0-9-]+)\s*,/g)) {
    const name = match[1];
    if (found.has(name)) {
      continue;
    }

    /* walk to the matching bracket, since a default may itself be a var() or a calc() */
    let depth = 1;
    let i = match.index! + match[0].length;
    while (i < style.length && depth > 0) {
      if (style[i] === '(') {
        depth += 1;
      } else if (style[i] === ')') {
        depth -= 1;
      }
      i += 1;
    }

    found.set(name, style.slice(match.index! + match[0].length, i - 1).trim().replace(/\s+/g, ' '));
  }

  return [...found].sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => ({
    name,
    default: value,
  }));
}

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
          cssVariables: cssVariablesOf(file),
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
