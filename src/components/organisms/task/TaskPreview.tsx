import { FC, memo } from 'react';
import {
  Box,
  Text
} from "@chakra-ui/react";

export const TaskPreview: FC = memo(() => {
  //-- ガントバーでタスクをクリック時に表示
  return (
    <Box maxW={"500px"}>
      <Text>クリックして表示</Text>
    </Box>
  );
});