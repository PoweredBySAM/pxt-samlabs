import React from "react";
import { BasicEventType } from "../SAMDevices/Animatable/Button/types";
import { SamDeviceStoreType } from "../SAMDevices/Types/SAMDeviceTypes";
import { useSingleDeviceStore } from "./useSingleDeviceStore";
enum BasicEvents {
  BATTERY_LEVEL_CHANGE = "batteryLevelChange",
  CONNECTED = "connected",
  CONNECTING = "connecting",
  DISCONNECTED = "disconnected",
  VALUE_CHANGED = "valueChanged",
}

function useBasicEvents(device:SamDeviceStoreType) {
  const {singleDeviceStore} = useSingleDeviceStore(device)
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

      default : {
        return ''
      }
    }
  };
  return { handleBasicControllerEvents };
}

export default useBasicEvents;
