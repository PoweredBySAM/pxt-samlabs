import React from "react";
import CompactSimDevice from "./CompactSimDevice";
import { getDeviceIcon } from "../Icons";
import { deviceNameType } from "../Icons/deviceIconTypes";
import { observer } from "mobx-react";
import { useSingleDeviceStore } from "src/Hooks/useSingleDeviceStore";

const FullSimDeviceWrapper = observer(
  ({ device, children }: { device: any; children: any }) => {
    const { singleDeviceStore } = useSingleDeviceStore(device);
    const deviceName = device.restProps?.labels.name as deviceNameType;
    const Icon = getDeviceIcon(deviceName, {
      width: "3rem !important",
      height: "3rem !important",
    });
    const toggleVisibility = () => {
      singleDeviceStore.toggleVisibility();
    };

    return (
      <div
        className={`mb-2.5 shadow rounded p-4 ${
          device.deviceInTestMode
            ? "border border-[#D04226]"
            : "border border-[#d7d7d7]"
        }`}
      >
        <div>
          <CompactSimDevice
            device={device}
            labels={device.restProps?.labels}
            Icon={Icon}
            toggleVisibility={toggleVisibility}
            visibility={device.blockVisibility}
            isInTestMode={device.deviceInTestMode}
          />
        </div>
        <div className="w-full">{children}</div>
      </div>
    );
  }
);

export default FullSimDeviceWrapper;
