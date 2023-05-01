import { createContext } from 'react';
import DevicesStore from './DevicesStore';

const devicesStore =  DevicesStore;

export const StoreContext = createContext(devicesStore);