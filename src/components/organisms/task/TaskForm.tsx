import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { TaskFormInput } from "../../../domain/TaskWithLogs";
import { DateInput } from "../../atoms/Calender/DateInput";

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
    control,
  } = useForm<TaskFormInput>({
    defaultValues: {
      // 日付の初期値を設定
      start: new Date(),
      end: new Date(),
    },
  });

  return (
    <Box maxW={"500px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl isInvalid={!!errors.title}>
            <Input
              placeholder="タイトル"
              {...register("title", { required: "タイトルを入力してください" })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <Textarea
              placeholder="内容"
              {...register("content", { required: "内容を入力してください" })}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <DateInput control={control} name={"start"} label={"開始日"} />
          <DateInput control={control} name={"end"} label={"終了日"} />

          {/* <Flex alignItems="center" gap={2}>
            <Text>目標時間：</Text>
            <Input w={"100px"} type="number" {...register("targetTime", {})} />
            <Text>時間</Text>
          </Flex> */}
          <Button colorScheme="blue" type="submit">
            登録
          </Button>
        </Stack>
      </form>
    </Box>
  );
});
