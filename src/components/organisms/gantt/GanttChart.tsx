import { FC, memo } from "react";
import { Box } from "@chakra-ui/react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export const GanttChart: FC<Props> = memo(() => {
  const tasks: Task[] = [
    {
      start: new Date(2025, 6, 1),
      end: new Date(2025, 6, 10),
      name: "Idea",
      id: "Task 0",
      type: "task",
      progress: 45,
      isDisabled: true,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    },
  ];
  return (
    <Box>
      <Gantt tasks={tasks} />
    </Box>
  );
});
