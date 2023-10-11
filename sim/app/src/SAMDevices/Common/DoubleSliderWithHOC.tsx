import React from "react";
import { Box, Slider, Typography } from "@mui/material";
import toFixify from "src/Utils/toFixify";
import { observer } from "mobx-react";

export type SetHOCSliderValue = (
  event: Event,
  value: number | number[],
  activeThumb: number
) => void;

const DoubleSliderWithHoc = ({
  setSliderOneValue,
  setSliderTwoValue,
  currentSliderOnValue,
  currentSliderTwoValue,
  children,
  controlsVisibility,
}: {
  setSliderOneValue: SetHOCSliderValue;
  setSliderTwoValue: SetHOCSliderValue;
  currentSliderOnValue: number;
  currentSliderTwoValue: number;
  children: any;
  controlsVisibility: boolean;
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>{children}</Box>
      <Box sx={{ width: "100% " }}>
        {controlsVisibility && (
          <Slider
            size="small"
            min={20}
            max={20000}
            aria-label="Buzzer Pitch"
            value={currentSliderOnValue}
            onChange={setSliderOneValue}
            sx={customSliderStyle}
          />
        )}
      </Box>

      {controlsVisibility && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h6"
              sx={{
                width: "5rem",
                fontWeight: 400,
                mx: 2,
                my: 1,
                px: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Pitch:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Nunito",
                width: "7rem",
                fontWeight: 400,
                m: 1,
                border: "solid 1px #c4c4c4",
                borderRadius: "5px",
                backgroundColor: "#d7d7d7",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {`${toFixify(currentSliderOnValue)} Hz`}
            </Typography>
          </Box>
        </>
      )}
      <Box sx={{ width: "100% " }}>
        {controlsVisibility && (
          <Slider
            size="small"
            min={0}
            max={100}
            aria-label="Buzzer Volume"
            value={currentSliderTwoValue}
            onChange={setSliderTwoValue}
            sx={customSliderStyle}
          />
        )}
      </Box>

      {controlsVisibility && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h6"
              sx={{
                width: "5rem",
                fontWeight: 400,
                m: 1,
                px: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Volume:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Nunito",
                width: "5rem",
                fontWeight: 400,
                m: 1,
                border: "solid 1px #c4c4c4",
                px: 2,
                borderRadius: "5px",
                backgroundColor: "#d7d7d7",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {toFixify(currentSliderTwoValue)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default observer(DoubleSliderWithHoc);
