import React, { useEffect } from "react";
import { ProximitySensor as SamProximitySensor } from "@samlabs/samblocks";
import PressureSensorDevice from "../../../Store/PressureSensorDevice";
import useBasicEvents from "../../../Hooks/useBasicEvents";
import { useSingleDeviceStore } from "../../../Hooks/useSingleDeviceStore";
import useEventsController from "../../../Hooks/useEventsController";
import { observer } from "mobx-react";

function ProximitySensor({ device }: { device: PressureSensorDevice }) {
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
          <SamProximitySensor />
        </div>
      )}
    </>
  );
}

export default observer(ProximitySensor);
