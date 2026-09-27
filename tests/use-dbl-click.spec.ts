import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDblClickHandler } from '../src/composables/useDblClickHandler';

describe('useDblClickHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires the single click after the delay', async () => {
    const onClick = vi.fn();
    const onDblClick = vi.fn();
    const { handleDblClick } = useDblClickHandler(onClick, onDblClick, 250);
    const event = {} as MouseEvent;

    handleDblClick(event);
    expect(onClick).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(250);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onDblClick).not.toHaveBeenCalled();
  });

  it('fires the double click when two calls come in quick succession', async () => {
    const onClick = vi.fn();
    const onDblClick = vi.fn();
    const { handleDblClick } = useDblClickHandler(onClick, onDblClick, 250);
    const event = {} as MouseEvent;

    handleDblClick(event);
    handleDblClick(event);

    await vi.advanceTimersByTimeAsync(250);
    expect(onDblClick).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('resets the counter after the delay', async () => {
    const onClick = vi.fn();
    const onDblClick = vi.fn();
    const { handleDblClick } = useDblClickHandler(onClick, onDblClick, 250);
    const event = {} as MouseEvent;

    handleDblClick(event);
    await vi.advanceTimersByTimeAsync(250);

    handleDblClick(event);
    await vi.advanceTimersByTimeAsync(250);

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onDblClick).not.toHaveBeenCalled();
  });
});
