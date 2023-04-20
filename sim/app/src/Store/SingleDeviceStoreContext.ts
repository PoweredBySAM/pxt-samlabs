import { createContext } from 'react';

export const SingleDeviceStoreContext = (props: { deviceContext: any; }) =>{  
    return createContext(props.deviceContext) 
}
