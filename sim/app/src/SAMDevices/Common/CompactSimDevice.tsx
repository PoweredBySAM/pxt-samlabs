import React, { useEffect } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import styles from "src/Components/selector/SelectorComponent.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SettingsIcon from "@mui/icons-material/Settings";
import { LightTooltip } from "./LightToolTip";
import MiniMenu from "./MiniMenu";
import ConstructionIcon from "@mui/icons-material/Construction";

function CompactSimDevice({
  device,
  Icon,
  visibility,
  toggleVisibility,
  labels,
  toggleTestMode,
  removeDevice,
  isInTestMode,
}: {
  device: any;
  Icon?: any;
  visibility: any;
  toggleVisibility?: any;
  labels?: any;
  toggleTestMode?: any;
  removeDevice?: any;
  isInTestMode: boolean;
}) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [bleError, setBleError] = React.useState(false);

  const handleConnect = () => {
    window.parent.postMessage(
      {
        type: `${device.assignedName} connect`,
      },
      window.location.origin
    );
  };

  const handleDisconnect = () => {
    window.parent.postMessage(
      {
        type: `${device.assignedName} disconnect`,
      },
      window.location.origin
    );
  };

  useEffect(() => {
    window.parent.postMessage(
      {
        type: `${device.assignedName} hydrate`,
      },
      window.location.origin
    );
    const listenerEvent = (event: MessageEvent) => {
      if (event.data.type === `${device.assignedName} bluetoothConnectionErr`) {
        setBleError(true);
      }
      if (
        event.data.type === `${device.assignedName} bluetoothConnected` ||
        event.data.type === `${device.assignedName} bluetoothIsConnected`
      ) {
        device.updateColor("#00FF00");
        setIsConnected(true);
      }
      if (event.data.type === `${device.assignedName} bluetoothDisconnected`) {
        device.updateColor(undefined);
        setIsConnected(false);
      }
    };

    window.addEventListener("message", listenerEvent);

    return () => {
      window.removeEventListener("message", listenerEvent);
    };
  }, []);

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
            {device.assignedName}
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
                id="composition-button"
                onClick={isConnected ? handleDisconnect : handleConnect}
                disableElevation
                disabled={isInTestMode}
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: isConnected ? "#FF0000" : "#26D0C4",
                  "&:hover": {
                    backgroundColor: isConnected ? "#cc0101" : "#21B8A8",
                  },
                }}
              >
                {bleError
                  ? "Error Connecting this device"
                  : isConnected
                  ? "Disconnect"
                  : "Connect"}
              </Button>
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
                // onClick={handleClick}
              >
                <SettingsIcon sx={{ m: 0, p: 0, mr: 1, fontSize: "0.9rem" }} />
              </IconButton>
              <MiniMenu
                handleClose={() => {}}
                items={["Remove from Project"]}
              />
            </>
          </LightTooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompactSimDevice;
