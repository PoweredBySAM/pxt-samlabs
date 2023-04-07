import Button from "./Button";
import Buzzer from "./Buzzer";
import DCMotor from "./DCMotor";
import Dimmer from "./Dimmer";
import LED from "./LED";
import LightSensor from "./LightSensor";
import PressureSensor from "./PressureSensor";
import ProximitySensor from "./ProximitySensor";
import TemperatureSensor from "./TemperatureSensor";
import Servo from "./Servo";
import Slider from "./Slider";
import Tilt from "./Tilt";
import VibrationMotor from "./VibrationMotor";
import React from "react";


type devicesType = {[key:string]:JSX.Element}
export default {
    Button,
    Buzzer,
    DCMotor,
    Dimmer,
    LED,
    LightSensor,
    PressureSensor,
    ProximitySensor,
    TemperatureSensor,
    Servo,
    Slider,
    Tilt,
    VibrationMotor
}