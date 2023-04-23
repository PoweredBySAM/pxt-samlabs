import React, { useEffect } from 'react'
import { Slider as SamSlider} from "@samlabs/samblocks";
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';
import { observer } from 'mobx-react';
import SliderDevice from '../../../Store/SliderDevice';
import { Box } from '@mui/material';
import SliderWithDisplayHOC from '../../Common/SliderWithDisplayHOC';


function Slider({device}:{device:SliderDevice}) {
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
          <Box sx={{ mt: 4 }}>
            <SamSlider getValue={() => singleDeviceStore.value} />
          </Box>
        )}
      </SliderWithDisplayHOC>
    </>
  );
}

export default observer( Slider)