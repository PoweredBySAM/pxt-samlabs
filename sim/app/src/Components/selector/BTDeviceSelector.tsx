import { Alert, Box, Snackbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./SelectorComponent.module.css";
import { getDeviceIcon } from "../../SAMDevices/Icons";
import DeviceMenuItem from "./DeviceMenuItem";
import AddIcon from "@mui/icons-material/Add";
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { deviceLabels } from "../../Constants/DeviceLabel";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  DeviceMenuItemType,
  IDeviceLabelObject,
} from "../../SAMDevices/Types/SAMDeviceTypes";
import { deviceNameType } from "../../SAMDevices/Icons/deviceIconTypes";
import useAddNewBTDevice from "src/Hooks/useAddNewBTDevice";

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



function BTDeviceSelector({
  addDevice,
  toggleActiveDevicesVisibility,
}: {
  addDevice?: (arg0: DeviceMenuItemType) => void;
  toggleActiveDevicesVisibility: () => void;
}) {
    const [showOptions, setShowOptions] = React.useState<boolean>(false);
    const {connectBTDevice} = useAddNewBTDevice();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
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

    const handleAddBlueTooth = async (item: DeviceMenuItemType) => {
      const res = await connectBTDevice(item.label.name);
      console.log(res, "res");
      if (res.status === "error") {
        //   setMessage(res);
        setOpen(true);
        return;
      }
      setMessage("Bluetooth Device Added");
      setOpen(true);
    };

      
      const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
      ) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
        handleshowOptions();
      };
  return (
    <div className={styles.dropdown}>
        <Box sx={{ width: 500 }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
      <div className={styles["selected-option"]} onClick={handleshowOptions}>
        <Box sx={localStyles().inputToggle}>
          <BluetoothIcon sx={{ fontSize: "1.6rem" }} />
          <Typography variant="h6">Connect a Device</Typography>
        </Box>
      </div>
      <div className={showOptions ? styles.options : styles["options-none"]}>
        <Box className={styles.scrollable}>
          {menuItemData.map((item: DeviceMenuItemType, index: number) => (
            <Box className = {styles.devicename} onClick={()=>{handleAddBlueTooth(item)}}>{item.label.name}</Box>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default BTDeviceSelector