import { useRef, useEffect } from 'react';
import { CanvasProps } from '../types/Props';

const WidthView = ({ width, height, scale, yoyos }: CanvasProps) => {
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
          context.setLineDash([]);
          const x = width / scale / 2;
          const y = height / scale / 2;
          // Outline
          context.beginPath();
          context.rect(
            x - yoyo.width / 2,
            y - yoyo.diameter / 2,
            yoyo.width,
            yoyo.diameter
          );
          context.stroke();
          // Gap Width
          context.lineWidth = 0.25;
          context.setLineDash([0.5, 0.3]); /*dashes are 5px and spaces are 3px*/
          context.beginPath();
          context.rect(
            x - yoyo.gapWidth / 2,
            y - yoyo.diameter / 2,
            yoyo.gapWidth,
            yoyo.diameter
          );
          context.stroke();
        });
      }
    }
  }, [width, height, yoyos, scale]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default WidthView;
