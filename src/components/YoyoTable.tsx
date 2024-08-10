import { useState } from 'react';
import { Yoyo, YoyoAction, YoyoActionType } from '../types/Yoyo';
import EditForm from './EditForm';
import { StyledButton } from './Styled';

interface SelectionProps {
  dispatch: (action: YoyoAction) => void;
  yoyos: Yoyo[];
}

const YoyoTable = ({ dispatch, yoyos }: SelectionProps) => {
  const [editing, setEditing] = useState<Yoyo | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <table className="table-auto w-2/3 my-8 mx-auto">
        <thead>
          <tr className="border-b border-b-slate-300 text-left">
            <th>Name</th>
            <th>Diameter (mm)</th>
            <th>Width (mm)</th>
            <th>Gap Width (mm)</th>
            <th>Color</th>
            <th>
              <StyledButton
                className="ml-4"
                data-autofocus
                onClick={() => {
                  setEditing(undefined);
                  setOpen(true);
                }}
              >
                Add
              </StyledButton>
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
                <td>
                  <StyledButton
                    className="ml-4"
                    onClick={() => {
                      setEditing(yoyo);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </StyledButton>
                  <StyledButton
                    className="bg-red-500 hover:bg-red-700 ml-4"
                    onClick={() => {
                      dispatch({ type: YoyoActionType.DELETE, yoyo: yoyo });
                    }}
                  >
                    Delete
                  </StyledButton>
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
