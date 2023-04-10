import * as SAMDevices from "@samlabs/samblocks";
// import Buzzer from "./Buzzer";
// import DCMotor from "./DCMotor";
// import Dimmer from "./Dimmer";
// import LED from "./LED";
// import LightSensor from "./LightSensor";
// import PressureSensor from "./PressureSensor";
// import ProximitySensor from "./ProximitySensor";
// import TemperatureSensor from "./TemperatureSensor";
// import Servo from "./Servo";
// import Slider from "./Slider";
// import Tilt from "./Tilt";
// import VibrationMotor from "./VibrationMotor";
import React from "react";
import { deviceNameType } from "../Icons/deviceIconTypes";

type devicesType = { [key: string]: JSX.Element };
export default {
  Button:SAMDevices.Button,
  Buzzer:SAMDevices.Buzzer,
  DCMotor:SAMDevices.DCMotor,
  Dimmer:SAMDevices.Dimmer,
  LED:SAMDevices.LED,
  LightSensor:SAMDevices.LightSensor,
  PressureSensor:SAMDevices.PressureSensor,
  ProximitySensor:SAMDevices.ProximitySensor,
  TemperatureSensor:SAMDevices.TemperatureSensor,
  Servo:SAMDevices.Servo,
  Slider:SAMDevices.Slider,
  Tilt:SAMDevices.Tilt,
  VibrationMotor:SAMDevices.VibrationMotor,
};
const deviceAnimation = {
  Button: SAMDevices.Button,
  Buzzer: SAMDevices.Buzzer,
  DCMotor: SAMDevices.DCMotor,
  RGBLight: SAMDevices.LED,
  LightSensor: SAMDevices.LightSensor,
  PressureSensor: SAMDevices.PressureSensor,
  ProximitySensor: SAMDevices.ProximitySensor,
  HeatSensor: SAMDevices.TemperatureSensor,
  ServoMotor: SAMDevices.Servo,
  Slider: SAMDevices.Slider,
  Tilt: SAMDevices.Tilt,
};
export const getDeviceAnimation = (deviceName: deviceNameType) => {
  return deviceAnimation[deviceName];
};
