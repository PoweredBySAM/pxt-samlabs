import React from "react";
import { buttonEventType } from "../SAMDevices/Animatable/Button/types";
enum BasicEvents {
  BATTERY_LEVEL_CHANGE = "batteryLevelChange",
  CONNECTED = "connected",
  CONNECTING = "connecting",
  DISCONNECTED = "disconnected",
  VALUE_CHANGED = "valueChanged",
}

function useBasicEvents(device: any) {
  const handleBasicControllerEvents = (event: buttonEventType, value: any) => {
    switch (event) {
      case BasicEvents.BATTERY_LEVEL_CHANGE: {
        return device.updateBatteryLevel(value);
      }
      case BasicEvents.CONNECTED: {
        return device.updateIsconnected(true);
      }
      case BasicEvents.CONNECTING: {
        return device.updateIsconnecting(true);
      }
      case BasicEvents.DISCONNECTED: {
        return device.updateIsconnected(false);
      }

      default : {
        return ''
      }
    }
  };
  return { handleBasicControllerEvents };
}

export default useBasicEvents;
