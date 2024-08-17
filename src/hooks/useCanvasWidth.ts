import { useSyncExternalStore } from 'react';

const useCanvasWidth = () => {
  const canvasWidth = useSyncExternalStore(subscribe, getSnapshot);
  return canvasWidth;
};

const getSnapshot = () => {
  return window.innerWidth;
};

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  };
};

export default useCanvasWidth;
