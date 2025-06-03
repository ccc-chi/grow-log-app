import { FC, memo, useState } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Calendar } from "../../atoms/Calendar";


export const TaskForm: FC<Props> = memo(() => {
  const [title, setTitle] = useState('');
  const initialDate = new Date()
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const [endDate, setEndDate] = useState<Date | null>(initialDate);
  const handleStartChange = (date : Date | null) => {
    setStartDate(date)
  }
  const handleEndChange = (date : Date | null) => {
    setEndDate(date)
  }
  console.log(title);
  return (
    <Box w={"40%"}>
      
      <Stack>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タスク名を入力" />
        <Flex>
          <Text>開始日：</Text><Calendar date={startDate} onChange={handleStartChange}/>
        </Flex>
        <Flex>
          <Text>終了日：</Text><Calendar date={endDate} onChange={handleEndChange} />
        </Flex>
        <Button colorScheme="blue">登録</Button>
      </Stack>
    </Box>
  );
});
