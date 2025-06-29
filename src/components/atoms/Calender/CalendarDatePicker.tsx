import { FC, memo } from "react";
import { Input } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  date: Date | null;
  onChange: (date: Date | null) => void;
};

export const CalendarDatePicker: FC<Props> = memo((props) => {
  const { date, onChange } = props;
  return (
    <DatePicker
      selected={date}
      onChange={onChange}
      customInput={<Input />}
      dateFormat="yyyy/MM/dd"
    />
  );
});
