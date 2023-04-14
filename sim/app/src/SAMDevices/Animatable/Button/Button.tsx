import { Button as SamButton} from "@samlabs/samblocks";
import { observer } from 'mobx-react'; // Import the observer
import React, { useEffect } from 'react';

function Button(props: any) {

  const {controller, virtualController} = props;
  const bluetoothEvents = ['connecting', 'connected', 'batteryLevelChange', 'disconnected']
  const virtualEvents = ['valueChanged']
  const combinedEvents = ['pressed', 'released']

  useEffect(()=>{

  },[])

  return (
    <div style={{}}>
      <SamButton 
        buttonPressed
        wireFrame
        getColor={() => ({r: 0, g: 0, b: 0, a: 0})}
        getBatteryLevel={() => 0}
      />
    </div>
  );
}

export default observer(Button); // Wrap the component with observer
