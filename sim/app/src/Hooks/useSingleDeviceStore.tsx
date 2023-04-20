import { useContext } from 'react';
import { SingleDeviceStoreContext } from '../Store/SingleDeviceStoreContext';
export const useSingleDeviceStore = (device: any) => {
  const singleDeviceStore = useContext( SingleDeviceStoreContext({deviceContext:device}));

  if (!singleDeviceStore) {
    throw new Error('You have forgotten to use single device Provider, please check your index.js file.');
  }

  return { singleDeviceStore };
};