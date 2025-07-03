export type TaskFormInput = {
  title: string;
  content: string;
  targetTime: string;
  start: Date;
  end: Date;
};
export type GanttTask = {
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
};

//-- 保存・通信用に「文字列化」するタスク
export type GanttTaskSerialized = Omit<GanttTask, "start" | "end"> & {
  start: string;
  end: string;
};

// localstorageに保存するための型
export const serializeTask = (task: GanttTask): GanttTaskSerialized => ({
  ...task,
  start: task.start.toISOString(),
  end: task.end.toISOString(),
});

// localstorageから読み込むための型
export const deserializeTask = (task: GanttTaskSerialized): GanttTask => ({
  ...task,
  start: new Date(task.start),
  end: new Date(task.end),
});