import { FC, memo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDatePicker } from "./CalendarDatePicker";
import { Flex, Text } from "@chakra-ui/react";
import { UseFormSetValue } from "react-hook-form";

import { TaskFormInput } from "../../../domain/ganttTask";

type Props = {
  date?: Date | null;
  setValue: UseFormSetValue<TaskFormInput>;
};

export const InputEndDate: FC<Props> = memo((props) => {
  const { date, setValue } = props;
  const initialDate = new Date();
  const [endDate, setEndDate] = useState<Date | null>(initialDate);
  const handleEndChange = (date: Date | null) => {
    setEndDate(date);
    setValue("end", date);
  };
  return (
    <>
      <Flex alignItems="center" gap={2}>
        <Text>開始日：</Text>
        {date ? (
          <CalendarDatePicker date={date} onChange={handleEndChange} />
        ) : (
          <CalendarDatePicker date={endDate} onChange={handleEndChange} />
        )}
      </Flex>
    </>
  );
});
