import React, { useEffect } from "react";
import { DCMotor as SamDCMotor } from "@samlabs/samblocks";
import DCMotorDevice from "src/Store/DCMotorDevice";
import useEventsController from "src/Hooks/useEventsController";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { observer } from "mobx-react";
import { Box, Slider, Typography } from "@mui/material";
import { customSliderStyle } from "src/SAMDevices/Common/commonJsStyles";
import { bluetoothEvents } from "../index";

function DCMotor({ device }: { device: DCMotorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const [showMotor, setShowMotor] = React.useState(false);

  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { singleDeviceStore } = useSingleDeviceStore(device);

  const { blockVisibility, deviceInTestMode, testModeSpeed, speed } =
    singleDeviceStore || {};

  const handleTestValues = (event: any, newValue: number | number[]) => {
    singleDeviceStore.setTestModeSpeed(newValue as number);
  };

  const virtualEvents = ["valueChanged"];

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      // removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  const motorSpeed: () => number = deviceInTestMode
    ? () => testModeSpeed
    : () => speed;

  //temp effect to by-pass unnecessary useCallBack in DCMotor
  useEffect(() => {
    setShowMotor(false);
    setTimeout(() => {
      setShowMotor(true);
    }, 0);
  }, [testModeSpeed, speed]);

  return (
    <>
      <Box sx={{ width: "100% " }}>
        {deviceInTestMode && blockVisibility && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2">Min</Typography>
            <Slider
              size="small"
              min={0}
              max={100}
              aria-label="Temperature"
              value={singleDeviceStore.testModeSpeed}
              onChange={handleTestValues}
              sx={{ ...customSliderStyle, mx: 2 }}
              step={10}
              marks
            />
            <Typography variant="subtitle2">Max</Typography>
          </Box>
        )}
      </Box>
      {blockVisibility && showMotor && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <div>
            <SamDCMotor getMotorSpeed={motorSpeed} />
          </div>
        </Box>
      )}
    </>
  );
}

export default observer(DCMotor);
