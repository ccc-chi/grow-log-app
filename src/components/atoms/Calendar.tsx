import { FC, memo } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@chakra-ui/react";

type Props = {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

export const Calendar: FC<Props> = memo((props) => {
  const {date,onChange} = props;
  return (
    <DatePicker
      selected={date}
      onChange={onChange}
      customInput={<Input />} 
      dateFormat="yyyy/MM/dd"
    />
  );
});
