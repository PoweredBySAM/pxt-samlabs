import { Button as SamButton } from "@samlabs/samblocks";
import { observer } from "mobx-react"; // Import the observer
import React, { useEffect } from "react";
import useEventsController from "src/Hooks/useEventsController";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import ButtonDevice from "src/Store/ButtonDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Button({ device }: { device: ButtonDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
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
        <div className="flex justify-center">
          <div className="text-sm font-semibold">
            {`${device.currentState === "pressed" ? "Pressed" : "Released"} `}
          </div>
          {/* <div className="w-4 h-4 rounded-full border border-[#c4c4c4]"></div> */}
        </div>
      )}
      {blockVisibility && (
        <div
          onPointerDown={handleButtonPress}
          onPointerLeave={handleButtonRelease}
          onPointerUp={handleButtonRelease}
          className="my-8 flex justify-center"
        >
          <div>
            <SamButton
              buttonPressed={device.currentState === "pressed"}
              // wireFrame
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

export default observer(Button);
