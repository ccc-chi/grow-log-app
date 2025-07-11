import { Box, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { TaskWithLogs } from "../../../domain/TaskWithLogs";

type Props = {
  tasks: TaskWithLogs[];
};

export const AllLogList: FC<Props> = memo((props) => {
  const { tasks } = props;
  return (
    <>
      <Box>
        <Text as={"h2"} fontSize={"xl"}>
          記録一覧
        </Text>
        {tasks.map((task) => (
          <Box key={task.id}>
            <Text fontWeight={"bold"}>{task.name}</Text>
            <ul>
              {(task.logs || []).map((log) => (
                <li key={log.id}>
                  <Text className="date">📅 {log.date}</Text>
                  <Text className="time">⏰ {log.totalTime}</Text>
                  <Text className="memo">✍️ {log.memo}</Text>
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
    </>
  );
});
