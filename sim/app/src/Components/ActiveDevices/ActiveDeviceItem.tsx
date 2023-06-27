import { Box } from "@mui/material";
import React from "react";
import { getVirtualDevice } from "../../SAMDevices/Animatable";
import FullSimDeviceWrapper from "../../SAMDevices/Common/FullSimDeviceWrapper";
import {MicrobitDeviceType, SamDeviceStoreType, SamVirtualDeviceType} from "../../SAMDevices/Types/SAMDeviceTypes";
import { observer } from "mobx-react";
import { useSingleDeviceStore } from "../../Hooks/useSingleDeviceStore";

function ActiveDeviceItem({ device }: { device: SamDeviceStoreType }) {
  const { virtualInteractionComponentName } = device || {};
  const {singleDeviceStore} = useSingleDeviceStore(device)

  const VirtualInteractionComponent:SamVirtualDeviceType | MicrobitDeviceType = getVirtualDevice(
    virtualInteractionComponentName
  );

  return (
    <>
    {!singleDeviceStore.deleted &&
    <FullSimDeviceWrapper device={device}>
      <Box sx={{ display: "flex", justifyContent: "center",  }}>
        <div>
          {virtualInteractionComponentName && (
            <VirtualInteractionComponent device={device} />
          )}
        </div>
      </Box>
    </FullSimDeviceWrapper>}
    </>
  );
}

export default observer( ActiveDeviceItem);
