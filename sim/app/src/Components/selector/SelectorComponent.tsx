import React from "react";
import styles from "./SelectorComponent.module.css";
import { getDeviceIcon } from "../../SAMDevices/Icons";
import { deviceLabels } from "../../Constants/DeviceLabel";
import DeviceMenuItem from "./DeviceMenuItem";
import {
  DeviceMenuItemType,
} from "../../SAMDevices/Types/SAMDeviceTypes";
import { deviceNameType } from "../../SAMDevices/Icons/deviceIconTypes";

function SelectorComponent({
  addDevice,
  toggleActiveDevicesVisibility,
}: {
  addDevice?: (arg0: DeviceMenuItemType) => void;
  toggleActiveDevicesVisibility: () => void;
}) {
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const deviceKeys: deviceNameType[] = Object.keys(
    deviceLabels
  ) as deviceNameType[];
  const menuItemData: DeviceMenuItemType[] = deviceKeys.map(
    (key: deviceNameType) => {
      return {
        label: deviceLabels[key],
        icon: getDeviceIcon(key),
      };
    }
  );
  const handleshowOptions = (): void => {
    setShowOptions((prev) => !prev);
    toggleActiveDevicesVisibility();
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles["selected-option"]} onClick={handleshowOptions}>
        <div className="flex justify-center w-full rounded border border-[#c8c8c8] shadow-sm bg-[#26D0C4] text-white py-1 px-2 items-center">
          <div className="text-2xl">+</div>
          <div className="text-lg ml-2">Add Device</div>
        </div>
      </div>
      <div className={showOptions ? styles.options : styles["options-none"]}>
        <div className={styles.scrollable}>
          {menuItemData.map((deviceData: DeviceMenuItemType) => (
            <DeviceMenuItem
              deviceData={deviceData}
              addDevice={addDevice}
              key={deviceData?.label?.name}
              closeOptions={handleshowOptions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectorComponent;
