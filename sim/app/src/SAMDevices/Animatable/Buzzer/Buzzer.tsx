import React, { useEffect } from 'react'
import { observer } from 'mobx-react';
import { Buzzer as SamBuzzer} from "@samlabs/samblocks";
import useEventsController from '../../../Hooks/useEventsController';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import { Box } from '@mui/material';
import BuzzerDevice from '../../../Store/BuzzerDevice';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


function Buzzer({device}:{device:BuzzerDevice}) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { blockVisibility,deviceInTestMode } = singleDeviceStore||{};

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

  const handleTestPlay = ()=>{
    singleDeviceStore.testTone('start')
    setTimeout(() => {
      singleDeviceStore.testTone('stop')
    }, 5000);
  }
  console.log(blockVisibility,'blockVisibility')

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);
  return (
    <>
    <Box>
    {deviceInTestMode && blockVisibility && (
        <Box sx={{ display: "flex", justifyContent: "center",mb:5 }}>
          <Box>
            <span onClick={handleTestPlay}>
              <PlayArrowIcon
                sx={{ fontSize: "1.6rem", ml: 1, cursor: "pointer" }}
              />
            </span>
          </Box>
        </Box>
      )}

    </Box>
      {blockVisibility && (
        <Box>
          <SamBuzzer getIsActive={deviceInTestMode? ()=>singleDeviceStore.testSoundActive : ()=>singleDeviceStore.isActive} />
        </Box>
      )}
    </>
  );
}


export default observer(Buzzer) 