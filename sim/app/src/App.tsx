import React from 'react';
import SelectorComponent from './Components/selector/SelectorComponent';
import devices from './AllDevices';

const App: React.FC = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center", marginTop:"1rem"}} >
      <SelectorComponent devices={devices}/>
    </div>
  );
};

export default App;