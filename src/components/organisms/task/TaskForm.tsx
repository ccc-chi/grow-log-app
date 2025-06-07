import { FC, memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Calendar } from "../../atoms/Calendar";
import { Task } from "../../../domain/task";

type TaskFormInput = {
  title: string;
  content: string;
  targetTime: string;
};

export const TaskForm: FC = memo(() => {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInput>();
  const onSubmit = (data: TaskFormInput) => {
    const task: Task = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      targetTime: Number(data.targetTime),
      state: "未対応",
      totalDuration: 0,
      taskRecords: [],
    };
    console.log("タスクを追加:", task);
    localStorage.setItem(task.id, JSON.stringify(task));
  };

  // カレンダー
  const initialDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const [endDate, setEndDate] = useState<Date | null>(initialDate);
  const handleStartChange = (date: Date | null) => {
    setStartDate(date);
  };
  const handleEndChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <Box w={"40%"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl isInvalid={!!errors.title}>
            <Input
              {...register("title", { required: "タイトルを入力してください" })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <Textarea
              {...register("content", { required: "内容を入力してください" })}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <Flex alignItems="center" gap={2}>
            <Text>開始日：</Text>
            <Calendar date={startDate} onChange={handleStartChange} />
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Text>終了日：</Text>
            <Calendar date={endDate} onChange={handleEndChange} />
          </Flex>

          <Flex alignItems="center" gap={2}>
            <Text>目標時間：</Text>
            <Input w={"100px"} type="number" {...register("targetTime", {})} />
            <Text>時間</Text>
          </Flex>
          <Button colorScheme="blue" type="submit">
            登録
          </Button>
        </Stack>
      </form>
    </Box>
  );
});
