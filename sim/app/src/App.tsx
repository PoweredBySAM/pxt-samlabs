import React from 'react';
import SelectorComponent from './Components/selector/SelectorComponent';
import MuiThemeLayout from './Layouts/MuiThemeLayout';
import SAMDeviceBuilder from './SAMDevices/SAMDeviceBuilder';
import ActiveDevices from './Components/ActiveDevices/ActiveDevices';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from './Hooks/useStores';
import { IBuiltDevice, IDeviceLabelObject, IDeviceLabels } from './SAMDevices/Types/SAMDeviceTypes';

const App: React.FC = observer(() => {
  const { devicesStore } = useStores();
  const [showActiveDevices, setShowActiveDevices] = React.useState(true);

  const addDeviceHandler = (device: IDeviceLabelObject):void => {
    const newDevice: SAMDeviceBuilder = new SAMDeviceBuilder(device);
    const builtDevice:IBuiltDevice = newDevice.build();      
    devicesStore.addDevice(builtDevice);
  };

  const toggleActiveDevicesVisibility = ():void => {
    setShowActiveDevices(prev=>!prev);
  }

  return (
    <MuiThemeLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          m: 2,
        }}
      >
        <SelectorComponent addDevice={addDeviceHandler} toggleActiveDevicesVisibility={toggleActiveDevicesVisibility} />
        {<ActiveDevices showActiveDevices={showActiveDevices} />}
      </Box>
    </MuiThemeLayout>
  );
});

export default App;
