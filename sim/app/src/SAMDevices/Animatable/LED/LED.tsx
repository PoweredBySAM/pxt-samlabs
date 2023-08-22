import React, { useEffect } from "react";
import { LED as SamLED } from "@samlabs/samblocks";
import { observer } from "mobx-react";
import LEDDevice from "src/Store/LEDDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { Box } from "@mui/material";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function LED({ device }: { device: LEDDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  const testColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"];
  const { blockVisibility, deviceInTestMode, ledColor, testLEDColor } =
    singleDeviceStore || {};

  const virtualEvents = ["valueChanged"];

  const handleTestColorChange = (color: string) => {
    singleDeviceStore.setLEDTestColor(color);
  };

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
  }, []);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);

  return (
    <>
      {blockVisibility && deviceInTestMode && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {testColors.map((color) => (
            <Box
              sx={{
                height: "1rem",
                backgroundColor: color,
                width: "20%",
                cursor: "pointer",
                mb: 2,
              }}
              onClick={() => handleTestColorChange(color)}
            ></Box>
          ))}
        </Box>
      )}
      {blockVisibility && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Box>
            <SamLED
              colorIndicator={{
                color: deviceInTestMode ? testLEDColor : ledColor,
                opacity: 100,
              }}
              getColor={() =>
                device.Color ? hexToRGBA(device.Color) : undefined
              }
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default observer(LED);
