import Button from "./SAMDevices/Animatable/Button/Button";
import Buzzer from "./SAMDevices/Animatable/Buzzer/Buzzer";
import DCMotor from "./SAMDevices/Animatable/DCMotor/DCMotor";
import Dimmer from "./SAMDevices/Animatable/Dimmer/Dimmer";
import LED from "./SAMDevices/Animatable/LED/LED";
import LightSensor from "./SAMDevices/Animatable/LightSensor/LightSensor";
import PressureSensor from "./SAMDevices/Animatable/PresureSensor/PressureSensor";
import ProximitySensor from "./SAMDevices/Animatable/ProximitySensor/ProximitySensor";
import TemperatureSensor from "./SAMDevices/Animatable/TemperatureSensor/TemperatureSensor";
import Servo from "./SAMDevices/Animatable/Servo/Servo";
import Slider from "./SAMDevices/Animatable/Slider/Slider";
import Tilt from "./SAMDevices/Animatable/Tilt/Tilt";
import VibrationMotor from "./SAMDevices/Animatable/VibrationMotor/VibrationMotor";
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