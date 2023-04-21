import React, { useEffect } from "react";
import { LightSensor as SamLightSensor } from "@samlabs/samblocks";
import LightSensorDevice from "../../../Store/LightSensorDevice";
import useBasicEvents from "../../../Hooks/useBasicEvents";
import { useSingleDeviceStore } from "../../../Hooks/useSingleDeviceStore";
import useEventsController from "../../../Hooks/useEventsController";
import { observer } from "mobx-react";

function LightSensor({ device }: { device: LightSensorDevice }) {
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
      removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);
  return (
    <>
      {singleDeviceStore.blockVisibility && (
        <div>
          <SamLightSensor />
        </div>
      )}
    </>
  );
}

export default observer(LightSensor);
