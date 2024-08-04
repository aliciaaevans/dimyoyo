import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Yoyo from '../types/Yoyo';
import ModalDialog from './ModalDialog';
import { StyledInput } from './Styled';

interface FormProps {
  open: boolean;
  yoyo?: Yoyo;
  onSave: (yoyo: Yoyo) => void;
  onCancel: (value: boolean) => void;
}

export default function EditForm({ open, yoyo, onSave, onCancel }: FormProps) {
  const [yoId, setYoId] = useState<string>(yoyo?.id || '');
  const [yoName, setYoName] = useState<string>(yoyo?.name || '');
  const [yoDiameter, setYoDiameter] = useState<string>(`${yoyo?.diameter || ''}`);
  const [yoWidth, setYoWidth] = useState<string>(`${yoyo?.width || ''}`);
  const [yoGapWidth, setYoGapWidth] = useState<string>(`${yoyo?.gapWidth || ''}`);
  const [yoColor, setYoColor] = useState<string>(yoyo?.color || '');

  if (yoyo && yoId != yoyo?.id) {
    setYoId(yoyo.id);
    setYoName(yoyo.name);
    setYoDiameter(`${yoyo?.diameter || ''}`);
    setYoWidth(`${yoyo?.width || ''}`);
    setYoGapWidth(`${yoyo?.gapWidth || ''}`);
    setYoColor(yoyo.color);
  } else if (!yoyo && yoId != '') {
    setYoId('');
    setYoName('');
    setYoDiameter('');
    setYoWidth('');
    setYoGapWidth('');
    setYoColor('#000000');
  }

  const saveYoyo = () => {
    const id = yoId.length < 1 ? crypto.randomUUID() : yoId;
    onSave({
      id: id,
      name: yoName,
      diameter: parseFloat(yoDiameter) || 0,
      width: parseFloat(yoWidth) || 0,
      gapWidth: parseFloat(yoGapWidth) || 0,
      color: yoColor,
    });
    setYoId(id);
  };

  return (
    <ModalDialog title="Edit Yo-yo" open={open} onSave={saveYoyo} onCancel={onCancel}>
      <form className="w-full max-w-md px-4">
        <StyledInput label="Name" value={yoName} onChange={(e) => setYoName(e.target.value)} />
        <StyledInput
          label="Diameter (mm)"
          type="number"
          step="0.01"
          min="0.01"
          value={yoDiameter}
          onChange={(e) => setYoDiameter(e.target.value || '')}
        />
        <StyledInput label="Width (mm)" type="number" step="0.01" min="0.01" value={yoWidth} onChange={(e) => setYoWidth(e.target.value || '')} />
        <StyledInput
          label="Gap Width (mm)"
          type="number"
          step="0.01"
          min="0.01"
          value={yoGapWidth}
          onChange={(e) => setYoGapWidth(e.target.value || '')}
        />
        <StyledInput label="Color" value={yoColor} onChange={(e) => setYoColor(e.target.value)} />
        <HexColorPicker color={yoColor} onChange={setYoColor} />
      </form>
    </ModalDialog>
  );
}
