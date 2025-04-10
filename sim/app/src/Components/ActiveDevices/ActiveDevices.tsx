import React from "react";
import ActiveDeviceItem from "./ActiveDeviceItem";
import { observer } from "mobx-react";
import { SamDeviceStoreType } from "src/SAMDevices/Types/SAMDeviceTypes";
import { useStores } from "src/Hooks/useStores";

const ActiveDevices = ({
  showActiveDevices,
}: {
  showActiveDevices?: boolean;
}) => {
  const { devicesStore } = useStores();
  const devices: SamDeviceStoreType[] = devicesStore.devices;
  return (
    <div
      className={
        showActiveDevices
          ? "overflow-y-scroll h-[95vh] pb-10 scrollbar-thin"
          : "invisible"
      }
    >
      {devices.map((device: SamDeviceStoreType) => (
        <ActiveDeviceItem key={device._deviceId} device={device} />
      ))}
    </div>
  );
};
export default observer(ActiveDevices);
