import { useSyncExternalStore } from 'react';

const useWindowWidth = () => {
  const width = useSyncExternalStore(subscribe, getSnapshot);
  return width;
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

export default useWindowWidth;
