import React from "react";
import CompactSimDevice from "./CompactSimDevice";
import { Box, Card } from "@mui/material";
import { getDeviceIcon } from "../Icons";
import { deviceNameType } from "../Icons/deviceIconTypes";
import { observer } from "mobx-react";
import { useSingleDeviceStore } from "../../Hooks/useSingleDeviceStore";

const FullSimDeviceWrapper = observer(
  ({ device, children, ...rest }: { device: any; children: any }) => {
    const { singleDeviceStore } = useSingleDeviceStore(device);
    const deviceName = device.restProps?.labels.name as deviceNameType;
    const Icon = getDeviceIcon(deviceName, {
      width: "3rem !important",
      height: "3rem !important",
    });

    const connectBluetooth = () => {
      device.bluetoothController.connect();
    };
    const disconnectBluetooth = () => {
      device.bluetoothController.disconnect();
    };
    const toggleVisibility = () => {
      singleDeviceStore.toggleVisibility();
    };

    const toggleTestMode = () => {
      singleDeviceStore.toggleTestMode();
    };

    const assignBlueToothDevice = (device: any) => {
      if(!device.assignedName )return
      console.log(device,"something in")
      singleDeviceStore.setBluetoothController(device);
      singleDeviceStore._bluetoothController.setConnectedToSimDevice(true)
      console.log('device in assign',device,singleDeviceStore)

    }
    const removeDevice = () => {
      //Todo: add confirmation and check if device is used in project, disconnect if connected to bluetooth
      singleDeviceStore.deleteDevice();
      console.log(singleDeviceStore.deleted, "deleted");
    };

    return (
      <Card
        elevation={1}
        style={{ margin: 2 }}
        sx={
          device.deviceInTestMode
            ? { border: "1px solid #D04226" }
            : { border: "1px solid #d7d7d7" }
        }
      >
        <Box>
          <CompactSimDevice
            labels={device.restProps?.labels}
            deviceNameInSim={device.restProps?.id}
            varNameInPxt = {device.deviceVarNameInPxt}
            Icon={Icon}
            controller={{
              disconnectBluetooth,
              connectBluetooth,
              connnected: device.isConnected,
            }}
            assignBlueToothDevice={assignBlueToothDevice}
            toggleVisibility={toggleVisibility}
            visibility={device.blockVisibility}
            toggleTestMode={toggleTestMode}
            removeDevice={removeDevice}
            isInTestMode={device.deviceInTestMode}
            isConnected={singleDeviceStore.isConnected}
            connectedDeviceName={singleDeviceStore._bluetoothController?.assignedName}
          />
        </Box>
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Card>
    );
  }
);

export default FullSimDeviceWrapper;
