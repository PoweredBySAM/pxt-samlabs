import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Buzzer as SamBuzzer } from "@samlabs/samblocks";
import useEventsController from "src/Hooks/useEventsController";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import { Box } from "@mui/material";
import BuzzerDevice from "src/Store/BuzzerDevice";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Buzzer({ device }: { device: BuzzerDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { blockVisibility, deviceInTestMode } = singleDeviceStore || {};
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );

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
    <>
      {blockVisibility && (
        <Box sx={{ mt: 5 }}>
          <SamBuzzer
            getIsActive={() => singleDeviceStore.isActive}
            getColor={() =>
              device.Color ? hexToRGBA(device.Color) : undefined
            }
          />
        </Box>
      )}
    </>
  );
}

export default observer(Buzzer);
