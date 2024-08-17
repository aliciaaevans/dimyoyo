import { useState, type ComponentPropsWithoutRef } from 'react';
import { Button, Field, Input, Label, Description } from '@headlessui/react';
import { Control, FieldError, UseFormRegister, useController } from 'react-hook-form';
import { FormInputs } from '../types/Props';
import { HexColorPicker } from 'react-colorful';

export const StyledButton = ({ children, className, ...buttonProps }: ComponentPropsWithoutRef<'button'>) => {
  return (
    <Button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className || ''}`} {...buttonProps}>
      {children}
    </Button>
  );
};

interface StyledIconButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
  color: 'blue' | 'red';
}
export const StyledIconButton = ({ label, color, children, className, ...buttonProps }: StyledIconButtonProps) => {
  return (
    <Button
      aria-label={label}
      title={label}
      className={`bg-transparent lg:bg-${color}-500 hover:bg-${color}-200 text-${color}-500 lg:text-white lg:my-1 lg:px-3 lg:py-2 hover:outline space-x-2 font-bold rounded inline-flex items-center ${
        className || ''
      }`}
      {...buttonProps}
    >
      {children}
      <span className="hidden lg:inline">{label}</span>
    </Button>
  );
};

interface StyledInputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  fieldName: 'yoName' | 'yoDiameter' | 'yoWidth' | 'yoGapWidth' | 'yoColor';
  register: UseFormRegister<FormInputs>;
  error?: FieldError;
}

export const StyledInput = ({ label, fieldName, register, error, className, min, type, ...inputProps }: StyledInputProps) => {
  return (
    <Field className="mb-1 md:mb-4">
      <Label className="text-sm/6 font-medium">{label}</Label>
      <Input
        className={`mt-1 md:mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 data-[focus]:outline-2 data-[focus]:-outline-offset data-[focus]:outline-gray-500 ${className}`}
        {...register(fieldName, {
          required: { value: true, message: 'Field is required.' },
          min: min ? { value: min || 0, message: `Must be at least ${min}.` } : undefined,
        })}
        type={type}
        {...inputProps}
      />
      {error && <Description className="text-red-600 text-sm md:text-base mb-1 md:mb-4">{error.message}</Description>}
    </Field>
  );
};

interface ColorInputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  name: 'yoColor';
  control: Control<FormInputs>;
}
export const ColorInput = ({ label, className, control, name, ...inputProps }: ColorInputProps) => {
  const { field, fieldState } = useController<FormInputs, 'yoColor'>({
    name,
    control,
    rules: {
      required: { value: true, message: 'Field is required.' },
      pattern: {
        value: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
        message: 'Must be a valid hexidecimal color code.',
      },
    },
  });
  const [color, setColor] = useState<string>(field.value);
  return (
    <Field className="mb-1 md:mb-4">
      <Label className="text-sm/6 font-medium">{label}</Label>
      <Input
        className={`my-1 md:my-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 data-[focus]:outline-2 data-[focus]:-outline-offset data-[focus]:outline-gray-500 ${className}`}
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          field.onChange(e.target.value);
        }}
        {...inputProps}
      />
      {fieldState.error && <Description className="text-red-600 text-sm md:text-base mb-1">{fieldState.error.message}</Description>}
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
