import React, { useEffect } from "react";
import { TemperatureSensor as SamTemperatureSensor } from "@samlabs/samblocks";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { observer } from "mobx-react";
import HeatSensorDevice from "src/Store/HeatSensorDevice";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import SliderWithDisplayHOC from "src/SAMDevices/Common/SliderWithDisplayHOC";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function HeatSensor({ device }: { device: HeatSensorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  const handleChange = (event: any, newValue: number | number[]) => {
    singleDeviceStore.heatSensorValueChanged(newValue as number);
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
        currentValue={singleDeviceStore.value}
        controlsVisibility={singleDeviceStore.blockVisibility}
        heatSensor
      >
        {singleDeviceStore.blockVisibility && (
          <div className="mt-8">
            <SamTemperatureSensor
              getColor={() =>
                device.Color ? hexToRGBA(device.Color) : undefined
              }
            />
          </div>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer(HeatSensor);
