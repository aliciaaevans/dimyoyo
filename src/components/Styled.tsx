import type { ComponentPropsWithoutRef } from 'react';
import { Button, Field, Input, Label, Description } from '@headlessui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FormInputs } from '../types/Props';

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
