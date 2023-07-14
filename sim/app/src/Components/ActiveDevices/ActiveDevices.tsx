import React from "react";
import ActiveDeviceItem from "./ActiveDeviceItem";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { SamDeviceStoreType } from "src/SAMDevices/Types/SAMDeviceTypes";
import { useStores } from "src/Hooks/useStores";
const additionalStyles = {
  overflow: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
};
const ActiveDevices =
  ({ showActiveDevices }: { showActiveDevices?: boolean }) => {
    const { devicesStore } = useStores();
    const devices: SamDeviceStoreType[] = devicesStore.devices;
    return (
      <Box
        sx={
          showActiveDevices
            ? {
                overflowY: "scroll",
                height: "95vh",
                pb: 10,
                ...additionalStyles,
              }
            : { visibility: "hidden" }
        }
      >
        {devices.map((device: SamDeviceStoreType) => (
          <ActiveDeviceItem key={device.id} device={device} />
        ))}
      </Box>
    );
  }
;
export default observer(ActiveDevices);
