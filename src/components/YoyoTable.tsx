import { useState } from 'react';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Yoyo, YoyoAction, YoyoActionType } from '../types/Yoyo';
import EditForm from './EditForm';
import { StyledIconButton } from './FormFields';

interface SelectionProps {
  dispatch: (action: YoyoAction) => void;
  yoyos: Yoyo[];
}

const YoyoTable = ({ dispatch, yoyos }: SelectionProps) => {
  const [editing, setEditing] = useState<Yoyo | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <table className="table-auto w-10/12 my-8 mx-auto border-separate border-spacing-2 text-xs md:text-base xl:text-lg">
        <thead>
          <tr className="border-b border-b-slate-300 text-left">
            <th>Name</th>
            <th>Diameter (mm)</th>
            <th>Width (mm)</th>
            <th>Gap Width (mm)</th>
            <th>Color</th>
            <th>
              <StyledIconButton
                data-autofocus
                label="Add"
                color="blue"
                onClick={() => {
                  setEditing(undefined);
                  setOpen(true);
                }}
              >
                <PlusIcon width={24} height={24} />
              </StyledIconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {yoyos &&
            yoyos.map((yoyo) => (
              <tr key={yoyo.id}>
                <td>{yoyo.name}</td>
                <td>{yoyo.diameter}</td>
                <td>{yoyo.width}</td>
                <td>{yoyo.gapWidth}</td>
                <td>
                  <div style={{ backgroundColor: yoyo.color }}>&nbsp;</div>
                </td>
                <td className="flex-row lg:space-x-2">
                  <StyledIconButton
                    label="Edit"
                    color="blue"
                    onClick={() => {
                      setEditing(yoyo);
                      setOpen(true);
                    }}
                  >
                    <PencilIcon width={24} height={24} />
                  </StyledIconButton>
                  <StyledIconButton
                    label="Delete"
                    color="red"
                    onClick={() => {
                      dispatch({ type: YoyoActionType.DELETE, yoyo: yoyo });
                    }}
                  >
                    <TrashIcon className="text-red-700 lg:text-white" width={24} height={24} />
                  </StyledIconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {open && (
        <EditForm
          open={open}
          yoyo={editing}
          onSave={(yoyo: Yoyo, type: YoyoActionType) => {
            setOpen(false);
            dispatch({ type: type, yoyo: yoyo });
            setEditing(undefined);
          }}
          onCancel={() => {
            setOpen(false);
            setEditing(undefined);
          }}
        />
      )}
    </>
  );
};

export default YoyoTable;
