import { FC, memo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDatePicker } from "./CalendarDatePicker";
import { Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { TaskFormInput } from "../../../domain/ganttTask";


export const InputStartDate: FC<Props> = memo((props) => {
  const { date } = props;
  const {
    setValue,
  } = useForm<TaskFormInput>();
  const initialDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const handleStartChange = (date: Date | null) => {
    setStartDate(date);
    setValue("start", date);
  };
  return (
    <>
      <Flex alignItems="center" gap={2}>
        <Text>開始日：</Text>
        { date ?
        (
          <CalendarDatePicker
            date={date}
            onChange={handleStartChange} />
        ) : (
          <CalendarDatePicker date={startDate} onChange={handleStartChange} />
        )
        }
      </Flex>
    </>
  );
});
