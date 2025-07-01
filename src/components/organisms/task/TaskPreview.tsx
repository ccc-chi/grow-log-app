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
import { useForm } from "react-hook-form";

import { DateInput } from "../../atoms/Calender/DateInput";
import {
  GanttTask,
  serializeTask,
  TaskFormInput,
} from "../../../domain/ganttTask";

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
  // RHF 初期値を設定
  const { handleSubmit, control, getValues } = useForm<TaskFormInput>({
    defaultValues: {
      start: clickedTask?.start || new Date(),
      end: clickedTask?.end || new Date(),
    },
  });

  //-- タスクを更新
  const onClickUpdateButton = () => {
    if (!editTask) return;
    // getValues()で取得
    const { start, end } = getValues();
    // 更新するデータ
    const updatedTask: GanttTask = {
      ...editTask,
      start: start,
      end: end,
      progress: progress,
    };
    console.log("更新されたタスク:", updatedTask);
    setEditTask(updatedTask);

    //-- タスク全体の配列を更新する
    const updatedGanttTasks = ganttTasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setGanttTasks(updatedGanttTasks);

    //-- localStorageに保存
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
        <form onSubmit={handleSubmit(onClickUpdateButton)}>
          <Text>{clickedTask?.content}</Text>
          <Box>
            <DateInput control={control} name={"start"} label={"開始日"} />
            <DateInput control={control} name={"end"} label={"終了日"} />

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

            <Button type="submit">更新</Button>
          </Box>
        </form>
      </ModalBody>
    </ModalContent>
  );
});
