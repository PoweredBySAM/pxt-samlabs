import React from 'react'
import { ProximitySensor as SamProximitySensor} from "@samlabs/samblocks";


function ProximitySensor({device}:{device:any}) {
  return (
    <div>
      <SamProximitySensor />
    </div>
  )
}

export default ProximitySensor