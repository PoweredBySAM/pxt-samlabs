import React from 'react'
import { Slider as SamSlider} from "@samlabs/samblocks";


function Slider({device}:{device:any}) {
  return (
    <div>
      <SamSlider getValue={function (): number {
        return 1;
      } } />
    </div>
  )
}

export default Slider