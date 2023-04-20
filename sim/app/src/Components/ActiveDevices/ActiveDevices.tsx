import React from 'react';
import ActiveDeviceItem from './ActiveDeviceItem';
import { observer } from 'mobx-react';
import { StoreContext } from '../../Store/storeContext';
import { Box } from '@mui/material';
import { SamDeviceStoreType } from '../../SAMDevices/Types/SAMDeviceTypes';

const ActiveDevices = observer(({showActiveDevices}:{showActiveDevices?:boolean}) => {
  const devicesStore = React.useContext(StoreContext);
  const devices:SamDeviceStoreType[] = devicesStore.devices;

  return (
    <Box sx = {showActiveDevices? {} : {visibility:"hidden"}}>
      {devices.map((device: SamDeviceStoreType) => (
        <ActiveDeviceItem key={device.id} device={device} />
      ))}
    </Box>
  );
});

export default ActiveDevices;

