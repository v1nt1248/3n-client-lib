import type { Task, TaskRunnerInstance } from '@/types';
import { schedulerYield } from './scheduler-yield';

export class TaskRunner implements TaskRunnerInstance {
  private readonly maxNumberOfRunners: number = 0;
  private arrayOfTasks = [] as Task[];
  private numberOfRunners = 0;

  constructor(maxNumberOfRunners?: number | undefined) {
    this.maxNumberOfRunners = maxNumberOfRunners || 3;
  }

  private async sequenceRunner(getTask: () => Task | undefined): Promise<void> {
    let task = getTask();

    if (task) {
      this.numberOfRunners += 1;
    }

    while (task) {
      await task();
      task = getTask();
      await schedulerYield();
    }

    this.numberOfRunners -= 1;
  }

  private nextTask(): Task | undefined {
    return this.arrayOfTasks.shift();
  }

  addTask(task: Task) {
    this.arrayOfTasks.push(task);

    if (this.numberOfRunners >= this.maxNumberOfRunners) {
      return;
    }

    this.sequenceRunner(this.nextTask.bind(this));
  }

  cancelTasks() {
    this.arrayOfTasks = [] as Task[];
  }
}
