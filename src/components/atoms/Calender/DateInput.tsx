import { FC, memo } from "react";
import { Input, FormControl, FormLabel, Flex, Text } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TaskFormInput } from "../../../domain/ganttTask";

type Props = {
  control: Control<TaskFormInput>;
  name: keyof TaskFormInput;
  label: string;
};

export const DateInput: FC<Props> = memo((props) => {
  const { control, name, label } = props;
  return (
    <FormControl>
      <Flex alignItems="center" gap={2}>
        <FormLabel m={0}>{label}</FormLabel>
        <Text>：</Text>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              // valueが文字にならないようにガード（localStorageは文字列の扱い）
              selected={
                typeof value === "string"
                  ? value
                    ? new Date(value)
                    : null
                  : value
              }
              onChange={onChange}
              customInput={<Input />}
              dateFormat="yyyy/MM/dd"
            />
          )}
        />
      </Flex>
    </FormControl>
  );
});
