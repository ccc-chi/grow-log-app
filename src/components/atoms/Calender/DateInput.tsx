import { FC, memo } from "react";
import { Input, FormControl, FormLabel, Flex, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  control: Control<FormValues>;
  name: string;
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
              selected={value}
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
