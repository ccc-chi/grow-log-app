import { Box } from "@chakra-ui/react";
import { FC, memo } from "react";
import { RecordLog } from "../log/RecordLog";
import { AllLogList } from "../log/AllLogList";

export const LogListArea: FC = memo(() => {
  return (
    <>
      <Box my={10}>
        <RecordLog />
        <AllLogList />
      </Box>
    </>
  );
});
