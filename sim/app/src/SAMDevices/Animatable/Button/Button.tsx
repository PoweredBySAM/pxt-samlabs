import { Button as SamButton } from "@samlabs/samblocks";
import { observer } from "mobx-react"; // Import the observer
import React, { useEffect } from "react";
import useEventsController from "../../../Hooks/useEventsController";
import { Box, Typography } from "@mui/material";
import { useSingleDeviceStore } from "../../../Hooks/useSingleDeviceStore";
import ButtonDevice from "../../../Store/ButtonDevice";
import useBasicEvents from "../../../Hooks/useBasicEvents";

const Button =  observer(({ device }: { device: ButtonDevice })=> {

  const {handleBasicControllerEvents} = useBasicEvents(device)||{};
  const {addEvents, removeEvents } = useEventsController(device,handleBasicControllerEvents)||{};
  const {singleDeviceStore} = useSingleDeviceStore(device)
  const addEventsBoolean = !!handleBasicControllerEvents && !!addEvents && !!removeEvents
  const { blockVisibility,deviceInTestMode } = singleDeviceStore||{};

  const bluetoothEvents = [
    "connecting",
    "connected",
    "batteryLevelChange",
    "disconnected",
  ];
  
  const virtualEvents = ["valueChanged"];
  const handleButtonPress = () => {
    device.updateState("pressed");
  };

  const handleButtonRelease = () => {
    device.updateState("released");
  };

  useEffect(() => {
    addEventsBoolean && addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // console.log(handleBasicControllerEvents,"handleBasicControllerEvents",)

      // addEventsBoolean &&  removeEvents(bluetoothEvents, virtualEvents);
    };
  }, [addEvents, removeEvents, handleBasicControllerEvents]);

  return (
    <>
      {blockVisibility && deviceInTestMode &&
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" sx={{fontWeight:600}}>
              {`${
              device.currentState === "pressed" ? "Pressed" : "Released"
            } `}
          </Typography>
          {/* <Box sx={{width:"1rem",height:"1rem",borderRadius:"50%",border:"solid 1px #c4c4c4"}}></Box> */}
        </Box>
      }
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
})

export default Button;
