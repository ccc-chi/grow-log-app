import { FC, memo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { DateInput } from "../../atoms/Calender/DateInput";
import {
  TaskWithLogs,
  serializeTask,
  TaskFormInput,
} from "../../../domain/TaskWithLogs";
import { formatMinutesToTimeStr } from "../../../utils/format";

type Props = {
  clickedTask: TaskWithLogs | null;
  tasks: TaskWithLogs[];
  setTasks: React.Dispatch<React.SetStateAction<TaskWithLogs[]>>;
  onClose: () => void;
};

//-- ガントバーでタスクをクリック時に表示
export const TaskPreview: FC<Props> = memo((props) => {
  const { clickedTask, tasks, setTasks, onClose } = props;

  const [editTask, setEditTask] = useState<TaskWithLogs | null>(clickedTask);
  // RHF 初期値を設定
  const { handleSubmit, control, getValues, register } = useForm<TaskFormInput>(
    {
      defaultValues: {
        title: clickedTask?.name || "",
        content: clickedTask?.content || "",
        start: clickedTask?.start || new Date(),
        end: clickedTask?.end || new Date(),
      },
    }
  );

  //-- タスクを更新
  const onClickUpdateButton = () => {
    if (!editTask) {
      onClose();
      return;
    }
    // getValues()で取得
    const { start, end, title, content } = getValues();
    // 更新するデータ
    const updatedTask: TaskWithLogs = {
      ...editTask,
      name: title,
      content: content,
      start: start,
      end: end,
    };
    console.log("更新されたタスク:", updatedTask);
    setEditTask(updatedTask);

    //-- タスク全体の配列を更新する
    const updatedTaskWithLogs = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(updatedTaskWithLogs);

    //-- localStorageに保存
    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTaskWithLogs.map(serializeTask))
    );
    onClose();
  };

  //-- タスクの累積時間を計算
  const logsTotalTime =
    clickedTask?.logs?.reduce((sum, log) => sum + log.totalTime, 0) || 0;

  // // progressの数字を管理する
  // const [progress, setProgress] = useState<number>(clickedTask?.progress || 0);
  // const handleProgressChange = (value: string) => {
  //   const num = Number(value);
  //   if (!isNaN(num) && num >= 1 && num <= 100) {
  //     setProgress(Number(num));
  //   } else {
  //     setProgress(0);
  //     return;
  //   }
  // };

  //-- タイトルとコンテンツを編集できるように
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ModalContent py={10} px={9} maxWidth="800px" width="90%">
      <form onSubmit={handleSubmit(onClickUpdateButton)}>
        <ModalHeader
          minHeight={"90px"}
          backgroundColor={"gray.100"}
          borderRadius={"10"}
          p={4}
          mb={5}
        >
          {isEditing ? (
            <Input backgroundColor={"white"} {...register("title")} />
          ) : (
            clickedTask?.name
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box
            minHeight={"150px"}
            backgroundColor={"gray.100"}
            borderRadius={"10"}
            p={4}
          >
            {isEditing ? (
              <Textarea backgroundColor={"white"} {...register("content")} />
            ) : (
              clickedTask?.content
            )}
          </Box>
          <Box textAlign={"right"} my={2}>
            <Text
              as={"span"}
              cursor={"pointer"}
              fontSize={"sm"}
              textDecor={"underline"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "キャンセル" : "編集する"}
            </Text>
          </Box>

          <Stack spacing={2} mt={10}>
            <DateInput control={control} name={"start"} label={"開始日"} />
            <DateInput control={control} name={"end"} label={"終了日"} />

            <Flex align={"center"} gap={2} my={2}>
              <Text>進捗:</Text>
              <Text>{clickedTask?.progress}%</Text>
            </Flex>
            <Flex align={"center"} gap={2} my={2}>
              <Text>累積時間:</Text>
              <Text>{formatMinutesToTimeStr(logsTotalTime)}</Text>
            </Flex>
            <Box my={4} textAlign={"right"}>
              <Button type="submit">更新</Button>
            </Box>
          </Stack>
        </ModalBody>
      </form>
    </ModalContent>
  );
});
