import React from "react";
import CompactSimDevice from "./CompactSimDevice";
import { Box, Card } from "@mui/material";
import { getDeviceIcon } from "../Icons";
import { deviceNameType } from "../Icons/deviceIconTypes";
import { observer } from "mobx-react";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";

const FullSimDeviceWrapper = observer(
  ({ device, children }: { device: any; children: any }) => {
    const { singleDeviceStore } = useSingleDeviceStore(device);
    const deviceName = device.restProps?.labels.name as deviceNameType;
    const Icon = getDeviceIcon(deviceName, {
      width: "3rem !important",
      height: "3rem !important",
    });
    const toggleVisibility = () => {
      singleDeviceStore.toggleVisibility();
    };

    return (
      <Card
        elevation={1}
        style={{ marginBottom: 10 }}
        sx={
          device.deviceInTestMode
            ? { border: "1px solid #D04226" }
            : { border: "1px solid #d7d7d7" }
        }
      >
        <Box>
          <CompactSimDevice
            device={device}
            labels={device.restProps?.labels}
            Icon={Icon}
            toggleVisibility={toggleVisibility}
            visibility={device.blockVisibility}
            isInTestMode={device.deviceInTestMode}
          />
        </Box>
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Card>
    );
  }
);

export default FullSimDeviceWrapper;
