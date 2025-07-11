import React, { FC, memo, useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { TaskPreview } from "../task/TaskPreview";
import { TaskWithLogs } from "../../../domain/TaskWithLogs";

type Props = {
  TaskWithLogs: TaskWithLogs[];
  setTaskWithLogs: React.Dispatch<React.SetStateAction<TaskWithLogs[]>>;
};

export const GanttChart: FC<Props> = memo((props) => {
  //-- styles
  const NoTooltip = () => null;

  //-- ガントバーがクリックされたときの処理
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { TaskWithLogs, setTaskWithLogs } = props;
  const [clickedTask, setClickedTask] = useState<TaskWithLogs | null>(null);
  const ganttBarClick = (task: Task) => {
    setClickedTask(task as TaskWithLogs);
    onOpen();
  };

  return (
    <>
      <Box my={4}>
        {TaskWithLogs.length > 0 ? (
          <Gantt
            tasks={TaskWithLogs as Task[]}
            onClick={ganttBarClick}
            viewMode={ViewMode.Day}
            locale={"ja"}
            TooltipContent={NoTooltip}
          />
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
            TaskWithLogs={TaskWithLogs}
            setTaskWithLogs={setTaskWithLogs}
            onClose={onClose}
          />
        )}
      </Modal>
    </>
  );
});
