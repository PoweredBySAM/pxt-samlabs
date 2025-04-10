import React from 'react';

const SquareAsteriskIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#8C8C8C" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="ml-1 mr-0.5 flex text-[16px] text-[#8C8C8C]"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M12 8v8" />
    <path d="m8.5 14 7-4" />
    <path d="m8.5 10 7 4" />
  </svg>
);

const BlockHexDisplay = ({value, onClick}: {value?: string; onClick: () => void}) => (
    <div
        className="flex items-center text-[#8C8C8C] text-sm font-bold cursor-pointer"
        onClick={onClick}
    >
        <SquareAsteriskIcon />
        <span
            className="text-sm font-bold text-[#8C8C8C] flex items-center leading-none"
        >
            {value}
        </span>
    </div>
);

export default BlockHexDisplay;
