import React from 'react';
import SelectorComponent from './Components/selector/SelectorComponent';
import MuiThemeLayout from './Layouts/MuiThemeLayout';
import devices from './AllDevices';
import SAMDeviceBuilder from './SAMDevices/SAMDeviceBuilder';
import ActiveDevices from './Components/selector/ActiveDevices';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from './Hooks/useStores';

const App: React.FC = observer(() => {
  const { devicesStore } = useStores();

  const addDeviceHandler = (device: any) => {
    const newDevice = new SAMDeviceBuilder(device);
    const builtDevice = newDevice.build();
    console.log(builtDevice, 'builtDevice');
      devicesStore.addDevice(builtDevice);
  };

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
        <SelectorComponent devices={devices} addDevice={addDeviceHandler} />
        <ActiveDevices />
      </Box>
    </MuiThemeLayout>
  );
});

export default App;
