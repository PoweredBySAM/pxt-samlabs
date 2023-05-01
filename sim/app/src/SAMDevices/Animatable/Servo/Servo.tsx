import React, { useEffect } from "react";
import { Servo as SamServo } from "@samlabs/samblocks";
import ServoMotorDevice from "../../../Store/ServoMotorDevice";
import useBasicEvents from "../../../Hooks/useBasicEvents";
import { useSingleDeviceStore } from "../../../Hooks/useSingleDeviceStore";
import useEventsController from "../../../Hooks/useEventsController";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

function Servo({ device }: { device: ServoMotorDevice }) {
  const [showMotor, setShowMotor] = React.useState(false);
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { blockVisibility,deviceInTestMode} = singleDeviceStore||{};
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );

  useEffect(()=>{
    setShowMotor(false)
    setTimeout(() => {
      setShowMotor(true)
    }, 0);
  
  },[deviceInTestMode])

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
      // removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  const handleStep=(step:number)=>{
    if( step < 0){
      device.testPosition > 0 && singleDeviceStore.setTestPosition(step)
    }
    else if( step > 0){
      device.testPosition <100 && singleDeviceStore.setTestPosition(step)
    }
  }
  return (
    <>
      {deviceInTestMode && blockVisibility && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <span onClick={() => handleStep(-10)}>
              <SkipPreviousIcon
                sx={{ fontSize: "1.6rem", mr: 1, cursor: "pointer" }}
              />
            </span>
            <span onClick={() => handleStep(10)}>
              <SkipNextIcon
                sx={{ fontSize: "1.6rem", ml: 1, cursor: "pointer" }}
              />
            </span>
          </Box>
        </Box>
      )}
      {singleDeviceStore.blockVisibility && showMotor && (
        <div>
          <SamServo
            getPosition={
              deviceInTestMode
                ? () => device.testPosition
                : () => device._position
            }
          />
        </div>
      )}
    </>
  );
}

export default observer(Servo);
