import React, { useEffect } from 'react';
import SelectorComponent from './Components/selector/SelectorComponent';
import MuiThemeLayout from './Layouts/MuiThemeLayout';
import SAMDeviceBuilder from './SAMDevices/SAMDeviceBuilder';
import ActiveDevices from './Components/ActiveDevices/ActiveDevices';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from './Hooks/useStores';
import { DeviceMenuItemType, IBuiltDevice, IDeviceLabelObject, IDeviceLabels } from './SAMDevices/Types/SAMDeviceTypes';
import { CustomEventGenerator } from './Features/CustomEventGenerator';
import { deviceNameType } from './SAMDevices/Icons/deviceIconTypes';
import { deviceLabels } from './Constants/DeviceLabel';
import { getDeviceIcon } from './SAMDevices/Icons';
import useAddNewDeviceEventHandler from './Hooks/useAddNewDeviceEventHandler';

const App: React.FC = observer(() => {
  const { devicesStore } = useStores();
  const [showActiveDevices, setShowActiveDevices] = React.useState(true);
  const deviceKeys:deviceNameType[] = Object.keys(deviceLabels) as deviceNameType[];
  const {addNewDeviceEventHandler} = useAddNewDeviceEventHandler();
  const menuItemData:DeviceMenuItemType[] = deviceKeys.map((key:deviceNameType) => {
      return {
          label: deviceLabels[key],
          icon: getDeviceIcon(key)
      }
  })

  const addDeviceHandler = (device: DeviceMenuItemType):void => {
    const newDevice: SAMDeviceBuilder = new SAMDeviceBuilder(device);
    const builtDevice:IBuiltDevice = newDevice.build();      
    devicesStore.addDevice(builtDevice);
  };

  const toggleActiveDevicesVisibility = ():void => {
    setShowActiveDevices(prev=>!prev);
  }
  enum samSimEvents{
    TOSIM_DEVICE_VALUE_CHANGED = 'TOSIM_DEVICE_VALUE_CHANGED',
    TOSIM_DEVICE_CREATED = 'TOSIM_EDITOR_DEVICE_CREATED',
    FROMSIM_DEVICE_VALUE_CHANGED = 'FROMSIM_DEVICE_VALUE_CHANGED',
}


  useEffect(()=>{
      CustomEventGenerator.getInstance().receiveEvent("TOSIM_EDITOR_DEVICE_CREATED", (event:CustomEvent)=>{
        addNewDeviceEventHandler(event.detail.device);
    });
      CustomEventGenerator.getInstance().receiveEvent("TOSIM_DEVICE_VALUE_CHANGED", (event:CustomEvent)=>{
        addNewDeviceEventHandler(event.detail.device);
    });
  }, []);

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
