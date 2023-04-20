import { Box } from "@mui/material";
import React from "react";
import { getVirtualDevice } from "../../SAMDevices/Animatable";
import FullSimDeviceWrapper from "../../SAMDevices/Common/FullSimDeviceWrapper";
import { SamDeviceStoreType, SamVirtualDeviceType } from "../../SAMDevices/Types/SAMDeviceTypes";

function ActiveDeviceItem({ device }: { device: SamDeviceStoreType }) {
  const { virtualInteractionComponentName } = device || {};

  const VirtualInteractionComponent:SamVirtualDeviceType = getVirtualDevice(
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
