import { Box } from '@mui/material';
import React from 'react'
import styles from './SelectorComponent.module.css'

function SelectorComponent({devices}:{devices?:any}) {
  const [selectedDevice, setSelectedDevice] = React.useState<any>(null);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  const handleshowOptions = () => {
    console.log("hi")
    setShowOptions(prev=>!prev);
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles['selected-option']} onClick = {handleshowOptions} >
        <span style={{width:"100%"}}>Select  Device</span>

      </div>
      <div className={showOptions ? styles.options : styles["options-none"]}  >
      {
          showOptions && devices?.map((Device:any,index:number) => (
            <div key={index}className={showOptions? styles.option: styles["option-none"]}><Device base={{width:"5"}}/></div>
          ))
        }
      </div>
    </div>
  );
}

export default SelectorComponent