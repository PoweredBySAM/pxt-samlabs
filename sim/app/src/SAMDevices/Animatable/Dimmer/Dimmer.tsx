import React from 'react'
import { Dimmer as SamDimmer} from "@samlabs/samblocks";


function Dimmer({device}:{device:any}) {
  return (
    <div>
      <SamDimmer getValue={function (): number {
        return 1
      } }/>
    </div>
  )
}

export default Dimmer