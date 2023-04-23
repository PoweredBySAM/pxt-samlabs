import React, { useEffect } from 'react'
import { Tilt as SamTilt} from "@samlabs/samblocks";
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';
import { observer } from 'mobx-react';
import SliderDevice from '../../../Store/SliderDevice';
import { Box } from '@mui/material';
import TiltDevice from '../../../Store/TiltDevice';
import SliderWithDisplayHOC from '../../Common/SliderWithDisplayHOC';
import ToggleSwitchHOC from '../../Common/ToggleSwitchHOC';

function Tilt({device}:{device:TiltDevice}) {
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

  const handleChange = () => {
    singleDeviceStore.setIsTilted(!singleDeviceStore.isTilted);
  }

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  return (
    <>
      <ToggleSwitchHOC
        setValue={handleChange}
        currentValue={singleDeviceStore.isTilted}
        controlsVisibility={singleDeviceStore.blockVisibility}
      >
        {singleDeviceStore.blockVisibility && (
          <Box sx={{ mt: 1 }}>
            <SamTilt getIsTilted={()=>singleDeviceStore.isTilted}/>
          </Box>
        )}
      </ToggleSwitchHOC>
    </>
  );
}

export default observer(Tilt)