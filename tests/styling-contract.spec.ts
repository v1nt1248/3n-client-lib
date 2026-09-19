import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * These tests guard the styling contract described in docs/guide/styling.md:
 * a component keeps its measurements in variables of its own, reads each
 * public one with a fixed default, and marks its root with data-ui3n.
 */

const COMPONENTS_DIR = join(__dirname, '..', 'src', 'components');

/* the root of these is another component or a transition, so no data-ui3n of their own */
const WITHOUT_ROOT_HOOK = ['ui3n-table-sort-icon.vue', 'ui3n-virtual-scroll.vue'];

/* library-wide variables, declared in variables.css rather than by a component */
const GLOBAL_VARIABLES = ['--ui3n-font-family'];

function componentFiles(): string[] {
  const files: string[] = [];

  for (const dir of readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) {
      continue;
    }

    for (const entry of readdirSync(join(COMPONENTS_DIR, dir.name))) {
      if (entry.endsWith('.vue')) {
        files.push(join(COMPONENTS_DIR, dir.name, entry));
      }
    }
  }

  return files;
}

function styleBlock(source: string): string {
  const start = source.indexOf('<style');
  if (start === -1) {
    return '';
  }

  /* commented-out rules say nothing about the contract */
  return source
    .slice(start)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

const components = componentFiles().map(path => ({
  name: path.split('/').slice(-1)[0],
  path,
  source: readFileSync(path, 'utf8'),
}));

describe('component styles', () => {
  it('has components to check', () => {
    expect(components.length).toBeGreaterThan(30);
  });

  it.each(components)('$name keeps layout tokens out of its styles', ({ source }) => {
    const style = styleBlock(source);

    expect(style).not.toMatch(/var\(--spacing-/);
    expect(style).not.toMatch(/var\(--font-\d/);
  });

  it.each(components)('$name gives every public variable a default', ({ source }) => {
    const style = styleBlock(source);

    /* a public variable read without a fallback would resolve to nothing */
    const withoutDefault = [...style.matchAll(/var\((--ui3n-[a-z0-9-]+)\s*\)/g)].map(m => m[1]);

    expect(withoutDefault.filter(name => !GLOBAL_VARIABLES.includes(name))).toEqual([]);
  });

  it.each(components)('$name declares no public variable of its own', ({ source }) => {
    const style = styleBlock(source);

    /*
     * Declaring it on the root is what stopped applications from setting it.
     * Inside var() the name is followed by a comma or a bracket, never a colon,
     * so a colon here always means a declaration.
     */
    expect([...style.matchAll(/(--ui3n-[a-z0-9-]+)\s*:/g)].map(m => m[1])).toEqual([]);
  });

  it.each(components)('$name resolves every private variable it uses', ({ source }) => {
    const style = styleBlock(source);

    const used = new Set([...style.matchAll(/var\((--_[a-z0-9-]+)/g)].map(m => m[1]));
    const declared = new Set([...style.matchAll(/(--_[a-z0-9-]+)\s*:/g)].map(m => m[1]));

    expect([...used].filter(name => !declared.has(name))).toEqual([]);
  });
});

describe('component markup', () => {
  const withHook = components.filter(c => !WITHOUT_ROOT_HOOK.includes(c.name));

  it.each(withHook)('$name marks its root with data-ui3n', ({ source }) => {
    expect(source).toMatch(/data-ui3n="[a-z][a-z-]*"/);
  });
});
