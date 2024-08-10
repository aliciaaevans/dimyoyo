import { Yoyo } from './Yoyo';

export interface CanvasProps {
  width: number;
  height: number;
  scale: number;
  yoyos: Yoyo[];
}

export type FormInputs = {
  yoName: string;
  yoDiameter: number;
  yoWidth: number;
  yoGapWidth: number;
  yoColor: string;
};
