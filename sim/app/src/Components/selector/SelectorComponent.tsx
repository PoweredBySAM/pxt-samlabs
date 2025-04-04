import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./SelectorComponent.module.css";
import { getDeviceIcon } from "../../SAMDevices/Icons";
import { deviceLabels } from "../../Constants/DeviceLabel";
import DeviceMenuItem from "./DeviceMenuItem";
import AddIcon from "@mui/icons-material/Add";
import {
  DeviceMenuItemType,
} from "../../SAMDevices/Types/SAMDeviceTypes";
import { deviceNameType } from "../../SAMDevices/Icons/deviceIconTypes";

const localStyles = () => ({
  inputToggle: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    border: "solid 1px #c8c8c8",
    boxShadow: "4px",
    backgroundColor: "#26D0C4",
    color: "#ffffff",
    py: 1,
    px: 2,
    alignItems: "center",
  },
});

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
        <Box sx={localStyles().inputToggle}>
          <AddIcon sx={{ fontSize: "1.6rem" }} />
          <Typography variant="h6">Add Device</Typography>
        </Box>
      </div>
      <div className={showOptions ? styles.options : styles["options-none"]}>
        <Box className={styles.scrollable}>
          {menuItemData.map((deviceData: DeviceMenuItemType) => (
            <DeviceMenuItem
              deviceData={deviceData}
              addDevice={addDevice}
              key={deviceData?.label?.name}
              closeOptions={handleshowOptions}
            />
          ))}
        </Box>
      </div>
    </div>
  );
}

export default SelectorComponent;
