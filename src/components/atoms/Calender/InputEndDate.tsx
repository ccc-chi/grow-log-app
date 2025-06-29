import { FC, memo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDatePicker } from "./CalendarDatePicker";
import { Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { TaskFormInput } from "../../../domain/ganttTask";


export const InputEndDate: FC<Props> = memo((props) => {
  const { date } = props;
  const {
    setValue,
  } = useForm<TaskFormInput>();
  const initialDate = new Date();
  const [endDate, setStartDate] = useState<Date | null>(initialDate);
  const handleEndChange = (date: Date | null) => {
    setStartDate(date);
    setValue("start", date);
  };
  return (
    <>
      <Flex alignItems="center" gap={2}>
        <Text>開始日：</Text>
        {
          date ? (
            <CalendarDatePicker date={date} onChange={handleEndChange} />
          ): (
            <CalendarDatePicker date={endDate} onChange={handleEndChange} />
          )
        }
      </Flex>
    </>
  );
});
