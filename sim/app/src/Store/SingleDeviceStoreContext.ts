import { createContext } from 'react';
import { SamDeviceStoreType } from '../SAMDevices/Types/SAMDeviceTypes';

export const SingleDeviceStoreContext = (props: { deviceContext: SamDeviceStoreType; }) =>{  
    return createContext(props.deviceContext) 
}
