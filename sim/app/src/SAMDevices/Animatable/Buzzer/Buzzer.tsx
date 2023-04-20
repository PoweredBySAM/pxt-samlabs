import React, { useEffect } from 'react'
import { observer } from 'mobx-react';
import { Buzzer as SamBuzzer} from "@samlabs/samblocks";
import useEventsController from '../../../Hooks/useEventsController';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import { Box } from '@mui/material';
function Buzzer({device}:{device?:any}) {
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
        <Box>
          <SamBuzzer getIsActive={device.isActive} />
        </Box>
      )}
    </>
  );
}


export default observer(Buzzer) 