import React from 'react'
import {  Card, Grid, Typography } from '@mui/material'
import styles from './SelectorComponent.module.css'


function DeviceMenuItem({deviceData, addDevice}:{deviceData?:any, addDevice?:any}) {
    const {label,icon:Icon} = deviceData;

    return (
      <Card elevation={1} className={styles.option} sx={{my:2,mx:1}}  onClick={()=>addDevice(deviceData)} >
        <Grid container columns={12} spacing={1} sx={{m:1}}>
          <Grid item xs={4} sx={{backgroundColor:"#26D0C4",p:1,display:"flex",alignItems:"center",borderRadius:"5px"}}>
          {Icon}
          </Grid>
          <Grid item xs={8} sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Typography variant="h6" sx={{p:0}}>{label?.name}</Typography>
            <Typography variant="subtitle2" sx={{color:"#d7d7d7"}}>{label?.maker}</Typography>
          </Grid>
          
        </Grid>

      </Card>
    )  
}

export default DeviceMenuItem