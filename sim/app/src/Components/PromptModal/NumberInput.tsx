import React from 'react';

interface NumberInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  'aria-label'?: string;
  'aria-placeholder'?: string;
  style?: React.CSSProperties;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  'aria-label': ariaLabel,
  'aria-placeholder': ariaPlaceholder,
  style,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(e, newValue);
    }
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      aria-label={ariaLabel}
      placeholder={ariaPlaceholder}
      style={style}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26D0C4] focus:border-transparent"
    />
  );
};

export default NumberInput;
