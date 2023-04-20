import { Box, Typography} from '@mui/material';
import React from 'react'
import styles from './SelectorComponent.module.css'
import {  getDeviceIcon } from '../../SAMDevices/Icons';
import { deviceLabels } from '../../Constants/DeviceLabel';
import DeviceMenuItem from './DeviceMenuItem';
import AddIcon from '@mui/icons-material/Add';

function SelectorComponent({devices,addDevice, toggleActiveDevicesVisibility}:{devices?:any, addDevice?:any, toggleActiveDevicesVisibility?:any}) {
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const deviceKeys = Object.keys(deviceLabels)
  const menuItemData = deviceKeys.map((key) => {
      return {
          label: deviceLabels[key as keyof typeof deviceLabels],
          icon: getDeviceIcon(key as keyof typeof deviceLabels)
      }
  })
  

  const handleshowOptions = () => {
    setShowOptions(prev=>!prev);
    toggleActiveDevicesVisibility()
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles["selected-option"]} onClick={handleshowOptions}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width:"100%",
            borderRadius: 5,
            border: "solid 1px #c8c8c8",
            boxShadow:"4px",
            backgroundColor: "#26D0C4",
            color: "#ffffff",
            py: 1,
            px: 2,
            alignItems: "center",
          }}
        >
          <AddIcon sx={{fontSize:"1.6rem"}} />
          <Typography variant="h6">Add Device</Typography>
        </Box>
      </div>
      <div className={showOptions ? styles.options : styles["options-none"]}>
        <Box className={styles.scrollable}>
          {menuItemData.map((deviceData: any) => (
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

export default SelectorComponent