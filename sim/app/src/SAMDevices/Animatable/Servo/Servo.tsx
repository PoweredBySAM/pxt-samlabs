import React, { useEffect } from "react";
import { Servo as SamServo } from "@samlabs/samblocks";
import ServoMotorDevice from "src/Store/ServoMotorDevice";
import useBasicEvents from "src/Hooks/useBasicEvents";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";
import useEventsController from "src/Hooks/useEventsController";
import { observer } from "mobx-react";
import { bluetoothEvents, hexToRGBA } from "src/SAMDevices/Animatable";
import usePxtToSimEvents from "src/Hooks/usePxtToSimEvents";

function Servo({ device }: { device: ServoMotorDevice }) {
  const [showMotor, setShowMotor] = React.useState(false);
  const { handleBasicControllerEvents } = useBasicEvents(device);
  const { singleDeviceStore } = useSingleDeviceStore(device);
  const { deviceInTestMode } = singleDeviceStore || {};
  const { addEvents } = useEventsController(
    device,
    handleBasicControllerEvents
  );
  const { addPxtEvents, removePxtEvents } = usePxtToSimEvents(device);

  useEffect(() => {
    setShowMotor(false);
    setTimeout(() => {
      setShowMotor(true);
    }, 0);
  }, [deviceInTestMode]);

  const virtualEvents = ["valueChanged"];
  useEffect(() => {
    addEvents(bluetoothEvents, virtualEvents);
  }, []);
  useEffect(() => {
    addPxtEvents();
    return () => {
      removePxtEvents();
    };
  }, []);

  const handleStep = (step: number) => {
    singleDeviceStore.setTestPosition(step);
  };
  return (
    <>
      <div className="flex justify-center">
        <div>
          <span onClick={() => handleStep(-10)}>
            <div className="inline-block text-2xl mr-4 cursor-pointer">⏮</div>
          </span>
          <span onClick={() => handleStep(10)}>
            <div className="inline-block text-2xl ml-4 cursor-pointer">⏭</div>
          </span>
        </div>
      </div>
      {singleDeviceStore.blockVisibility && showMotor && (
        <div>
          <SamServo
            getPosition={() => device._position}
            getColor={() =>
              device.Color ? hexToRGBA(device.Color) : undefined
            }
          />
        </div>
      )}
    </>
  );
}

export default observer(Servo);
