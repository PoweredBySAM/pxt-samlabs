import React from 'react'
import { LED as SamLED} from "@samlabs/samblocks";


function LED({device}:{device:any}) {
  return (
    <div>
      <SamLED/>
    </div>
  )
}

export default LED