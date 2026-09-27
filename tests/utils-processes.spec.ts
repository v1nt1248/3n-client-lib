import { afterEach, describe, expect, it, vi } from 'vitest';
import { sleep } from '../src/utils/processes/sleep';
import { defer } from '../src/utils/processes/deferred';
import { SingleProc, SingleCyclicProc } from '../src/utils/processes/single';
import { NamedProcs } from '../src/utils/processes/named-procs';
import { schedulerYield } from '../src/utils/processes/scheduler-yield';
import { TaskRunner } from '../src/utils/processes/task-runner';

describe('sleep', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves after the given delay', async () => {
    vi.useFakeTimers();
    let done = false;
    void sleep(500).then(() => {
      done = true;
    });

    await vi.advanceTimersByTimeAsync(499);
    expect(done).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(done).toBe(true);
  });
});

describe('defer', () => {
  it('resolves through its resolve handle', async () => {
    const d = defer<number>();
    d.resolve(42);

    await expect(d.promise).resolves.toBe(42);
  });

  it('rejects through its reject handle', async () => {
    const d = defer<number>();
    d.reject(new Error('boom'));

    await expect(d.promise).rejects.toThrow('boom');
  });
});

describe('SingleProc', () => {
  it('is idle before any action starts', () => {
    expect(new SingleProc().getP()).toBeUndefined();
  });

  it('runs an action and exposes it while in progress', async () => {
    const proc = new SingleProc();
    let release: () => void = () => {};
    const result = proc.start(() => new Promise<string>(resolve => (release = () => resolve('done'))));

    expect(proc.getP()).toBeDefined();
    release();
    await expect(result).resolves.toBe('done');
  });

  it('refuses to start twice concurrently', async () => {
    const proc = new SingleProc();
    let release: () => void = () => {};
    const running = proc.start(() => new Promise<void>(resolve => (release = resolve)));

    expect(() => proc.start(async () => 'x')).toThrow('Process is already in progress.');
    expect(() => proc.addStarted(Promise.resolve('x'))).toThrow('Process is already in progress.');

    release();
    await running;
  });

  it('becomes idle again once the action settles', async () => {
    const proc = new SingleProc();
    await proc.start(async () => 'done');

    await vi.waitFor(() => expect(proc.getP()).toBeUndefined());
  });

  it('chains actions in order with startOrChain', async () => {
    const proc = new SingleProc();
    const order: number[] = [];

    const first = proc.startOrChain(async () => {
      order.push(1);
      return 1;
    });
    const second = proc.startOrChain(async () => {
      order.push(2);
      return 2;
    });

    await expect(first).resolves.toBe(1);
    await expect(second).resolves.toBe(2);
    expect(order).toEqual([1, 2]);
  });

  it('accepts an already started promise through addStarted', async () => {
    const proc = new SingleProc();

    await expect(proc.addStarted(Promise.resolve('done'))).resolves.toBe('done');
  });
});

describe('NamedProcs', () => {
  it('returns undefined for an unknown id', () => {
    expect(new NamedProcs().getP('missing')).toBeUndefined();
  });

  it('runs an action under its id', async () => {
    const procs = new NamedProcs();

    await expect(procs.start('job', async () => 'done')).resolves.toBe('done');
  });

  it('refuses a duplicate id while it is running', async () => {
    const procs = new NamedProcs();
    let release: () => void = () => {};
    const running = procs.start('job', () => new Promise<void>(resolve => (release = resolve)));

    expect(() => procs.start('job', async () => 'x')).toThrow('Process with id "job" is already in progress.');

    release();
    await running;
  });

  it('chains actions sharing an id', async () => {
    const procs = new NamedProcs();
    const order: number[] = [];

    const first = procs.startOrChain('job', async () => {
      order.push(1);
      return 1;
    });
    const second = procs.startOrChain('job', async () => {
      order.push(2);
      return 2;
    });

    await expect(first).resolves.toBe(1);
    await expect(second).resolves.toBe(2);
    expect(order).toEqual([1, 2]);
  });

  it('forgets an id once its process settles', async () => {
    const procs = new NamedProcs();
    await procs.start('job', async () => 'done');

    await vi.waitFor(() => expect(procs.getP('job')).toBeUndefined());
  });
});

describe('SingleCyclicProc', () => {
  it('runs the action once and goes idle when the predicate is false', async () => {
    let runs = 0;
    const proc = new SingleCyclicProc(
      () => false,
      async () => {
        runs += 1;
      },
    );

    proc.startIfIdle();
    await vi.waitFor(() => expect(proc.isRunning()).toBe(false));
    expect(runs).toBe(1);
  });

  it('does not restart while already running', () => {
    const proc = new SingleCyclicProc(
      () => true,
      () => new Promise<void>(() => {}),
    );

    proc.startIfIdle();
    expect(proc.isRunning()).toBe(true);

    proc.startIfIdle();
    expect(proc.isRunning()).toBe(true);
  });

  it('closes an idle process without running anything', async () => {
    const proc = new SingleCyclicProc(
      () => true,
      async () => {},
    );

    await expect(proc.close()).resolves.toBeUndefined();
  });
});

describe('schedulerYield', () => {
  it('resolves to undefined', async () => {
    await expect(schedulerYield()).resolves.toBeUndefined();
  });
});

describe('TaskRunner', () => {
  it('runs every queued task', async () => {
    const runner = new TaskRunner(2);
    const executed: number[] = [];

    runner.addTask(async () => {
      executed.push(1);
    });
    runner.addTask(async () => {
      executed.push(2);
    });
    runner.addTask(async () => {
      executed.push(3);
    });

    await vi.waitFor(() => expect(executed).toEqual([1, 2, 3]));
  });

  it('cancels tasks that have not started yet', async () => {
    const runner = new TaskRunner(1);
    const executed: number[] = [];

    runner.addTask(async () => {
      executed.push(1);
    });
    runner.addTask(async () => {
      executed.push(2);
    });
    runner.addTask(async () => {
      executed.push(3);
    });
    runner.cancelTasks();

    await vi.waitFor(() => expect(executed).toEqual([1]));
  });
});
