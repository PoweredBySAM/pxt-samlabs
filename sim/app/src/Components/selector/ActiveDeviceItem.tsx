import { Box } from "@mui/material";
import React from "react";
import { getVirtualDevice } from "../../SAMDevices/Animatable";
import FullSimDeviceWrapper from "../../SAMDevices/Common/FullSimDeviceWrapper";

function ActiveDeviceItem({ device }: { device?: any }) {
  const { virtualInteractionComponentName } = device || {};

  const VirtualInteractionComponent = getVirtualDevice(
    virtualInteractionComponentName
  );

  return (
    <FullSimDeviceWrapper device={device}>
      <Box sx={{ display: "flex", justifyContent: "center",  }}>
        <div>
          {virtualInteractionComponentName && (
            <VirtualInteractionComponent device={device} />
          )}
        </div>
      </Box>
    </FullSimDeviceWrapper>
  );
}

export default ActiveDeviceItem;
