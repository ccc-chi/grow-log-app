import React, { FC, memo, useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { TaskPreview } from "../task/TaskPreview";
import { GanttTask } from "../../../domain/ganttTask";

type Props = {
  ganttTasks: GanttTask[];
  setGanttTasks: React.Dispatch<React.SetStateAction<GanttTask[]>>;
};

export const GanttChart: FC<Props> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ganttTasks, setGanttTasks } = props;

  //-- ガントバーがクリックされたときの処理
  const [clickedTask, setClickedTask] = useState<GanttTask | null>(null);

  const ganttBarClick = (task: Task) => {
    setClickedTask(task as GanttTask);
    onOpen();
  };

  return (
    <>
      <Box my={4}>
        {ganttTasks.length > 0 ? (
          <Gantt tasks={ganttTasks as Task[]} onClick={ganttBarClick} />
        ) : (
          <div>
            <Text>タスクを追加してください。</Text>
            <Text>タスクを追加するとガントチャートが表示されます。</Text>
          </div>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {clickedTask && (
          <TaskPreview
            clickedTask={clickedTask}
            ganttTasks={ganttTasks}
            setGanttTasks={setGanttTasks}
          />
        )}
      </Modal>
    </>
  );
});
