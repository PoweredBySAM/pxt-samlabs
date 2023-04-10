import React from 'react'
import ActiveDeviceItem from './ActiveDeviceItem'

function ActiveDevices({devices}:{devices?:any}) {
  return (
    <div>
      {devices.map((device:any) =>(
        <ActiveDeviceItem device = {device}/>
      ))}
    </div>
  )
}

export default ActiveDevices