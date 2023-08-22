import * as SAMDevices from "@samlabs/samblocks";
import { Microbit as MicrobitBlock } from "@samlabs/samblocks";
import React from "react";
import Microbit from "src/SAMDevices/Animatable/Microbit/Microbit";
import Buzzer from "src/SAMDevices/Animatable/Buzzer/Buzzer";
import DCMotor from "src/SAMDevices/Animatable/DCMotor/DCMotor";
import LED from "src/SAMDevices/Animatable/LED/LED";
import LightSensor from "src/SAMDevices/Animatable/LightSensor/LightSensor";
import ProximitySensor from "src/SAMDevices/Animatable/ProximitySensor/ProximitySensor";
import TemperatureSensor from "src/SAMDevices/Animatable/TemperatureSensor/HeatSensor";
import Servo from "src/SAMDevices/Animatable/Servo/Servo";
import Slider from "src/SAMDevices/Animatable/Slider/Slider";
import Tilt from "src/SAMDevices/Animatable/Tilt/Tilt";
import PressureSensor from "src/SAMDevices/Animatable/PresureSensor/PressureSensor";
import {
  IMicrobitVirtualDevice,
  ISamVirtualDevices,
  MicrobitDeviceType,
  SamVirtualDeviceType,
} from "src/SAMDevices/Types/SAMDeviceTypes";
import { deviceNameType } from "src/SAMDevices/Icons/deviceIconTypes";
const Button = React.lazy(() => import("./Button/Button"));
export default {
  Button: SAMDevices.Button,
  Buzzer: SAMDevices.Buzzer,
  DCMotor: SAMDevices.DCMotor,
  Dimmer: SAMDevices.Dimmer,
  LED: SAMDevices.LED,
  LightSensor: SAMDevices.LightSensor,
  PressureSensor: SAMDevices.PressureSensor,
  ProximitySensor: SAMDevices.ProximitySensor,
  TemperatureSensor: SAMDevices.TemperatureSensor,
  Servo: SAMDevices.Servo,
  Slider: SAMDevices.Slider,
  Tilt: SAMDevices.Tilt,
  VibrationMotor: SAMDevices.VibrationMotor,
  Microbit: MicrobitBlock,
};

const samVirtualDevices: ISamVirtualDevices = {
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
const MicrobitVirtualDevice: IMicrobitVirtualDevice = {
  Microbit: Microbit,
};

export const bluetoothEvents = [
  "connecting",
  "connected",
  "batteryLevelChange",
  "disconnected",
];
export const getVirtualDevice = (
  deviceName: deviceNameType
): SamVirtualDeviceType | MicrobitDeviceType => {
  if (deviceName === "Microbit") {
    return MicrobitVirtualDevice["Microbit"];
  } else {
    return samVirtualDevices[deviceName];
  }
};
export const hexToRGBA = (hex: string): any => {
  let r: number = 0,
    g: number = 0,
    b: number = 0,
    a: number | undefined = undefined;
  if (hex.length === 9) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
    a = parseInt(hex[7] + hex[8], 16) / 255;
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  } else if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }

  return { r, g, b, a };
};
