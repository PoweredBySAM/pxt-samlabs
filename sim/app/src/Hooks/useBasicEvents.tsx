import React from "react";

import { SamDeviceStoreType } from "../SAMDevices/Types/SAMDeviceTypes";
import { useSingleDeviceStore } from "./useSingleDeviceStore";
enum BasicEvents {
  BATTERY_LEVEL_CHANGE = "batteryLevelChange",
  CONNECTED = "connected",
  CONNECTING = "connecting",
  DISCONNECTED = "disconnected",
  VALUE_CHANGED = "valueChanged",
  TOSIM_DEVICE_VALUE_CHANGED = "TOSIM_DEVICE_VALUE_CHANGED",
}
export type BasicEventType =
  | "connecting"
  | "connected"
  | "batteryLevelChange"
  | "disconnected";
function useBasicEvents(device: SamDeviceStoreType) {
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const handleBasicControllerEvents = (event: BasicEventType, value: any) => {
    switch (event) {
      case BasicEvents.BATTERY_LEVEL_CHANGE: {
        return singleDeviceStore.updateBatteryLevel(value);
      }
      case BasicEvents.CONNECTED: {
        return singleDeviceStore.updateIsconnected(true);
      }
      case BasicEvents.CONNECTING: {
        return singleDeviceStore.updateIsconnecting(true);
      }
      case BasicEvents.DISCONNECTED: {
        return singleDeviceStore.updateIsconnected(false);
      }
      case BasicEvents.TOSIM_DEVICE_VALUE_CHANGED: {
        
      }

      default: {
        return "";
      }
    }
  };
  return { handleBasicControllerEvents };
}

export default useBasicEvents;
