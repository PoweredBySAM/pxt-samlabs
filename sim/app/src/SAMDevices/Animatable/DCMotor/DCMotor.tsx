import React from 'react'
import { DCMotor as SamDCMotor} from "@samlabs/samblocks";


function DCMotor({device}:{device:any}) {
  return (
    <div>
      <SamDCMotor/>
    </div>
  )
}

export default DCMotor