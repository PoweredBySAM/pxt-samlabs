import React from "react";
import { SamDeviceStoreType } from "../SAMDevices/Types/SAMDeviceTypes";

function useControllerEvents(device: SamDeviceStoreType, customDeviceEventsHandler: any) {
  const bluetoothController: any = device.bluetoothController;
  const virtualController: any = device.virtualController;
  const hasCustomEvents = customDeviceEventsHandler !== undefined;
  const addBluetoothEventsConditional = hasCustomEvents && bluetoothController
  const addVirtualEventsConditional = hasCustomEvents && virtualController

  const addEvents = (bluetoothEvents: string[], virtualEvents: string[]) => {
    !!customDeviceEventsHandler && bluetoothEvents.forEach((event: string) => {
      bluetoothController.on(event, (value: any) => {
        customDeviceEventsHandler(event, value);
      });
    });
    !!customDeviceEventsHandler && virtualEvents.forEach((event: string) => {
      virtualController.on(event, (value: any) => {
        customDeviceEventsHandler(event, value);
      });
    });
  };

  const removeEvents = (bluetoothEvents: string[], virtualEvents: string[]) => {
    !!customDeviceEventsHandler && bluetoothEvents.forEach((event) => {
      bluetoothController.off(event);
    });
    !!customDeviceEventsHandler && virtualEvents.forEach((event) => {
      virtualController.off(event);
    });
  };
  return { addEvents, removeEvents };
}

export default useControllerEvents;
