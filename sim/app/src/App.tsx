import React from 'react';
import SelectorComponent from './Components/selector/SelectorComponent';
import MuiThemeLayout from './Layouts/MuiThemeLayout';
import devices from './AllDevices';
import SAMDeviceBuilder from './SAMDevices/SAMDeviceBuilder';
import { getDeviceAnimation } from './SAMDevices/Animatable';
import ActiveDevices from './Components/selector/ActiveDevices';
import { Box } from '@mui/material';
import DevicesStore  from './Store/DevicesStore';

const App: React.FC = () => {
  const [activeDevices, setActiveDevices] = React.useState<any>([]);

  const addDeviceHandler = (device: any) => {
    const deviceTypeCount = activeDevices.filter((dev: any) => dev.name === device.name).length;
    const deviceId = deviceTypeCount ? deviceTypeCount - 1 : 0  //0 indexed
    const newDevice = new SAMDeviceBuilder({...device, deviceId},getDeviceAnimation,DevicesStore);
    setActiveDevices([...activeDevices, newDevice]);
  }

  return (
    <MuiThemeLayout>
      <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", m:2}} >
        <SelectorComponent devices={devices} addDevice={addDeviceHandler}/>
        <ActiveDevices devices = {activeDevices}/>
        
      </Box>
    </MuiThemeLayout>
  );
};

export default App;