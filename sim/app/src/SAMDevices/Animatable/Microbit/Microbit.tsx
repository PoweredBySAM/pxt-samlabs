import React from "react";
import { Microbit as BBCMicrobit } from "@samlabs/samblocks";
import { MicrobitProps } from "@samlabs/samblocks/dist/CustomDevices/Microbit";
import { observer } from "mobx-react";
import { bluetoothEvents } from "../index";
const Microbit = ({ device }: { device: MicrobitProps }) => {
  return (
    <div>
      <BBCMicrobit
        ledArray={[
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]}
        aPressed={false}
        bPressed={false}
        pin0={false}
        pin1={false}
        pin2={false}
        pin3={false}
        pinGND={false}
        onAButtonDown={() => {}}
        onAButtonUp={() => {}}
        onBButtonDown={() => {}}
        onBButtonUp={() => {}}
      />
    </div>
  );
};

export default observer(Microbit);
