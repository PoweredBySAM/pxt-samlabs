import React, { useEffect } from "react";
import { LED as SamLED } from "@samlabs/samblocks";
import { observer } from "mobx-react";
import LEDDevice from "src/Store/LEDDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function LED({ device }: { device: LEDDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  const { blockVisibility, ledColor, _ledBrightness } = singleDeviceStore || {};

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
        <div className="flex justify-center mt-5">
          <div>
            <SamLED
              colorIndicator={{
                color: ledColor,
                opacity: ledColor === "#000000" ? 0 : _ledBrightness,
              }}
              getColor={() =>
                device.Color ? hexToRGBA(device.Color) : undefined
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default observer(LED);
