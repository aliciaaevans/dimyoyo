import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import type { ComponentPropsWithoutRef } from 'react';

interface DialogProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  open: boolean;
  onCancel: (value: boolean) => void;
}

export default function ModalDialog({ title, open, onCancel, children }: DialogProps) {
  // TODO: Update styles from this example
  return (
    <Dialog open={open} onClose={onCancel} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0">
                <DialogTitle as="h3" className="text-base font-bold">
                  {title}
                </DialogTitle>
              </div>
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
