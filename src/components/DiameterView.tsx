import { useRef, useEffect } from 'react';
import { CanvasProps } from '../types/Props';

const DiameterView = ({ width, height, scale, yoyos }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.reset();
        context.scale(scale, scale);
        yoyos.forEach((yoyo) => {
          context.strokeStyle = yoyo.color;
          context.lineWidth = 0.5;
          const radius = yoyo.diameter / 2;
          const x = width / scale / 2;
          const y = height / scale / 2;
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.stroke();
        });
      }
    }
  }, [width, height, yoyos, scale]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default DiameterView;
