import React, { useEffect } from "react";
import { Tilt as SamTilt } from "@samlabs/samblocks";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { observer } from "mobx-react";
import TiltDevice from "src/Store/TiltDevice";
import ToggleSwitchHOC from "src/SAMDevices/Common/ToggleSwitchHOC";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Tilt({ device }: { device: TiltDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);
  const virtualEvents = ["valueChanged"];

  const handleChange = () => {
    singleDeviceStore.setIsTilted(!singleDeviceStore.isTilted);
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
      <ToggleSwitchHOC
        setValue={handleChange}
        currentValue={singleDeviceStore.isTilted}
        controlsVisibility={singleDeviceStore.blockVisibility}
      >
        {singleDeviceStore.blockVisibility && (
          <div className="mt-4">
            <SamTilt
              getIsTilted={() => singleDeviceStore.isTilted}
              getColor={() =>
                device.Color ? hexToRGBA(device.Color) : undefined
              }
            />
          </div>
        )}
      </ToggleSwitchHOC>
    </>
  );
}

export default observer(Tilt);
