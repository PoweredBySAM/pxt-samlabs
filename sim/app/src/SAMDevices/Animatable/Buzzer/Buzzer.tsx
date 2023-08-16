import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Buzzer as SamBuzzer } from "@samlabs/samblocks";
import useEventsController from "src/Hooks/useEventsController";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import { Box } from "@mui/material";
import BuzzerDevice from "src/Store/BuzzerDevice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Buzzer({ device }: { device: BuzzerDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { blockVisibility, deviceInTestMode } = singleDeviceStore || {};
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );

  const virtualEvents = ["valueChanged"];

  const handleTestPlay = () => {
    singleDeviceStore.testTone("start");
    setTimeout(() => {
      singleDeviceStore.testTone("stop");
    }, 5000);
  };
  console.log(blockVisibility, "blockVisibility");

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
  }, []);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);
  return (
    <>
      <Box>
        {deviceInTestMode && blockVisibility && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
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
          <SamBuzzer
            getIsActive={
              deviceInTestMode
                ? () => singleDeviceStore.testSoundActive
                : () => singleDeviceStore.isActive
            }
            getColor={() =>
              device.Color ? hexToRGBA(device.Color) : undefined
            }
          />
        </Box>
      )}
    </>
  );
}

export default observer(Buzzer);
