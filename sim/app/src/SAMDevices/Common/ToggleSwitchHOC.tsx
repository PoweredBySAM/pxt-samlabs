import React from 'react'
import { observer } from 'mobx-react';
import toFixify from '../../Utils/toFixify';

const ToggleSwitchHOC = ({setValue, currentValue, children, controlsVisibility}: {
  setValue: any, 
  currentValue: number,
  children: any,
  controlsVisibility: boolean
}) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        {controlsVisibility && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!currentValue}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
          </label>
        )}
      </div>
      <div className="flex justify-center mb-2">
        {children}
      </div>
    </div>
  );
}

export default observer(ToggleSwitchHOC)