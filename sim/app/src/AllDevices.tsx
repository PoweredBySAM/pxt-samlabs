import Button from "./Devices/Button";
import Buzzer from "./Devices/Buzzer";
import DCMotor from "./Devices/DCMotor";
import Dimmer from "./Devices/Dimmer";
import LED from "./Devices/LED";
import LightSensor from "./Devices//LightSensor";
import PressureSensor from "./Devices/PressureSensor";
import ProximitySensor from "./Devices/ProximitySensor";
import TemperatureSensor from "./Devices/TemperatureSensor";
import Servo from "./Devices/Servo";
import Slider from "./Devices/Slider";
import Tilt from "./Devices/Tilt";
import VibrationMotor from "./Devices/VibrationMotor";
import React from "react";
import SelectorComponent from "./Components/selector/SelectorComponent";


type devicesType = {[key:string]:JSX.Element}
const devices =  [
    Button,
    Buzzer,
    DCMotor,
    // Dimmer,
    LED,
    LightSensor,
    PressureSensor,
    ProximitySensor,
    TemperatureSensor,
    // Servo,
    // Slider,
    // Tilt,
    // 
]

// function AllDevices() {
//   return (
//     <div>
//         {devices.map((Device,index) =>(
//             <div key={index}>
//                 {/* <Device/> */}
//                 <SelectorComponent devices={devices}/>
//             </div>
//         ))}
//     </div>
//   )
// }

export default devices