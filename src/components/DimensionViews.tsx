import { useState, useRef } from 'react';
import DiameterView from './DiameterView';
import WidthView from './WidthView';
import { Yoyo } from '../types/Yoyo';

interface DimensionViewProps {
  yoyos: Yoyo[];
}

const DimensionViews = ({ yoyos }: DimensionViewProps) => {
  const [scale, setScale] = useState<number>(100);

  const diaDivRef = useRef<HTMLDivElement>(null);
  const widDivRef = useRef<HTMLDivElement>(null);
  const diaDim = diaDivRef.current?.clientWidth || 300;
  const widthDim = widDivRef.current?.clientWidth || 300;

  return (
    <>
      <label className="mx-auto" style={{ width: 'fit-content', display: 'block' }}>
        Zoom:&nbsp;
        <input className="border w-20" type="number" value={scale} step="5" onChange={(e) => setScale(parseFloat(e.target.value ?? 100))}></input>%
      </label>
      <div className="flex flex-wrap items-stretch min-h-screen">
        <div className="w-full lg:w-1/2" ref={diaDivRef}>
          <DiameterView width={diaDim} height={diaDim} scale={(scale * diaDim) / 100 / 100} yoyos={yoyos} />
        </div>
        <div className="w-full lg:w-1/2" ref={widDivRef}>
          <WidthView width={widthDim} height={widthDim} scale={(scale * widthDim) / 100 / 100} yoyos={yoyos} />
        </div>
      </div>
    </>
  );
};

export default DimensionViews;
