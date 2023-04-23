import { Box, Slider, Switch, Typography } from '@mui/material'
import React from 'react'
import { observer } from 'mobx-react';
import toFixify from '../../Utils/toFixify';

const ToggleSwitchHOC=({setValue,currentValue,children,controlsVisibility}: {setValue:any, currentValue:number,children:any,controlsVisibility:boolean})=> {

  return (
    <Box sx={{ width: "100% !important" }}>
      <Box sx={{ width: "100% ", display: "flex", justifyContent: "center" }}>
        {controlsVisibility && (
          <Switch
            checked={!!currentValue}
            onChange={setValue}
            color="default"
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {children}
      </Box>
    </Box>
  );
}

export default observer(ToggleSwitchHOC)