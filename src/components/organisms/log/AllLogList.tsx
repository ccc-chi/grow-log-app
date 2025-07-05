import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

export const AllLogList: FC = memo(() => {
  return (
    <>
      <Box>
        <Flex align={"center"} gap={2} mb={4}>
          <Text fontWeight={"bold"}>課題のタイトル</Text>
          <Text>10時間</Text>
        </Flex>
      </Box>
    </>
  );
});
