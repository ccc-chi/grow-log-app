import { FC, memo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon, TimeIcon } from "@chakra-ui/icons";
import { TaskWithLogs } from "../../../domain/TaskWithLogs";

type Props = {
  tasks: TaskWithLogs[];
};

export const AllLogList: FC<Props> = memo((props) => {
  const { tasks } = props;
  return (
    <>
      <Box>
        <Text as={"h2"} fontWeight={"bold"} mb={4}>
          記録一覧
        </Text>
        <Box
          height={"300px"}
          overflowY={"auto"}
          p={3}
          borderWidth={1}
          borderRadius="md"
          mb={10}
          backgroundColor={"gray.50"}
          maxWidth={"600px"}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Box key={task.id} mb={8}>
                <Text
                  fontWeight={"bold"}
                  borderWidth={1}
                  borderX={"none"}
                  p={2}
                >
                  {task.name}
                </Text>
                {(task.logs || []).map((log) => (
                  <Box key={log.id} mt={2}>
                    <Text className="date">
                      <CalendarIcon /> {log.date}
                    </Text>
                    <Text className="time">
                      <TimeIcon /> {log.totalTime}
                    </Text>
                    <Text className="memo">
                      <ChatIcon /> {log.memo}
                    </Text>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <>
              <Text fontSize={"sm"}>記録の登録がありません</Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
});
