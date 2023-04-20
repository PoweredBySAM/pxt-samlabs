import React from 'react'
import { PressureSensor as SamPressureSensor} from "@samlabs/samblocks";


function PressureSensor({device}:{device:any}) {
  return (
    <div>
      <SamPressureSensor />
    </div>
  )
}

export default PressureSensor