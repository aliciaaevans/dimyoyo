import type { ComponentPropsWithoutRef } from 'react';
import { Button, Field, Input, Label } from '@headlessui/react';

export const StyledButton = ({ children, className, ...buttonProps }: ComponentPropsWithoutRef<'button'>) => {
  return (
    <Button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`} {...buttonProps}>
      {children}
    </Button>
  );
};

interface NumberInputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

export const StyledInput = ({ label, className, ...inputProps }: NumberInputProps) => {
  return (
    <Field>
      <Label className="text-sm/6 font-medium">{label}</Label>
      <Input
        className={`mt-3 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm/6 data-[focus]:outline-2 data-[focus]:-outline-offset data-[focus]:outline-gray-500 ${className}`}
        {...inputProps}
      />
    </Field>
  );
};
