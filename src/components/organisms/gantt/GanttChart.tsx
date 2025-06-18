import { FC, memo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type Props = {
  ganttTasks: Task[];
  ganttBarClick?: (task: Task) => void;
};

export const GanttChart: FC<Props> = memo((props) => {
  const { ganttTasks, ganttBarClick } = props;
  return (
    <Box my={4}>
      {ganttTasks.length > 0 ? (
        <Gantt tasks={ganttTasks} onClick={ganttBarClick} />
      ) : (
        <div>
          <Text>タスクを追加してください。</Text>
          <Text>タスクを追加するとガントチャートが表示されます。</Text>
        </div>
      )}
    </Box>
  );
});
