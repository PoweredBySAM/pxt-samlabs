import React, { useEffect } from 'react'
import { TemperatureSensor as SamTemperatureSensor} from "@samlabs/samblocks";
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';
import { observer } from 'mobx-react';
import { Box } from '@mui/material';
import HeatSensorDevice from '../../../Store/HeatSensorDevice';
import SliderWithDisplayHOC from '../../Common/SliderWithDisplayHOC';


function HeatSensor({device}:{device:HeatSensorDevice}) {
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
  const handleChange = (event: any, newValue: number | number[]) => {
    singleDeviceStore.setValue(newValue as number);
  }
  const virtualEvents = ["valueChanged"];

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      removeEvents(bluetoothEvents, virtualEvents);
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
          <Box sx={{ mt: 2 }}>
            <SamTemperatureSensor />
          </Box>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer(HeatSensor)