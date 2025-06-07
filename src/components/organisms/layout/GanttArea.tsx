import { FC, memo, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

import { GanttChart } from '../gantt/GanttChart';
import { TaskForm } from '../task/TaskForm';
import { GanttTask, TaskFormInput } from '../../../domain/ganttTask';

export const GanttArea: FC = memo(() => {
  const [ganttTasks,setGanttTasks] = useState<GanttTask[]>([]);


  const onSubmit = (data: TaskFormInput) => {
    const task: GanttTask = {
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
    setGanttTasks(tasks => [...tasks, task]);
    console.log("タスクを追加:", ganttTasks);
    localStorage.setItem(task.id, JSON.stringify(task));
  };

  return (
    <>
      <GanttChart ganttTasks={ganttTasks} />
      <TaskForm onSubmit={onSubmit} />
    </>
  );
});