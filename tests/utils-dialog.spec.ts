import { describe, expect, it } from 'vitest';
import { determineWindowWidth } from '../src/components/ui3n-dialog/util';
import { isAbsoluteCssSize } from '../src/components/ui3n-table/composables/useTable';

describe('determineWindowWidth', () => {
  it('turns a numeric width into pixels', () => {
    expect(determineWindowWidth({ width: 500 })).toBe('500px');
    expect(determineWindowWidth({ width: '500' })).toBe('500px');
  });

  it('keeps a non-numeric width as-is', () => {
    expect(determineWindowWidth({ width: '50%' })).toBe('50%');
    expect(determineWindowWidth({ width: '20rem' })).toBe('20rem');
  });

  it('falls back to the style width', () => {
    expect(determineWindowWidth({ style: { width: '30rem' } })).toBe('30rem');
  });

  it('falls back to the default width', () => {
    expect(determineWindowWidth({})).toBe('380px');
    expect(determineWindowWidth({ defaultValue: 640 })).toBe('640px');
  });

  it('prefers the width prop over the style', () => {
    expect(determineWindowWidth({ width: 320, style: { width: '30rem' } })).toBe('320px');
  });
});

describe('isAbsoluteCssSize', () => {
  it('accepts absolute lengths', () => {
    expect(isAbsoluteCssSize('100px')).toBe(true);
    expect(isAbsoluteCssSize('2.5rem')).toBe(true);
    expect(isAbsoluteCssSize('-10px')).toBe(true);
    expect(isAbsoluteCssSize(' 12pt ')).toBe(true);
  });

  it('rejects relative or unitless values', () => {
    expect(isAbsoluteCssSize('1fr')).toBe(false);
    expect(isAbsoluteCssSize('auto')).toBe(false);
    expect(isAbsoluteCssSize('100')).toBe(false);
    expect(isAbsoluteCssSize('')).toBe(false);
  });
});
