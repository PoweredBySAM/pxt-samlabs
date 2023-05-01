import { useContext } from 'react';
import { SingleDeviceStoreContext } from '../Store/SingleDeviceStoreContext';
import { SamDeviceStoreType } from '../SAMDevices/Types/SAMDeviceTypes';

export const useSingleDeviceStore = (device: SamDeviceStoreType) => {
  const singleDeviceStore = useContext( SingleDeviceStoreContext({deviceContext:device}));

  if (!singleDeviceStore) {
    throw new Error('You have forgotten to use single device Provider, please check your index.js file.');
  }

  return { singleDeviceStore };
};