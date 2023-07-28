import { Alert, Box, Snackbar, Typography } from "@mui/material";
import React from "react";
import styles from "./SelectorComponent.module.css";
import { getDeviceIcon } from "../../SAMDevices/Icons";
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { deviceLabels } from "../../Constants/DeviceLabel";
import { AlertColor} from '@mui/material/Alert';
import {
  DeviceMenuItemType,
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
    const [open, setOpen] = React.useState(false);
    const [pairing,setPairing] = React.useState(false);
    const [message, setMessage] = React.useState<{message:string; severity:AlertColor}>({message:'',severity:'success'});
    const {connectBTDevice} = useAddNewBTDevice(showAlert,togglePairing);

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
    function togglePairing (){
      setPairing((prev) => !prev);
    };

    function showAlert(err:any) {
      if(!err){
      setMessage({message:"Bluetooth Device Paired", severity:"success"});
      setOpen(true);}
      else{
        setMessage({message:"Error Pairing Bluetooth device", severity:"error"});
        setOpen(true);
      }
    };

    const handleAddBlueTooth = async (item: DeviceMenuItemType) => {
      connectBTDevice(item.label.name);
      handleClose();
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
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={message?.severity}
            sx={{ width: "100%" }}
          >
            {message?.message}
          </Alert>
        </Snackbar>
      </Box>
      {
        <>
          <div
            className={styles["selected-option"]}
            onClick={handleshowOptions}
          >
            <Box sx={localStyles().inputToggle}>
              <BluetoothIcon sx={{ fontSize: "1.6rem" }} />
              <Typography variant="h6">Pair Device</Typography>
            </Box>
          </div>
          <div
            className={showOptions ? styles.options : styles["options-none"]}
          >
            <Box className={styles.scrollable}>
              {menuItemData.map((item: DeviceMenuItemType, index: number) => (
                <Box
                  className={styles.devicename}
                  onClick={() => {
                    handleAddBlueTooth(item);
                  }}
                  key={item.label.name}
                >
                  <Typography variant="h6">{item.label.name}</Typography>
                </Box>
              ))}
            </Box>
          </div>
        </>
      }
    </div>
  );
}

export default BTDeviceSelector