import React from "react";
import { SamDeviceStoreType } from "../SAMDevices/Types/SAMDeviceTypes";

function useControllerEvents(device: SamDeviceStoreType, customDeviceEventsHandler: any) {
  const bluetoothController: any = device.bluetoothController;
  const virtualController: any = device.virtualController;

  const addEvents = (bluetoothEvents: string[], virtualEvents: string[]) => {
    bluetoothEvents.forEach((event: string) => {
      bluetoothController.on(event, (value: any) => {
        customDeviceEventsHandler(event, value);
      });
    });
    virtualEvents.forEach((event: string) => {
      virtualController.on(event, (value: any) => {
        customDeviceEventsHandler(event, value);
      });
    });
  };

  const removeEvents = (bluetoothEvents: string[], virtualEvents: string[]) => {
    bluetoothEvents.forEach((event) => {
      bluetoothController.off(event);
    });
    virtualEvents.forEach((event) => {
      virtualController.off(event);
    });
  };
  return { addEvents, removeEvents };
}

export default useControllerEvents;
