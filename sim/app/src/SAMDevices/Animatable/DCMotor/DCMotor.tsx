import React, { useEffect } from "react";
import { DCMotor as SamDCMotor } from "@samlabs/samblocks";
import DCMotorDevice from "src/Store/DCMotorDevice";
import useEventsController from "src/Hooks/useEventsController";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";
import SliderWithDisplayHOC from "src/SAMDevices/Common/SliderWithDisplayHOC";

function DCMotor({ device }: { device: DCMotorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { singleDeviceStore } = useSingleDeviceStore(device);

  const { blockVisibility, speed } = singleDeviceStore || {};

  const handleChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    singleDeviceStore.setSpeed(value as number);
  };

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
      <SliderWithDisplayHOC
        setValue={handleChange}
        currentValue={singleDeviceStore.speed}
        controlsVisibility={singleDeviceStore.blockVisibility}
      >
        {blockVisibility && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <div>
              <SamDCMotor
                getMotorSpeed={() => singleDeviceStore.speed}
                getColor={() => hexToRGBA(device.Color)}
              />
            </div>
          </Box>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer(DCMotor);
