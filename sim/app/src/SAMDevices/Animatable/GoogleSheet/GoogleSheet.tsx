import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import { Box } from "@mui/material";
import MicrobitDevice from "src/Store/MicrobitDevice";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";
const GoogleSheet = ({ device }: { device: MicrobitDevice }) => {
  const { singleDeviceStore } = useSingleDeviceStore(device);

  const { blockVisibility } = singleDeviceStore || {};
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);
  return (
    <div>
      {blockVisibility && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pl: 2,
            pr: 2,
            pb: 2,
          }}
        >
          Yellow
        </Box>
      )}
    </div>
  );
};

export default observer(GoogleSheet);
