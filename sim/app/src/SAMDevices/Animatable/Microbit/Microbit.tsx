import React, { useEffect } from "react";
import { Microbit as BBCMicrobit } from "@samlabs/samblocks";
import { observer } from "mobx-react";
import { bluetoothEvents } from "../index";
import useBasicEvents from "src/Hooks/useBasicEvents";
import useEventsController from "src/Hooks/useEventsController";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import { Box } from "@mui/material";
import MicrobitDevice from "src/Store/MicrobitDevice";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";
const Microbit = ({ device }: { device: MicrobitDevice }) => {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { singleDeviceStore } = useSingleDeviceStore(device);

  const { blockVisibility } = singleDeviceStore || {};
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  const virtualEvents = ["valueChanged"];
  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
  }, []);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);
  return (
    <div>
      {blockVisibility && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pl: 2,
            pr: 2,
            pb: 2,
          }}
        >
          <BBCMicrobit
            ledArray={device.ledMatrix}
            aPressed={device.aPressed}
            bPressed={device.bPressed}
            pin0={device.pin0}
            pin1={device.pin1}
            pin2={device.pin2}
            pin3={device.pin3}
            pinGND={device.pinGND}
            onAButtonDown={device.onAButtonDown}
            onAButtonUp={device.onAButtonUp}
            onBButtonDown={device.onBButtonDown}
            onBButtonUp={device.onBButtonUp}
          />
        </Box>
      )}
    </div>
  );
};

export default observer(Microbit);
