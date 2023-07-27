import React, { FormEvent } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import styles from "../../Components/selector/SelectorComponent.module.css";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SettingsIcon from "@mui/icons-material/Settings";
import { LightTooltip } from "./LightToolTip";
import MiniMenu from "./MiniMenu";
import ConstructionIcon from "@mui/icons-material/Construction";
import pairedDevicesManager from "src/Store/PairedDevicesManager";
import { deviceNameType } from "../Icons/deviceIconTypes";
import { connected } from "process";

function CompactSimDevice({
  Icon,
  controller,
  visibility,
  toggleVisibility,
  labels,
  toggleTestMode,
  removeDevice,
  isInTestMode,
  varNameInPxt,
  deviceNameInSim,
  assignBlueToothDevice,
  isConnected,
  connectedDeviceName,
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
  deviceNameInSim?: string;
  assignBlueToothDevice: (device:any)=>any;
  isConnected:boolean;
  connectedDeviceName:string
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose2 = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    assignBlueToothDevice(event)
    setOpen(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
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
            backgroundColor: isInTestMode ? "#c4c4c4" : "#26D0C4",
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
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                disableElevation
                disabled={isInTestMode}
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#26D0C4",
                  "&:hover": { backgroundColor: "#21B8A8" },
                }}
              >
                {isConnected? `Connected to ${connectedDeviceName}`:"Connect"}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose2}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          {pairedDevicesManager.getBTDevicesOfTypePairedOnly(
                            deviceNameInSim as deviceNameType
                          ).length
                            ? pairedDevicesManager
                                .getBTDevicesOfTypePairedOnly(
                                  deviceNameInSim as deviceNameType
                                )
                                .map((device: any) => (
                                  <MenuItem
                                    onClick={()=>handleClose2(device)}
                                    key={device.assignedName}
                                  >
                                    {device.assignedName}
                                  </MenuItem>
                                ))
                            : [1].map((device: any) => (
                                <MenuItem onClick={handleClose2} key={device}>
                                  {"No device available!"}
                                </MenuItem>
                              ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
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
          <LightTooltip title="Test Mode" placement="top-start">
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
                items={["Remove from Project"]}
                handleSelection={handleSelection}
              />
            </>
          </LightTooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompactSimDevice;
