import React from "react";
import { getVirtualDevice } from "src/SAMDevices/Animatable";
import FullSimDeviceWrapper from "src/SAMDevices/Common/FullSimDeviceWrapper";
import {
  MicrobitDeviceType,
  SamDeviceStoreType,
  SamVirtualDeviceType,
} from "src/SAMDevices/Types/SAMDeviceTypes";
import { observer } from "mobx-react";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";

function ActiveDeviceItem({ device }: { device: SamDeviceStoreType }) {
  const { virtualInteractionComponentName } = device || {};
  const { singleDeviceStore } = useSingleDeviceStore(device);

  const VirtualInteractionComponent: SamVirtualDeviceType | MicrobitDeviceType =
    getVirtualDevice(virtualInteractionComponentName);

  return (
    <>
      {!singleDeviceStore.deleted && (
        <FullSimDeviceWrapper device={device}>
          <div className="flex justify-center">
            <div>
              {virtualInteractionComponentName && (
                <VirtualInteractionComponent device={device} />
              )}
            </div>
          </div>
        </FullSimDeviceWrapper>
      )}
    </>
  );
}

export default observer(ActiveDeviceItem);
