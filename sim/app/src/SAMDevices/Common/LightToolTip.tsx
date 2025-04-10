import React, { useState, ReactNode } from 'react';

interface LightTooltipProps {
  title: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  children: ReactNode;
}

export const LightTooltip: React.FC<LightTooltipProps> = ({ 
  title, 
  placement = 'top', 
  children 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const getPlacementClasses = () => {
    switch (placement) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-1';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-1';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-1';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-1';
      case 'top-start':
        return 'bottom-full left-0 mb-1';
      case 'top-end':
        return 'bottom-full right-0 mb-1';
      case 'bottom-start':
        return 'top-full left-0 mt-1';
      case 'bottom-end':
        return 'top-full right-0 mt-1';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-1';
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div 
          className={`absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-700 rounded shadow ${getPlacementClasses()}`}
        >
          {title}
        </div>
      )}
    </div>
  );
};