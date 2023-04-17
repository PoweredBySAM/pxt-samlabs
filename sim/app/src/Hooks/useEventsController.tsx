import React from 'react'


function useControllerEvents(device:any) {
  const bluetoothController:any = device.bluetoothController
  const virtualController:any = device.virtualController

    const handleEvents = (event:string,deviceId:string) => {
      console.log(event,deviceId)
    }
    const addEvents = (bluetoothEvents:string[],virtualEvents:string[]) => {
      bluetoothEvents.forEach((event:string) => {
        bluetoothController.on(event, () => {
          handleEvents(event, device.id);
        });
      });
      virtualEvents.forEach((event) => {
        virtualController.on(event, () => {
          handleEvents(event, device.id);
        });
      });
    };
    const removeEvents = (bluetoothEvents:string[],virtualEvents:string[]) => {
      bluetoothEvents.forEach((event) => {
        bluetoothController.off(event);
      });
      virtualEvents.forEach((event) => {
        virtualController.off(event);
      });
    };
  return {handleEvents,addEvents,removeEvents}
}

export default useControllerEvents