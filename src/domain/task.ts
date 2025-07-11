export type TaskRecord = {
  id: string;
  taskId: string;
  comment?: string;
  duration: number; // 学習時間（分）
  date: Date;
}

export class Task {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public startDate: Date,
    public endDate: Date,
    public targetTime: number, // 目標時間（時間）
    public state: "未対応" | "進行中" | "完了" = "未対応",
    public totalDuration: number = 0, // 累計（時間）
    public taskRecords: TaskRecord[] = [],
  ) {}
}