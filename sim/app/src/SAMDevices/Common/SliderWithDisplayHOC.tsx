import { Box, Slider, Typography } from "@mui/material";
import React from "react";
import { observer } from "mobx-react";
import toFixify from "../../Utils/toFixify";

const SliderWithDisplayHOC = ({
  setValue,
  currentValue,
  children,
  controlsVisibility,
  heatSensor,
}: {
  setValue: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  currentValue: number;
  children: any;
  controlsVisibility: boolean;
  heatSensor?: boolean;
}) => {
  const customSliderStyle = {
    minWidth: "10rem !important",
    "& .MuiSlider-thumb": {
      color: "#101010",
    },
    "& .MuiSlider-track": {
      color: "#101010",
    },
    "& .MuiSlider-rail": {
      color: "#acc4e4",
    },
    "& .MuiSlider-active": {
      color: "green",
    },
  };
  return (
    <Box sx={{ width: "100% !important" }}>
      <Box sx={{ width: "100% " }}>
        {controlsVisibility && (
          <Slider
            size="small"
            min={0}
            max={100}
            aria-label="Temperature"
            value={currentValue}
            onChange={setValue}
            sx={customSliderStyle}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{children}</Box>
      {controlsVisibility && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {heatSensor && (
              <Typography
                variant="h6"
                sx={{
                  width: "5rem",
                  fontWeight: 400,
                  mx: 2,
                  my: heatSensor ? 1 : 2,
                  px: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Celsius:
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Orbitron",
                width: "5rem",
                fontWeight: 400,
                m: 1,
                border: "solid 1px #c4c4c4",
                px: 4,
                borderRadius: "5px",
                backgroundColor: "#d7d7d7",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {toFixify(currentValue)}
            </Typography>
          </Box>
          {heatSensor && (
            <Box sx={{ display: "flex" }}>
              {heatSensor && (
                <Typography
                  variant="h6"
                  sx={{
                    width: "5rem",
                    fontWeight: 400,
                    m: 2,
                    px: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Fahrenheit:
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Orbitron",
                  width: "5rem",
                  fontWeight: 400,
                  m: 2,
                  border: "solid 1px #c4c4c4",
                  px: 2,
                  borderRadius: "5px",
                  backgroundColor: "#d7d7d7",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {toFixify(currentValue) === "0.0"
                  ? "0.0"
                  : (currentValue * 9) / 5 + 32}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default observer(SliderWithDisplayHOC);
