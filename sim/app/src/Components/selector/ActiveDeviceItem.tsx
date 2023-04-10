import { Box } from '@mui/material';
import React from 'react'

function ActiveDeviceItem({device}:{device?:any}) {
    const {deviceAnimation: DeviceAnimation, deviceId, deviceName,deviceType,initialProps} = device || {};

  return (
    <Box sx={{ display: "flex", justifyContent: "center",my:5 }}>
        <div>
            <DeviceAnimation {...initialProps}/>
        </div>
    </Box>
  );
}

export default ActiveDeviceItem