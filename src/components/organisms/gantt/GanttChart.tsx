import { FC, memo } from "react";
import { Box } from "@chakra-ui/react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";


type Props = {
  ganttTasks: Task[];
};

export const GanttChart: FC<Props> = memo((props) => {
  const { ganttTasks } = props;
  return (
    <Box>
      <Gantt tasks={ganttTasks} />
    </Box>
  );
});
