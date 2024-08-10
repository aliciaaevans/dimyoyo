import { useForm, SubmitHandler } from 'react-hook-form';
import { Yoyo, YoyoActionType } from '../types/Yoyo';
import ModalDialog from './ModalDialog';
import { ColorInput, StyledButton, StyledInput } from './FormFields';
import { FormInputs } from '../types/Props';

interface FormProps {
  open: boolean;
  yoyo?: Yoyo;
  onSave: (yoyo: Yoyo, type: YoyoActionType) => void;
  onCancel: (value: boolean) => void;
}

export default function EditForm({ open, yoyo, onSave, onCancel }: FormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      yoName: yoyo?.name,
      yoDiameter: yoyo?.diameter,
      yoWidth: yoyo?.width,
      yoGapWidth: yoyo?.gapWidth,
      yoColor: yoyo?.color || '#000000',
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    let action = YoyoActionType.CHANGE;
    let id = yoyo?.id || '';
    if (!yoyo || yoyo.id.length < 1) {
      id = crypto.randomUUID();
      action = YoyoActionType.ADD;
    }
    onSave(
      {
        id: id,
        name: data.yoName,
        diameter: data.yoDiameter,
        width: data.yoWidth,
        gapWidth: data.yoGapWidth,
        color: data.yoColor,
      },
      action
    );
  };

  return (
    <ModalDialog title="Edit Yo-yo" open={open} onCancel={onCancel}>
      <form className="w-full max-w-md px-4" onSubmit={handleSubmit(onSubmit)}>
        <StyledInput label="Name" error={errors.yoName} fieldName="yoName" register={register} />
        <StyledInput
          label="Diameter (mm)"
          type="number"
          step="0.01"
          min="0.01"
          error={errors.yoDiameter}
          fieldName="yoDiameter"
          register={register}
        />
        <StyledInput label="Width (mm)" type="number" step="0.01" min="0.01" error={errors.yoWidth} fieldName="yoWidth" register={register} />
        <StyledInput
          label="Gap Width (mm)"
          type="number"
          step="0.01"
          min="0.01"
          error={errors.yoGapWidth}
          fieldName="yoGapWidth"
          register={register}
        />
        <ColorInput label="Color" name="yoColor" control={control} />
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
