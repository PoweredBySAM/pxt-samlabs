import React from 'react';
import toFixify from 'src/Utils/toFixify';
import { observer } from 'mobx-react';
import CustomSlider from './CustomSlider';

export type SetHOCSliderValue = (
    event: Event | React.ChangeEvent<HTMLInputElement>,
    value: number | number[],
    activeThumb?: number
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
    return (
        <div className="w-full">
            <div className="flex justify-center">{children}</div>
            <div className="w-full">
                {controlsVisibility && (
                    <CustomSlider
                        min={20}
                        max={14000}
                        value={currentSliderOnValue}
                        onChange={(e, val) => setSliderOneValue(e, val, 0)}
                        ariaLabel="Buzzer Pitch"
                        size="small"
                    />
                )}
            </div>

            {controlsVisibility && (
                <>
                    <div className="flex justify-center">
                        <div className="w-20 font-normal mx-2 my-1 px-2 flex justify-center text-lg">
                            Pitch:
                        </div>
                        <div className="font-nunito w-28 font-normal m-1 border border-[#c4c4c4] rounded bg-[#d7d7d7] flex justify-center text-lg">
                            {`${toFixify(currentSliderOnValue)} Hz`}
                        </div>
                    </div>
                </>
            )}
            <div className="w-full">
                {controlsVisibility && (
                    <CustomSlider
                        min={0}
                        max={100}
                        value={currentSliderTwoValue}
                        onChange={(e, val) => setSliderTwoValue(e, val, 0)}
                        ariaLabel="Buzzer Volume"
                        size="small"
                    />
                )}
            </div>

            {controlsVisibility && (
                <>
                    <div className="flex justify-center">
                        <div className="w-20 font-normal m-1 px-2 flex justify-center text-lg">
                            Volume:
                        </div>
                        <div className="font-nunito w-20 font-normal m-1 border border-[#c4c4c4] px-2 rounded bg-[#d7d7d7] flex justify-center text-lg">
                            {toFixify(currentSliderTwoValue)}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default observer(DoubleSliderWithHoc);
