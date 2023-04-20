import React from 'react'
import { LightSensor as SamLightSensor} from "@samlabs/samblocks";


function LightSensor({device}:{device:any}) {
  return (
    <div>
      <SamLightSensor/>
    </div>
  )
}

export default LightSensor