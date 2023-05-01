import * as SAMDevices from "@samlabs/samblocks";
import Buzzer from "./Buzzer/Buzzer";
import DCMotor from "./DCMotor/DCMotor";
import LED from "./LED/LED";
import LightSensor from "./LightSensor/LightSensor";
import ProximitySensor from "./ProximitySensor/ProximitySensor";
import TemperatureSensor from "./TemperatureSensor/HeatSensor";
import Servo from "./Servo/Servo";
import Slider from "./Slider/Slider";
import Tilt from "./Tilt/Tilt";
import React from "react";
import { deviceNameType } from "../Icons/deviceIconTypes";
import Button from "./Button/Button";
import PressureSensor from "./PresureSensor/PressureSensor";
import { ISamVirtualDevices, SamVirtualDeviceType } from "../Types/SAMDeviceTypes";

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

const virtualDevices:ISamVirtualDevices = {
  Button: Button,
  Buzzer: Buzzer,
  DCMotor: DCMotor,
  RGBLight: LED,
  LightSensor: LightSensor,
  PressureSensor: PressureSensor,
  ProximitySensor: ProximitySensor,
  HeatSensor: TemperatureSensor,
  ServoMotor: Servo,
  Slider: Slider,
  Tilt: Tilt,
};
export const getVirtualDevice = (deviceName: deviceNameType):SamVirtualDeviceType => {
  return virtualDevices[deviceName];
};
