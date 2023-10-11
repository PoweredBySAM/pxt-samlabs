import React, { useEffect } from "react";
import { Servo as SamServo } from "@samlabs/samblocks";
import ServoMotorDevice from "src/Store/ServoMotorDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Servo({ device }: { device: ServoMotorDevice }) {
  const [showMotor, setShowMotor] = React.useState(false);
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { deviceInTestMode } = singleDeviceStore || {};
  const { addEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  useEffect(() => {
    setShowMotor(false);
    setTimeout(() => {
      setShowMotor(true);
    }, 0);
  }, [deviceInTestMode]);

  const virtualEvents = ["valueChanged"];
  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
  }, []);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);

  const handleStep = (step: number) => {
    singleDeviceStore.setTestPosition(step);
  };
  return (
    <>
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
      {singleDeviceStore.blockVisibility && showMotor && (
        <div>
          <SamServo
            getPosition={() => device._position}
            getColor={() =>
              device.Color ? hexToRGBA(device.Color) : undefined
            }
          />
        </div>
      )}
    </>
  );
}

export default observer(Servo);
