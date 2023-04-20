import React from 'react';
import ActiveDeviceItem from './ActiveDeviceItem';
import { observer } from 'mobx-react';
import { StoreContext } from '../../Store/storeContext';
import { Box } from '@mui/material';

const ActiveDevices = observer(({showActiveDevices}:{showActiveDevices?:any}) => {
  const devicesStore = React.useContext(StoreContext);
  const devices = devicesStore.devices;

  return (
    <Box sx = {showActiveDevices? {} : {visibility:"hidden"}}>
      {devices.map((device: any) => (
        <ActiveDeviceItem key={device.id} device={device} />
      ))}
    </Box>
  );
});

export default ActiveDevices;

