import { Button as SamButton } from "@samlabs/samblocks";
import { observer } from "mobx-react"; // Import the observer
import React, { useEffect } from "react";
import useEventsController from "../../../Hooks/useEventsController";

function Button({ device }: { device?: any }) {
  const { handleEvents, addEvents, removeEvents } = useEventsController(device);
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
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  return (
    <div
      onPointerDown={handleButtonPress}
      onPointerLeave={handleButtonRelease}
      onPointerUp={handleButtonRelease}
    >
      <SamButton
        buttonPressed={device.currentState === "pressed"}
        // getColor={() => (device.Color)}
      />
    </div>
  );
}

export default observer(Button);
