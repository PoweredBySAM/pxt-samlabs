import React from 'react';
import Button from './Devices/Button';
import ActiveDevices from './ActiveDevices';
import AllDevices from './AllDevices';
import SelectorComponent from './Components/selector/SelectorComponent';
import devices from './AllDevices';

const App: React.FC = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center", marginTop:"1rem"}} >
      {/* <Button/> */}
      <SelectorComponent devices={devices}/>
      {/* <AllDevices/> */}
      {/* <ActiveDevices/> */}
    </div>
  );
};

export default App;