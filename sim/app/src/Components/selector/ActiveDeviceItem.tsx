import { Box } from '@mui/material';
import React from 'react'
import { getVirtualDevice } from '../../SAMDevices/Animatable';

function ActiveDeviceItem({device}:{device?:any}) {
    const {virtualInteractionComponentName} = device || {};

    const VirtualInteractionComponent = getVirtualDevice(virtualInteractionComponentName);

  return (
    <Box sx={{ display: "flex", justifyContent: "center",my:5 }}>
        <div>
            {virtualInteractionComponentName && <VirtualInteractionComponent device={device}/>}
        </div>
    </Box>
  );
}

export default ActiveDeviceItem