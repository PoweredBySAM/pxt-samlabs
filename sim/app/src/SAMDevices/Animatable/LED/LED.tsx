import React, { useEffect } from 'react'
import { LED as SamLED} from "@samlabs/samblocks";
import { observer } from 'mobx-react';
import LEDDevice from '../../../Store/LEDDevice';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';


function LED({device}:{device:LEDDevice}) {
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
          <SamLED ledColor={singleDeviceStore.ledColor} opacity = {singleDeviceStore.opacity} />
        </div>
      )}
    </>
  );
}

export default observer(LED)