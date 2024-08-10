import { useState, type ComponentPropsWithoutRef } from 'react';
import { Button, Field, Input, Label, Description } from '@headlessui/react';
import { Control, FieldError, FieldValues, UseFormRegister, useController } from 'react-hook-form';
import { FormInputs } from '../types/Props';
import { HexColorPicker } from 'react-colorful';

export const StyledButton = ({ children, className, ...buttonProps }: ComponentPropsWithoutRef<'button'>) => {
  return (
    <Button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`} {...buttonProps}>
      {children}
    </Button>
  );
};

interface StyledInputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  fieldName: 'yoName' | 'yoDiameter' | 'yoWidth' | 'yoGapWidth' | 'yoColor';
  register: UseFormRegister<FormInputs>;
  error?: FieldError;
}

export const StyledInput = ({ label, fieldName, register, error, className, ...inputProps }: StyledInputProps) => {
  return (
    <Field>
      <Label className="text-sm/6 font-medium">{label}</Label>
      <Input
        className={`mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 data-[focus]:outline-2 data-[focus]:-outline-offset data-[focus]:outline-gray-500 ${className}`}
        {...register(fieldName, { required: true })}
        {...inputProps}
      />
      {error && <Description className="text-red-600">This field is required.</Description>}
    </Field>
  );
};

interface ColorInputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  name: 'yoName' | 'yoDiameter' | 'yoWidth' | 'yoGapWidth' | 'yoColor';
  control: Control<FormInputs>;
}
export const ColorInput = ({ label, className, control, name, ...inputProps }: ColorInputProps) => {
  const { field } = useController({
    control,
    name,
  });
  const [color, setColor] = useState<string>(`${field.value}` || '#FF0000');
  return (
    <Field>
      <Label className="text-sm/6 font-medium">{label}</Label>
      <Input
        className={`mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 data-[focus]:outline-2 data-[focus]:-outline-offset data-[focus]:outline-gray-500 ${className}`}
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          field.onChange(e.target.value);
        }}
        {...inputProps}
      />
      <HexColorPicker
        color={color}
        onChange={(newColor) => {
          setColor(newColor);
          field.onChange(newColor);
        }}
      />
    </Field>
  );
};
