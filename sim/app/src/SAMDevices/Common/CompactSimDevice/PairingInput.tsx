import React from 'react';

const CloseIcon = () => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#8C8C8C" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PairInput = ({
    value,
    onChange,
    onClear,
}: {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}) => (
    <div
        className="flex justify-between items-center border-2 border-[#25cfc3] rounded-lg w-[88px] py-0.5 px-1.5 pl-1.5"
    >
        <input
            type='text'
            maxLength={4}
            value={value}
            onChange={(e) => {
                const newValue = e.target.value.replace(/[oO]/g, '0');
                onChange(newValue);
            }}
            className="w-[55px] text-[15px] font-bold border-none p-0 text-[#595959] bg-transparent outline-none font-sans"
            placeholder=''
        />
        <button
            onClick={onClear}
            className="p-0 w-3 h-3 flex items-center justify-center hover:bg-transparent"
        >
            <CloseIcon />
        </button>
    </div>
);

export default PairInput;
