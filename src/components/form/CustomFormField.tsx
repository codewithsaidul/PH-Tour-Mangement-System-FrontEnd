import type { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type z from "zod";
import type { registerSchema } from "../modules/Authentication/RegisterForm";
import { cloneElement, type ReactElement, type ReactNode } from "react";

type RegisterFormValues = z.infer<typeof registerSchema>;

interface ICustomFormField {
  control: Control<RegisterFormValues>;
  name: keyof RegisterFormValues;
  label: string;
  type?: string;
  placeholder: string;
  description: string;
  customInput?: ReactNode;
}

const CustomFormField = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  description,
  customInput,
  ...rest
}: ICustomFormField) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {customInput ? (
              cloneElement(customInput as ReactElement, { ...field})
            ) : (
              <Input type={type} placeholder={placeholder} {...field} {...rest} />
            )}
          </FormControl>
          <FormDescription className="sr-only">{description}</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
