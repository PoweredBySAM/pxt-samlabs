import { Box, Grid } from '@mui/material';
import React from 'react'
import styles from './SelectorComponent.module.css'
import { getAllDeviceIcons, getDeviceIcon } from '../../Devices/DeviceIcons';
import { deviceLabels } from '../../Constants/DeviceLabel';
import DeviceMenuItem from './DeviceMenuItem';

function SelectorComponent({devices}:{devices?:any}) {
  const [selectedDevice, setSelectedDevice] = React.useState<any>(null);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const deviceKeys = Object.keys(deviceLabels)
  const menuItemData = deviceKeys.map((key) => {
      return {
          label: deviceLabels[key as keyof typeof deviceLabels],
          icon: getDeviceIcon(key as keyof typeof deviceLabels)
      }
  })

  const handleshowOptions = () => {
    console.log("hi")
    setShowOptions(prev=>!prev);
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles['selected-option']} onClick = {handleshowOptions} >
        <span style={{width:"100%"}}>Select  Device</span>
      </div>
      <div className={showOptions ? styles.options : styles["options-none"]}  >
        <Box className={styles.scrollable}>
          {menuItemData.map((deviceData) =>(
            <DeviceMenuItem deviceData={deviceData}/>
          ))}
        </Box>
   
      </div>
    </div>
  );
}

export default SelectorComponent