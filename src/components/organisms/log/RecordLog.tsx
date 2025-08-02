import {
  Box,
  Text,
  Select,
  Button,
  Stack,
  Flex,
  Textarea,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { serializeTask, TaskWithLogs } from "../../../domain/TaskWithLogs";
import { useForm } from "react-hook-form";
import { formatMinutesToTimeStr } from "../../../utils/format";

type TimerLog = {
  // ストップウォッチ用
  start: Date;
  end: Date;
  diffMs: number;
};

type Props = {
  tasks: TaskWithLogs[];
  setTasks: React.Dispatch<React.SetStateAction<TaskWithLogs[]>>;
};

export const RecordLog: FC<Props> = memo((props) => {
  const { tasks, setTasks } = props;
  const [isRecording, setIsRecording] = useState(false);
  //-- 記録時間
  const [currentStartTime, setCurrentStartTime] = useState<Date>();
  const [recordLogs, setRecordLogs] = useState<TimerLog[]>([]);
  const onClickRecordTimer = () => {
    if (!isRecording) {
      // スタート
      const start = new Date();
      setCurrentStartTime(start);
      setIsRecording(true);
      console.log("開始", start);
    } else {
      // ストップ
      const end = new Date();
      setIsRecording(false);
      console.log("終了", end);

      // 差分を配列に保存しておく
      if (!currentStartTime) return;
      const diffMs = end.getTime() - currentStartTime.getTime();
      const newLog = [
        ...recordLogs,
        { start: currentStartTime, end: end, diffMs: diffMs },
      ];
      setRecordLogs(newLog);
      // ストップウォッチ用に「過去の合計時間」を保持する
      setPastRecordedMs((prev) => prev + diffMs); // prev（最新の pastRecordedMs）に diffMs を足す
    }
  };
  //-- 合計時間を出す
  const totalTimeMs = useCallback((logs: TimerLog[]) => {
    return logs.reduce((sum, log) => sum + log.diffMs, 0);
  }, []);
  const logsTotalTime = Math.floor(totalTimeMs(recordLogs) / 1000 / 60);

  //-- ストップウォッチを作る
  const [stopwatchStr, setStopwatchStr] = useState("00:00:00");
  const [pastRecordedMs, setPastRecordedMs] = useState(0);
  useEffect(() => {
    if (!isRecording || !currentStartTime) return;
    const timerId = setInterval(() => {
      const now = Date.now();
      const diffMs = now - currentStartTime.getTime(); // ５秒経過した = 現在（例：10:00:05）- スタートした時間（例：10:00:00）
      const totalMs = pastRecordedMs + diffMs; // 経過時間 = 過去の記録時間 + ５秒（追加）

      // 時間計算
      const totalSeconds = Math.floor(totalMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setStopwatchStr(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 100);
    return () => {
      clearInterval(timerId);
    };
  }, [isRecording, currentStartTime, pastRecordedMs]);

  //-- 登録する
  type FormData = {
    selectedTaskId: string;
    progress: number;
    memoText: string;
  };
  const { handleSubmit, register, getValues, setValue, watch, reset } =
    useForm<FormData>();
  const selectedTaskId = watch("selectedTaskId");
  useEffect(() => {
    // progressを自動でセット
    const selectedTask = tasks.find((task) => task.id === selectedTaskId);
    if (selectedTask) {
      setValue("progress", selectedTask.progress);
    }
  }, [selectedTaskId, tasks, setValue]);
  const todayStr = new Date().toISOString().split("T")[0];
  const toast = useToast(); // 登録完了のトースト
  const addRecordTask = () => {
    const { selectedTaskId, progress, memoText } = getValues();
    const totalTime = Math.floor(
      recordLogs.reduce((sum, log) => sum + log.diffMs, 0) / 1000 / 60
    );
    const updatedTaskWithLogs = tasks.map((task) => {
      if (task.id === selectedTaskId) {
        const newLog = {
          id: `${Date.now()}-${Math.random()}`,
          date: todayStr,
          totalTime: totalTime,
          memo: memoText,
        };
        return {
          ...task,
          progress: progress,
          logs: [...(task.logs || []), newLog],
        };
      } else {
        return task;
      }
    });
    console.log("updatedTaskWithLogs", updatedTaskWithLogs);
    setTasks(updatedTaskWithLogs);
    setIsRecording(false);
    //-- localStorageに保存
    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTaskWithLogs.map(serializeTask))
    );
    //-- toastを表示
    toast({
      title: "登録完了",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    reset();
    // ストップウォッチの状態をリセット
    setStopwatchStr("00:00:00");
    setPastRecordedMs(0);
    setRecordLogs([]);
    setCurrentStartTime(undefined);
  };

  return (
    <>
      <Box
        p={3}
        borderWidth={1}
        borderRadius="md"
        mb={10}
        backgroundColor={"gray.50"}
        maxWidth={"600px"}
      >
        <form onSubmit={handleSubmit(addRecordTask)}>
          <Stack spacing={2}>
            <Text as="h2" fontWeight={"bold"} fontSize="l" my={2}>
              記録を開始する
            </Text>

            <Text fontSize={"4xl"} fontWeight={"bold"} textAlign={"center"}>
              {stopwatchStr}
            </Text>
            <Button
              colorScheme="teal"
              bg={isRecording ? "teal.900" : "teal.500"}
              color={"white"}
              width={"100%"}
              onClick={() => onClickRecordTimer()}
            >
              {isRecording ? "停止" : "開始"}
            </Button>
            <Box
              mt={5}
              backgroundColor={"White"}
              borderWidth={1}
              borderRadius="md"
              p={4}
            >
              <Accordion allowMultiple>
                <AccordionItem border={"none"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      fontWeight={"bold"}
                    >
                      タスクに記録する
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Stack spacing={2}>
                      <Text fontSize={"xs"} mb={2}>
                        タスクを選択し、登録内容と進捗を入力してください。
                      </Text>
                      <Select
                        placeholder="タスクを選択"
                        backgroundColor={"white"}
                        {...register("selectedTaskId")}
                      >
                        {tasks.map((task) => (
                          <option key={task.id} value={task.id}>
                            {task.name}
                          </option>
                        ))}
                      </Select>
                      <Text>
                        記録時間： {formatMinutesToTimeStr(logsTotalTime)}
                      </Text>
                      <Text>やったこと</Text>
                      <Textarea {...register("memoText")} />
                      <Box gap={0} mb={2}>
                        <Text>タスク全体の進捗</Text>
                        <Flex alignItems={"flex-end"}>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            {...register("progress")}
                            w={"100px"}
                          />
                          <Text>%</Text>
                        </Flex>
                      </Box>
                      <Button
                        data-testid="recordLogButton"
                        colorScheme="teal"
                        width={"100%"}
                        type="submit"
                        isDisabled={!selectedTaskId}
                      >
                        登録
                      </Button>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
});
