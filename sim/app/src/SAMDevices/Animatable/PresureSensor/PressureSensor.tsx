import React, { useEffect } from "react";
import { PressureSensor as SamPressureSensor } from "@samlabs/samblocks";
import PressureSensorDevice from "src/Store/PressureSensorDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import SliderWithDisplayHOC from "src/SAMDevices/Common/SliderWithDisplayHOC";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function PressureSensor({ device }: { device: PressureSensorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);
  const virtualEvents = ["valueChanged"];

  const handleChange = (event: any, newValue: number | number[]) => {
    singleDeviceStore.setValue(newValue as number);
  };

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
      <SliderWithDisplayHOC
        setValue={handleChange}
        currentValue={singleDeviceStore.value}
        controlsVisibility={singleDeviceStore.blockVisibility}
      >
        {singleDeviceStore.blockVisibility && (
          <Box sx={{ display: "flex", justifyItems: "center" }}>
            <SamPressureSensor
              getColor={() =>
                device.Color ? hexToRGBA(device.Color) : undefined
              }
            />
          </Box>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer(PressureSensor);
