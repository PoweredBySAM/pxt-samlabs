import React, { useEffect } from 'react'
import { PressureSensor as SamPressureSensor} from "@samlabs/samblocks";
import PressureSensorDevice from '../../../Store/PressureSensorDevice';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';
import { observer } from 'mobx-react';


function PressureSensor({device}:{device:PressureSensorDevice}) {
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
          <SamPressureSensor />
        </div>
      )}
    </>
  )
}

export default observer( PressureSensor)