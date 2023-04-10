import Button from "./SAMDevices/Animatable/Button";
import Buzzer from "./SAMDevices/Animatable//Buzzer";
import DCMotor from "./SAMDevices/Animatable//DCMotor";
import Dimmer from "./SAMDevices/Animatable//Dimmer";
import LED from "./SAMDevices/Animatable//LED";
import LightSensor from "./SAMDevices/Animatable//LightSensor";
import PressureSensor from "./SAMDevices/Animatable//PressureSensor";
import ProximitySensor from "./SAMDevices/Animatable//ProximitySensor";
import TemperatureSensor from "./SAMDevices/Animatable//TemperatureSensor";
import Servo from "./SAMDevices/Animatable//Servo";
import Slider from "./SAMDevices/Animatable//Slider";
import Tilt from "./SAMDevices/Animatable//Tilt";
import VibrationMotor from "./SAMDevices/Animatable//VibrationMotor";
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