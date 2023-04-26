import React, { useEffect } from "react";
import { Servo as SamServo } from "@samlabs/samblocks";
import ServoMotorDevice from "../../../Store/ServoMotorDevice";
import useBasicEvents from "../../../Hooks/useBasicEvents";
import { useSingleDeviceStore } from "../../../Hooks/useSingleDeviceStore";
import useEventsController from "../../../Hooks/useEventsController";
import { observer } from "mobx-react";

function Servo({ device }: { device: ServoMotorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );

  const bluetoothEvents = [
    "connecting",
    "connected",
    "batteryLevelChange",
    "disconnected",
  ];
  const virtualEvents = ["valueChanged"];
  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);
  return (
    <>
      {singleDeviceStore.blockVisibility && (
        <div>
          <SamServo getPosition={() => device.getPosition()} />
        </div>
      )}
    </>
  );
}

export default observer(Servo);
