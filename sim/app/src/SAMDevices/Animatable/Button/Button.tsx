import { Button as SamButton } from "@samlabs/samblocks";
import { observer } from "mobx-react"; // Import the observer
import React, { useEffect } from "react";
import useEventsController from "../../../Hooks/useEventsController";
import useButtonEvents from "../../../Hooks/useBasicEvents";
import { getDeviceIcon } from "../../Icons";
import { deviceNameType } from "../../Icons/deviceIconTypes";
import { Box } from "@mui/material";
import { useSingleDeviceStore } from "../../../Hooks/useSingleDeviceStore";
import ButtonDevice from "../../../Store/ButtonDevice";

const Button =  observer(({ device }: { device: ButtonDevice })=> {

  const {handleBasicControllerEvents} = useButtonEvents(device)
  const {addEvents, removeEvents } = useEventsController(device,handleBasicControllerEvents);
  const {singleDeviceStore} = useSingleDeviceStore(device)
  const bluetoothEvents = [
    "connecting",
    "connected",
    "batteryLevelChange",
    "disconnected",
  ];
  const deviceName = device.restProps?.labels?.name as deviceNameType
  const DeviceIcon = getDeviceIcon(deviceName)
  const virtualEvents = ["valueChanged"];

  const handleButtonPress = () => {
    device.updateState("pressed");
  };

  const handleButtonRelease = () => {
    device.updateState("released");
  };

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  return (
    <>
    {singleDeviceStore.blockVisibility && 
    <Box
      onPointerDown={handleButtonPress}
      onPointerLeave={handleButtonRelease}
      onPointerUp={handleButtonRelease}
      sx={{my:3}}
    >
                                                                                                                                                                                                                                                                                     
      <SamButton
        buttonPressed={device.currentState === "pressed"}
        // wireFrame
        // getColor={() => (device.Color)}
      />
    </Box>
    }
    </>
    
  );
})

export default Button;
