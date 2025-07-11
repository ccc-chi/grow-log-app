export type TaskFormInput = {
  title: string;
  content: string;
  targetTime: string;
  start: Date;
  end: Date;
};
export type TaskWithLogs = {
  start: Date;
  end: Date;
  name: string;
  id: string;
  type: string;
  progress: number;
  isDisabled: boolean;
  styles: {
    progressColor?: string;
    progressSelectedColor?: string;
  };
  content?: string;
  logs?: {
    id: string;
    date: string;
    totalTime: string;
    memo: string;
  }[];
};

//-- 保存・通信用に「文字列化」するタスク
export type TaskWithLogsSerialized = Omit<TaskWithLogs, "start" | "end"> & {
  start: string;
  end: string;
};

// localstorageに保存するための型
export const serializeTask = (task: TaskWithLogs): TaskWithLogsSerialized => ({
  ...task,
  start: task.start.toISOString(),
  end: task.end.toISOString(),
});

// localstorageから読み込むための型
export const deserializeTask = (
  task: TaskWithLogsSerialized
): TaskWithLogs => ({
  ...task,
  start: new Date(task.start),
  end: new Date(task.end),
});