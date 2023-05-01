import React, { useEffect } from 'react'
import { LED as SamLED} from "@samlabs/samblocks";
import { observer } from 'mobx-react';
import LEDDevice from '../../../Store/LEDDevice';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useEventsController from '../../../Hooks/useEventsController';
import { Box } from '@mui/material';


function LED({device}:{device:LEDDevice}) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const testColors = ['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF']
  const { blockVisibility,deviceInTestMode,ledColor,testLEDColor } = singleDeviceStore||{};


  const bluetoothEvents = [
    "connecting",
    "connected",
    "batteryLevelChange",
    "disconnected",
  ];
  const virtualEvents = ["valueChanged"];

  const handleTestColorChange = (color:string) => {
    singleDeviceStore.setLEDTestColor(color)
  }

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  return (
    <>
      {blockVisibility && deviceInTestMode && 
      <Box sx={{ display: "flex", justifyContent: "center"}}>
        {testColors.map((color) => (
          <Box
            sx={{
              height: "1rem",
              backgroundColor: color,
              width:"20%",
              cursor: "pointer",
              mb:2,
            }}
            onClick={() => handleTestColorChange(color)}
          ></Box>
        ))}
      </Box>}
      {blockVisibility && (
        <Box sx={{display:"flex",justifyContent:"center",mt:5}}>
          <Box>
            <SamLED
              colorIndicator={{
                color: deviceInTestMode ? testLEDColor : ledColor,
                opacity: 100,
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default observer(LED)