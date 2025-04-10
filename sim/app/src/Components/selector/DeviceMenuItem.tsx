import React from 'react'
import styles from './SelectorComponent.module.css'
import { DeviceMenuItemType } from '../../SAMDevices/Types/SAMDeviceTypes';

function DeviceMenuItem({deviceData, addDevice, closeOptions}:{deviceData?:any, addDevice?:any, closeOptions?:any}) {
    const {label, icon:Icon} = deviceData;

    const handleSelect = (data:DeviceMenuItemType) => {
      addDevice(data);
      closeOptions();
    }

    return (
      <div 
        className={`${styles.option} shadow-sm rounded my-8 mx-4 border border-gray-200`}  
        onClick={()=>handleSelect(deviceData)}
      >
        <div className="grid grid-cols-12 gap-4 m-4">
          <div className="col-span-4 bg-[#26D0C4] p-4 flex items-center rounded">
            {Icon}
          </div>
          <div className="col-span-8 flex flex-col justify-center">
            <div className="text-lg">{label?.displayName}</div>
            <div className="text-sm text-[#d7d7d7]">{label?.maker}</div>
          </div>
        </div>
      </div>
    )  
}

export default DeviceMenuItem