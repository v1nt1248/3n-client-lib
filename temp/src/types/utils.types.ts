export type Task = () => Promise<void>;

export interface TaskRunnerInstance {
  addTask: (task: Task) => void;
  cancelTasks: () => void;
}
