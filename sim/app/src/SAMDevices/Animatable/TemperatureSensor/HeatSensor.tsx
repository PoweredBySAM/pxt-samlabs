import React from 'react'
import { TemperatureSensor as SamTemperatureSensor} from "@samlabs/samblocks";


function HeatSensor({device}:{device:any}) {
  return (
    <div>
      <SamTemperatureSensor />
    </div>
  )
}

export default HeatSensor