import { useState } from 'react';

const useStoreLocally = (): [boolean, (value: boolean) => void] => {
  const [store, setStore] = useState<boolean>(localStorage.getItem('storeLocally') === 'true');

  const setter = (value: boolean) => {
    if (value) {
      localStorage.setItem('storeLocally', `${value}`);
    } else {
      localStorage.clear();
    }
    setStore(value);
  };

  return [store, setter];
};

export default useStoreLocally;
