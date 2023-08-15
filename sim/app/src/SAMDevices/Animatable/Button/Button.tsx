import { Button as SamButton } from "@samlabs/samblocks";
import { observer } from "mobx-react"; // Import the observer
import React, { useEffect } from "react";
import useEventsController from "src/Hooks/useEventsController";
import { Box, Typography } from "@mui/material";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import ButtonDevice from "src/Store/ButtonDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { bluetoothEvents } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Button({ device }: { device: ButtonDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { addEvents, removeEvents } =
    useEventsController(device, handleBasicControllerEvents) || {};
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);
  const addEventsBoolean =
    !!handleBasicControllerEvents && !!addEvents && !!removeEvents;
  const { blockVisibility, deviceInTestMode } = singleDeviceStore || {};

  const virtualEvents = ["valueChanged"];
  const handleButtonPress = () => {
    device.updateState("pressed");
  };

  const handleButtonRelease = () => {
    device.updateState("released");
  };

  useEffect(() => {
    addEventsBoolean && addEvents(bluetoothEvents, virtualEvents);
  }, [addEvents, removeEvents, handleBasicControllerEvents]);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);

  return (
    <>
      {blockVisibility && deviceInTestMode && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {`${device.currentState === "pressed" ? "Pressed" : "Released"} `}
          </Typography>
          {/* <Box sx={{width:"1rem",height:"1rem",borderRadius:"50%",border:"solid 1px #c4c4c4"}}></Box> */}
        </Box>
      )}
      {blockVisibility && (
        <Box
          onPointerDown={handleButtonPress}
          onPointerLeave={handleButtonRelease}
          onPointerUp={handleButtonRelease}
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <SamButton
              buttonPressed={device.currentState === "pressed"}
              // wireFrame
              // getColor={() => (device.Color)}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default observer(Button);
