import { Box } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { RecordLog } from "../log/RecordLog";
import { AllLogList } from "../log/AllLogList";
import { TaskWithLogs } from "../../../domain/TaskWithLogs";

type Props = {
  tasks: TaskWithLogs[];
  setTasks: React.Dispatch<React.SetStateAction<TaskWithLogs[]>>;
};

export const LogListArea: FC<Props> = memo((props) => {
  const { tasks, setTasks } = props;
  return (
    <>
      <Box my={10}>
        <RecordLog tasks={tasks} setTasks={setTasks} />
        <AllLogList />
      </Box>
    </>
  );
});
