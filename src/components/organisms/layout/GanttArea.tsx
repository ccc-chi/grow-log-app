import { FC, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { GanttChart } from "../gantt/GanttChart";
import { TaskForm } from "../task/TaskForm";
import { TaskFormInput } from "../../../domain/ganttTask";
import { Task } from "gantt-task-react";

export const GanttArea: FC = memo(() => {
  const [ganttTasks, setGanttTasks] = useState<Task[]>(() => {
    // localStorageにデータがあれば設定する
    const stored = localStorage.getItem("ganttTasks");
    const perse = JSON.parse(stored || "[]");
    console.log("ganttTasksの変換まえ:", perse);
    return perse.map((task: any) => ({
      ...task,
      start: new Date(task.start),
      end: new Date(task.end),
    }));
  });

  console.log("ganttTasks:", ganttTasks);
  const onSubmit = (data: TaskFormInput) => {
    const task: Task = {
      start: data.start || new Date(),
      end: data.end || new Date(),
      name: data.title,
      id: uuidv4(),
      type: "task",
      progress: 0,
      isDisabled: true,
      styles: {
        progressColor: "#ffbb54",
        progressSelectedColor: "#ff9e0d",
      },
      // content: data.content,
      // targetTime: Number(data.targetTime),
      // state: "未対応",
      // totalDuration: 0,
      // taskRecords: [],
    };
    setGanttTasks((tasks) => [...tasks, task]);
    console.log("タスクを追加:", ganttTasks);
    localStorage.setItem("ganttTasks", JSON.stringify([...ganttTasks, task]));
  };

  return (
    <>
      <GanttChart ganttTasks={ganttTasks} />
      <TaskForm onSubmit={onSubmit} />
    </>
  );
});
