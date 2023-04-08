import React from "react";
import ButtonIcon from "./ButtonIcon";
import BuzzerIcon from "./BuzzerIcon";
import DCMotorIcon from "./DCMotorIcon";
import DimmerIcon from "./DimmerIcon";
import LEDIcon from "./LEDIcon";
import LightSensorIcon from "./LightSensorIcon";
import PressureSensorIcon from "./PressureSensorIcon";
import ProximitySensor from "./ProximitySensorIcon";
import TemperatureSensorIcon from "./TemperatureSensorIcon";
import ServoMotorIcon from "./ServoMotorIcon";
import SliderIcon from "./SliderIcon";
import TiltIcon from "./TiltIcon";
import VibrationMotorIcon from "./VibrationMotorIcon";
import { deviceNameType } from "./deviceIconTypes";

interface IconDecoratorProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ReactElement;
}

const IconDecorator = (props: IconDecoratorProps) => {
  const { icon, ...rest } = props;
  return React.cloneElement(icon, rest);
};

const deviceIcons = {
  button: ButtonIcon,
  buzzer: BuzzerIcon,
  dcmotor: DCMotorIcon,
  dimmer: DimmerIcon,
  ledicon: LEDIcon,
  lightsensor: LightSensorIcon,
  pressuresensor: PressureSensorIcon,
  proximitysensor: ProximitySensor,
  temperaturesensor: TemperatureSensorIcon,
  servomotor: ServoMotorIcon,
  slider: SliderIcon,
  tilt: TiltIcon,
  vibrationmotor: VibrationMotorIcon,
};

export const getDeviceIcon = (name: deviceNameType) => {
  const Icon = deviceIcons[name as keyof typeof deviceIcons];
  return <IconDecorator icon={<Icon />} />;
};
