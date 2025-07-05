import {
  Box,
  Text,
  Select,
  Button,
  Stack,
  Flex,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";

type RecordLog = {
  start: Date;
  end: Date;
  diffMs: number;
};

export const RecordLog: FC = memo(() => {
  const [isRecording, setIsRecording] = useState(false);
  // const [progress, setProgress] = useState(0);
  //-- 記録時間
  const [currentStartTime, setCurrentStartTime] = useState<Date>();
  const [recordLogs, setRecordLogs] = useState<RecordLog[]>([]);
  const onClickRecordTimer = () => {
    if (!isRecording) {
      // スタート
      const start = new Date();
      setCurrentStartTime(start);
      setIsRecording(!isRecording);
      console.log("開始", start);
    } else {
      // ストップ
      const end = new Date();
      setIsRecording(!isRecording);
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
      setPastRecordedMs((prev) => prev + diffMs);
    }
  };
  //-- 合計時間を出す
  const [totalTimeStr, setTotalTimeStr] = useState("0時間00分");
  const totalTime = useCallback((logs: RecordLog[]) => {
    const totalMs = logs.reduce((sum, log) => sum + log.diffMs, 0);
    const totalMinutes = Math.floor(totalMs / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}時間${minutes.toString().padStart(2, "0")}分`;
  }, []);
  useEffect(() => {
    setTotalTimeStr(totalTime(recordLogs));
  }, [recordLogs, totalTime]);

  //-- ストップウォッチを作る
  const [stopwatchStr, setStopwatchStr] = useState("00:00:00");
  const [pastRecordedMs, setPastRecordedMs] = useState(0);
  useEffect(() => {
    if (!isRecording || !currentStartTime) return;
    const timerId = setInterval(() => {
      const now = Date.now();
      const diffMs = now - currentStartTime.getTime();
      const totalMs = pastRecordedMs + diffMs;

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
        <form>
          <Stack spacing={2}>
            <Text as="h2" fontWeight={"bold"} fontSize="l" my={2}>
              記録を開始する
            </Text>
            <Select placeholder="タスクを選択" backgroundColor={"white"}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Text fontSize={"4xl"} fontWeight={"bold"} textAlign={"center"}>
              {stopwatchStr}
            </Text>
            <Button
              colorScheme="teal"
              width={"100%"}
              onClick={() => onClickRecordTimer()}
            >
              {isRecording ? "記録を停止" : "記録を開始"}
            </Button>
            <Box mt={5}>
              <Stack
                spacing={2}
                backgroundColor={"White"}
                borderWidth={1}
                borderRadius="md"
                p={4}
              >
                <Text fontWeight={"bold"}>タスクに記録する</Text>
                <Text fontSize={"xs"} mb={2}>
                  登録したいタスクが表示されていることを確認し、進捗を入力してください。
                </Text>
                <Text>Option 1</Text>
                <Text>記録時間：{totalTimeStr}</Text>
                <Text>やったこと</Text>
                <Textarea />
                <Box gap={0} mb={2}>
                  <Text>進捗</Text>
                  <Flex alignItems={"flex-end"}>
                    <Input value="" w={"50px"} />
                    <Text>%</Text>
                  </Flex>
                </Box>
                <Button
                  colorScheme="teal"
                  width={"100%"}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  登録
                </Button>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
});
