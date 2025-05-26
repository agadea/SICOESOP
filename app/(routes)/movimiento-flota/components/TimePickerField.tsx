// Componente TimePickerField para React Hook Form + react-time-picker + shadcn/ui
import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";

interface TimePickerFieldProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  name: string;
  disabled?: boolean;
}

export const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  value,
  onChange,
  name,
  disabled = false,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <TimePicker
          onChange={onChange}
          value={value || ""}
          format="HH:mm"
          disableClock
          clearIcon={null}
          clockIcon={null}
          amPmAriaLabel={undefined}
          name={name}
          disabled={disabled}
          className="w-full border rounded-md px-2 py-1 dark:bg-background"
          locale="es-ES"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
