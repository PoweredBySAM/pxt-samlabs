import React from 'react';
import ActiveDeviceItem from './ActiveDeviceItem';
import { observer } from 'mobx-react';
import { StoreContext } from '../../Store/storeContext';

const ActiveDevices = observer(() => {
  const devicesStore = React.useContext(StoreContext);
  const devices = devicesStore.devices;
  console.log(devicesStore.devices, 'activedeviceitem');

  return (
    <div>
      {devices.map((device: any) => (
        <ActiveDeviceItem key={device.id} device={device} />
      ))}
    </div>
  );
});

export default ActiveDevices;

