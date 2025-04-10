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
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue(e as unknown as Event, value, 0);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {controlsVisibility && (
          <input
            type="range"
            min="0"
            max="100"
            aria-label="Temperature"
            value={currentValue}
            onChange={handleSliderChange}
            className="w-full h-2 bg-[#acc4e4] rounded-lg appearance-none cursor-pointer accent-[#101010]"
          />
        )}
      </div>
      <div className="flex justify-center">{children}</div>
      {controlsVisibility && (
        <>
          <div className="flex justify-center">
            {heatSensor && (
              <h6 className="w-20 font-normal mx-2 my-1 px-2 flex justify-center">
                Celsius:
              </h6>
            )}
            <h6 className="font-sans w-20 font-normal m-1 border border-[#c4c4c4] px-4 rounded-md bg-[#d7d7d7] flex justify-center">
              {toFixify(currentValue)}
            </h6>
          </div>
          {heatSensor && (
            <div className="flex">
              <h6 className="w-20 font-normal m-2 px-2 flex justify-center">
                Fahrenheit:
              </h6>
              <h6 className="font-sans w-20 font-normal m-2 border border-[#c4c4c4] px-2 rounded-md bg-[#d7d7d7] flex justify-center">
                {toFixify(currentValue) === "0.0"
                  ? "0.0"
                  : ((currentValue * 9) / 5 + 32).toFixed(1)}
              </h6>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default observer(SliderWithDisplayHOC);
