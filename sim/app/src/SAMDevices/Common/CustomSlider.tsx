import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  ariaLabel?: string;
  size?: 'small' | 'medium';
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  value,
  onChange,
  ariaLabel,
  size = 'small',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    onChange(e, numValue);
  };

  // Calculate percentage for styling
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
        className={`
          w-full h-2 bg-[#acc4e4] rounded-lg appearance-none cursor-pointer
          ${size === 'small' ? 'h-1' : 'h-2'}
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#101010]
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#101010]
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:border-0
        `}
        style={{
          background: `linear-gradient(to right, #101010 0%, #101010 ${percentage}%, #acc4e4 ${percentage}%, #acc4e4 100%)`
        }}
      />
    </div>
  );
};

export default observer(CustomSlider); 