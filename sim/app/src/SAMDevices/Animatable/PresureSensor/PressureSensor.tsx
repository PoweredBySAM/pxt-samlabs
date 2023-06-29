import React, { useEffect } from "react";
import { PressureSensor as SamPressureSensor } from "@samlabs/samblocks";
import PressureSensorDevice from "src/Store/PressureSensorDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { bluetoothEvents } from "src/SAMDevices/Animatable";
import SliderWithDisplayHOC from "src/SAMDevices/Common/SliderWithDisplayHOC";

function PressureSensor({ device }: { device: PressureSensorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );

  const virtualEvents = ["valueChanged"];

  const handleChange = (event: any, newValue: number | number[]) => {
    singleDeviceStore.setValue(newValue as number);
  };

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // removeEvents(bluetoothEvents, virtualEvents);
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
            <SamPressureSensor />
          </Box>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer(PressureSensor);
