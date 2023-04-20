import React from 'react'
import { Servo as SamServo} from "@samlabs/samblocks";


function Servo({device}:{device:any}) {
  return (
    <div>
      <SamServo getPosition={function (): number {
        throw new Error('Function not implemented.');
      } } />
    </div>
  )
}

export default Servo