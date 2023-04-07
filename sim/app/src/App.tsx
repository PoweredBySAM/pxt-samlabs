import React from 'react';
import Button from './Devices/Button';
import ActiveDevices from './ActiveDevices';
import AllDevices from './AllDevices';

const App: React.FC = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center", marginTop:"1rem"}} >
      <Button/>
      <AllDevices/>
      {/* <ActiveDevices/> */}
    </div>
  );
};

export default App;