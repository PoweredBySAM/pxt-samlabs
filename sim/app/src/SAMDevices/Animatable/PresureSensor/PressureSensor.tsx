import React, { useEffect } from 'react'
import { PressureSensor as SamPressureSensor} from "@samlabs/samblocks";
import PressureSensorDevice from '../../../Store/PressureSensorDevice';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';
import { observer } from 'mobx-react';
import SliderWithDisplayHOC from '../../Common/SliderWithDisplayHOC';
import { Box } from '@mui/material';


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
  
  const handleChange = (event: any, newValue: number | number[]) => {
    singleDeviceStore.setValue(newValue as number);
  }

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  return (
    <>
      <SliderWithDisplayHOC
        setValue={handleChange}
        currentValue={singleDeviceStore.value}
        controlsVisibility={singleDeviceStore.blockVisibility}
      >
        {singleDeviceStore.blockVisibility && (
          <Box sx={{ display: "flex", justifyItems: "center" }}>
            <SamPressureSensor />
          </Box>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer( PressureSensor)