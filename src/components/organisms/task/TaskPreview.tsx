import { ChangeEvent, FC, memo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { GanttTask, serializeTask } from "../../../domain/ganttTask";
import { InputStartDate } from "../../atoms/Calender/InputStartDate";
import { InputEndDate } from "../../atoms/Calender/InputEndDate";

type Props = {
  clickedTask: GanttTask | null;
  ganttTasks: GanttTask[];
  setGanttTasks: React.Dispatch<React.SetStateAction<GanttTask[]>>;
};
//-- ガントバーでタスクをクリック時に表示
export const TaskPreview: FC<Props> = memo((props) => {
  const { clickedTask, ganttTasks, setGanttTasks } = props;
  const [editTask, setEditTask] = useState<GanttTask | null>(clickedTask);
  const [progress, setProgress] = useState<number>(clickedTask?.progress || 0);

  const onClickUpdateButton = () => {
    //-- 更新した課題を取得し、更新
    if (!editTask) return;
    const updatedTask: GanttTask = {
      ...editTask,
      progress: progress,
    };
    // console.log("更新されたタスク:", updatedTask);
    setEditTask(updatedTask);
    // タスク全体の配列を更新する
    const updatedGanttTasks = ganttTasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setGanttTasks(updatedGanttTasks);
    // localStorageに保存
    localStorage.setItem(
      "ganttTasks",
      JSON.stringify(updatedGanttTasks.map(serializeTask))
    );
  };

  // progressの数字を管理する
  const handleProgressChange = (value: string) => {
    const num = Number(value);
    if (!isNaN(num)) {
      setProgress(Number(num));
    } else {
      setProgress(0);
      return;
    }
  };

  return (
    <ModalContent>
      <ModalHeader>{clickedTask?.name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>{clickedTask?.content}</Text>
        <Button>状態の変更</Button>
        <Box>
          <InputStartDate date={clickedTask?.start} />
          <InputEndDate date={clickedTask?.end} />

          <Flex align={"center"} gap={2} mt={4}>
            <Text>進捗:</Text>
            <Input
              w={"80px"}
              value={progress}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleProgressChange(e.target.value)
              }
            />
            <Text>%</Text>
          </Flex>

          <Button onClick={onClickUpdateButton}>更新</Button>
        </Box>
      </ModalBody>
    </ModalContent>
  );
});
