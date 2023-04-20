import React, { useEffect } from 'react'
import { DCMotor as SamDCMotor} from "@samlabs/samblocks";
import DCMotorDevice from '../../../Store/DCMotorDevice';
import useEventsController from '../../../Hooks/useEventsController';
import { useSingleDeviceStore } from '../../../Hooks/useSingleDeviceStore';
import useBasicEvents from '../../../Hooks/useBasicEvents';
import { observer } from 'mobx-react';


function DCMotor({ device }: { device: DCMotorDevice }) {
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { addEvents, removeEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { singleDeviceStore } = useSingleDeviceStore(device);

  const bluetoothEvents = [
    "connecting",
    "connected",
    "batteryLevelChange",
    "disconnected",
  ];
  const virtualEvents = ["valueChanged"];

  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
    return () => {
      removeEvents(bluetoothEvents, virtualEvents);
    };
  }, []);

  return (
    <>
      {singleDeviceStore.blockVisibility && (
        <div>
          <SamDCMotor getMotorSpeed={()=>device.getspeed()} />
        </div>
      )}
    </>
  );
}

export default observer(DCMotor) 

