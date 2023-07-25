import React, { FormEvent } from 'react'
import {  Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import styles from '../../Components/selector/SelectorComponent.module.css'
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import { LightTooltip } from './LightToolTip';
import MiniMenu from './MiniMenu';
import ConstructionIcon from '@mui/icons-material/Construction';


function CompactSimDevice({
  Icon,
  controller,
  visibility,
  toggleVisibility,
  labels,
  toggleTestMode,
  removeDevice,
  isInTestMode,
  varNameInPxt
}: {
  Icon?: any;
  controller?: any;
  visibility: any;
  toggleVisibility?: any;
  labels?: any;
  toggleTestMode?: any;
  removeDevice?: any;
  isInTestMode: boolean;
  varNameInPxt?: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelection = (e: any, value: any) => {
    console.log(value, "value");
  };
  const handleClose = (item?: string) => {
    setAnchorEl(null);
    switch (item) {
      case "Remove from Project":
        return removeDevice();
      default:
        return null;
    }
  };

  return (
    <Box className={styles.option} sx={{ my: 2, mx: 1 }}>
      <Grid container columns={12} spacing={0} sx={{ m: 1 }}>
        <Grid
          item
          xs={3}
          sx={{
            backgroundColor: isInTestMode ?"#c4c4c4": "#26D0C4",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            color: "#ffffff !important",
          }}
        >
          <Box>{Icon}</Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ padding: "0 !important" }}>
            {labels?.displayName} {varNameInPxt}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#d7d7d7", padding: "0 !important" }}
          >
            {labels?.maker}
          </Typography>
          <Box>
            <Button
              disableElevation
              disabled = {isInTestMode}
              onClick={
                controller?.isConnected
                  ? controller?.disconnectBluetooth
                  : controller?.connectBluetooth
              }
              variant="contained"
              sx={{
                backgroundColor: "#26D0C4",
                "&:hover": { backgroundColor: "#21B8A8" },
              }}
              // startIcon={
              //   <BluetoothIcon sx={{ fontSize: "1.2rem !important" }} />
              // }
            >
              <Typography variant="subtitle2">Pair Device</Typography>
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            pl: 1,
          }}
        >
          <LightTooltip title="Toggle Virtual Controls" placement="top-start">
            <IconButton
              aria-label="toggle"
              onClick={toggleVisibility}
              sx={{ m: 0, p: 0 }}
            >
              {visibility ? (
                <VisibilityOffIcon sx={{ m: 0, p: 0, fontSize: "0.9rem" }} />
              ) : (
                <VisibilityIcon sx={{ m: 0, p: 0, fontSize: "0.9rem" }} />
              )}
            </IconButton>
          </LightTooltip>
          <LightTooltip title ="Test Mode" placement="top-start">
            <IconButton
              aria-label="toggle"
              onClick={toggleTestMode}
              sx={{ m: 0, p: 0 }}
            >
              {isInTestMode ? (
                <ConstructionIcon
                  sx={{ m: 0, p: 0, fontSize: "0.9rem", color: "#D04226" }}
                />
              ) : (
                <ConstructionIcon sx={{ m: 0, p: 0, fontSize: "0.9rem" }} />
              )}
            </IconButton>
          </LightTooltip>
          <LightTooltip title="Device Options" placement="top-start">
            <>
              <IconButton
                aria-label="menu"
                sx={{ m: 0, p: 0 }}
                onClick={handleClick}
              >
                <SettingsIcon sx={{ m: 0, p: 0, mr: 1, fontSize: "0.9rem" }} />
              </IconButton>
              <MiniMenu
                anchor={anchorEl}
                handleClose={handleClose}
                items={[ "Remove from Project"]}
                handleSelection={handleSelection}
              />
            </>
          </LightTooltip>
        </Grid>
      </Grid>
    </Box>
  );
}


export default CompactSimDevice