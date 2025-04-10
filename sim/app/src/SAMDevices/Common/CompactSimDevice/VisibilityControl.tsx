import React from 'react';
import {LightTooltip} from 'src/SAMDevices/Common/LightToolTip';

const VisibilityIcon = () => (
  <svg 
    width="15" 
    height="15" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="m-0 p-0 text-[0.9rem]"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const VisibilityOffIcon = () => (
  <svg 
    width="15" 
    height="15" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="m-0 p-0 text-[0.9rem]"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const VisibilityControl = ({
    visibility,
    onToggle,
}: {
    visibility: boolean;
    onToggle: () => void;
}) => (
    <div
        className="col-span-1 flex items-start justify-start ml-auto"
    >
        <LightTooltip title='Toggle Virtual Controls' placement='top-start'>
            <button 
                aria-label='toggle' 
                onClick={onToggle} 
                className="m-0 p-0 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
            >
                {visibility ? (
                    <VisibilityOffIcon />
                ) : (
                    <VisibilityIcon />
                )}
            </button>
        </LightTooltip>
    </div>
);

export default VisibilityControl;
