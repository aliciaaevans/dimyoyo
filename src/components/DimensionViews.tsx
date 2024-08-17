import { useState, useRef, useEffect } from 'react';
import DiameterView from './DiameterView';
import WidthView from './WidthView';
import { Yoyo } from '../types/Yoyo';
import useCanvasWidth from '../hooks/useCanvasWidth';

interface DimensionViewProps {
  yoyos: Yoyo[];
}

const DimensionViews = ({ yoyos }: DimensionViewProps) => {
  const [scale, setScale] = useState<number>(100);
  const [width, setWidth] = useState<number>(300);

  const diaDivRef = useRef<HTMLDivElement>(null);

  const windowWidth = useCanvasWidth();

  useEffect(() => {
    if (diaDivRef && diaDivRef.current) setWidth(diaDivRef.current.clientWidth);
  }, [diaDivRef, windowWidth]);

  return (
    <>
      <label className="mx-auto" style={{ width: 'fit-content', display: 'block' }}>
        Zoom:&nbsp;
        <input className="border w-20" type="number" value={scale} step="5" onChange={(e) => setScale(parseFloat(e.target.value ?? 100))}></input>%
      </label>
      <div className="flex flex-wrap items-stretch min-h-screen">
        <div className="w-full lg:w-1/2" ref={diaDivRef}>
          <DiameterView width={width} height={width} scale={(scale * width) / 100 / 100} yoyos={yoyos} />
        </div>
        <div className="w-full lg:w-1/2">
          <WidthView width={width} height={width} scale={(scale * width) / 100 / 100} yoyos={yoyos} />
        </div>
      </div>
    </>
  );
};

export default DimensionViews;
