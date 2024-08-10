import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
import { Yoyo, YoyoActionType } from '../types/Yoyo';
import ModalDialog from './ModalDialog';
import { StyledButton, StyledInput } from './Styled';
import { FormInputs } from '../types/Props';

interface FormProps {
  open: boolean;
  yoyo?: Yoyo;
  onSave: (yoyo: Yoyo, type: YoyoActionType) => void;
  onCancel: (value: boolean) => void;
}

export default function EditForm({ open, yoyo, onSave, onCancel }: FormProps) {
  const [yoColor, setYoColor] = useState<string>(yoyo?.color || '#FF0000');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    // let id = yoId;
    // let action = YoyoActionType.CHANGE;
    // if (yoId.length < 1) {
    //   id = crypto.randomUUID();
    //   action = YoyoActionType.ADD;
    // }
    // onSave(
    //   {
    //     id: id,
    //     name: yoName,
    //     diameter: parseFloat(yoDiameter) || 0,
    //     width: parseFloat(yoWidth) || 0,
    //     gapWidth: parseFloat(yoGapWidth) || 0,
    //     color: yoColor,
    //   },
    //   action
    // );
  };

  return (
    <ModalDialog title="Edit Yo-yo" open={open} onCancel={onCancel}>
      <form className="w-full max-w-md px-4" onSubmit={handleSubmit(onSubmit)}>
        <StyledInput label="Name" defaultValue={yoyo?.name} error={errors.yoName} fieldName="yoName" register={register} />
        <StyledInput
          label="Diameter (mm)"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={yoyo?.diameter}
          error={errors.yoDiameter}
          fieldName="yoDiameter"
          register={register}
        />
        <StyledInput
          label="Width (mm)"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={yoyo?.width}
          error={errors.yoWidth}
          fieldName="yoWidth"
          register={register}
        />
        <StyledInput
          label="Gap Width (mm)"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={yoyo?.gapWidth}
          error={errors.yoGapWidth}
          fieldName="yoGapWidth"
          register={register}
        />
        <StyledInput label="Color" defaultValue={yoColor} error={errors.yoColor} fieldName="yoColor" register={register} />
        <HexColorPicker color={yoColor} onChange={setYoColor} />
        <StyledButton data-autofocus className="mr-2" type="submit">
          Save
        </StyledButton>
        <StyledButton className="mx-2" onClick={() => onCancel(false)}>
          Cancel
        </StyledButton>
      </form>
    </ModalDialog>
  );
}
