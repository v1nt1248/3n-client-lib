import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { round } from '../src/utils/round';
import { getRandomId } from '../src/utils/get-random-id';
import { debounce } from '../src/utils/debounce';
import { executeFunc } from '../src/utils/execute-function';
import { copyToClipboard } from '../src/utils/copy-to-clipboard';
import { getDeliveryErrors } from '../src/utils/for-web3n';

describe('round', () => {
  it('rounds to the given number of decimal places', () => {
    expect(round(1.005, -2)).toBe(1.01);
    expect(round(123.456, -1)).toBe(123.5);
  });

  it('rounds half up', () => {
    expect(round(2.675, -2)).toBe(2.68);
    expect(round(2.665, -2)).toBe(2.67);
  });

  it('treats a positive precision as a power of ten', () => {
    expect(round(1.005, 2)).toBe(0);
    expect(round(123.456, 1)).toBe(120);
  });

  it('keeps zero', () => {
    expect(round(0, -2)).toBe(0);
  });
});

describe('getRandomId', () => {
  it('returns a string of the requested length', () => {
    expect(getRandomId(6)).toHaveLength(6);
    expect(getRandomId(12)).toHaveLength(12);
  });

  it('uses only alphanumeric characters', () => {
    expect(getRandomId(32)).toMatch(/^[A-Za-z0-9]{32}$/);
  });

  it('refuses a non-positive length', () => {
    expect(() => getRandomId(0)).toThrow('number of chars is less than one');
    expect(() => getRandomId(-1)).toThrow();
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls once after the delay, ignoring the extra calls', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls immediately and then not again with immediate option', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, { immediate: true });

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('drops the pending call on cancel', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();

    await vi.advanceTimersByTimeAsync(200);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('executeFunc', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the result and runs the success hooks', async () => {
    const onSuccess = vi.fn();
    const onFinally = vi.fn();

    const result = await executeFunc({
      fn: async () => 'ok',
      fnArgs: [],
      actionIfSuccess: onSuccess,
      actionInFinally: onFinally,
    });

    expect(result).toBe('ok');
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFinally).toHaveBeenCalledTimes(1);
  });

  it('retries until the function succeeds', async () => {
    let calls = 0;
    const fn = async () => {
      calls += 1;
      if (calls < 3) {
        throw new Error('not yet');
      }
      return 'ok';
    };

    await expect(executeFunc({ fn, fnArgs: [], retryCount: 2, retryDelay: 0 })).resolves.toBe('ok');
    expect(calls).toBe(3);
  });

  it('throws and reports the error when it cannot recover', async () => {
    const onError = vi.fn();
    const onFinally = vi.fn();

    await expect(
      executeFunc({
        fn: async () => {
          throw new Error('boom');
        },
        fnArgs: [],
        actionIfError: onError,
        actionInFinally: onFinally,
      }),
    ).rejects.toThrow('An error occurred while executing the function.');

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onFinally).toHaveBeenCalledTimes(1);
  });

  it('returns the default value when the error must not propagate', async () => {
    const result = await executeFunc({
      fn: async () => {
        throw new Error('boom');
      },
      fnArgs: [],
      doesErrorPropagateStop: true,
      defaultValue: 'fallback',
    });

    expect(result).toBe('fallback');
  });

  it('passes an abort signal when asked', async () => {
    const result = await executeFunc({
      fn: async (signal: AbortSignal) => signal instanceof AbortSignal,
      fnArgs: [],
      passSignal: true,
    });

    expect(result).toBe(true);
  });

  it('times out a function that never settles', async () => {
    await expect(
      executeFunc({
        fn: () => new Promise(() => {}),
        fnArgs: [],
        timeoutValue: 10,
      }),
    ).rejects.toThrow('timed out');
  });

  it('maps an abort error to a readable message', async () => {
    const abortError = new Error('cancelled');
    abortError.name = 'CanceledError';

    await expect(
      executeFunc({
        fn: async () => {
          throw abortError;
        },
        fnArgs: [],
      }),
    ).rejects.toThrow('Operation aborted');
  });
});

describe('copyToClipboard', () => {
  const writeText = vi.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('writes the text to the clipboard', async () => {
    writeText.mockResolvedValue(undefined);

    await copyToClipboard('hello');
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('swallows a clipboard rejection', async () => {
    writeText.mockRejectedValue(new Error('denied'));

    await expect(copyToClipboard('hello')).resolves.toBeUndefined();
  });
});

describe('getDeliveryErrors', () => {
  it('keeps only recipients with a runtime exception', () => {
    const progress = {
      recipients: {
        good: {},
        emptyErr: { err: {} },
        bad: { err: { runtimeException: true, type: 'deliveryFailure' } },
      },
    };

    expect(getDeliveryErrors(progress as never)).toEqual({ bad: 'deliveryFailure' });
  });

  it('returns an empty object when nobody failed', () => {
    expect(getDeliveryErrors({ recipients: { good: {} } } as never)).toEqual({});
  });
});
