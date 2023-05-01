import { useContext } from 'react';
import { StoreContext } from '../Store/storeContext';

export const useStores = () => {
  const devicesStore = useContext(StoreContext);

  if (!devicesStore) {
    throw new Error('You have forgotten to use StoreProvider, please check your index.js file.');
  }

  return { devicesStore };
};