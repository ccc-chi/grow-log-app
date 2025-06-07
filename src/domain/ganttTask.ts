export type TaskFormInput = {
  title: string;
  content: string;
  targetTime: string;
  start: Date | null;
  end: Date | null;
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
};
