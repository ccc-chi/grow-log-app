import { FC, memo, useState } from "react";
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
import { TaskFormInput } from "../../../domain/ganttTask";

type Props = {
  onSubmit: (data: TaskFormInput) => void;
};

export const TaskForm: FC<Props> = memo((props) => {
  const { onSubmit } = props;
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInput>();

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
