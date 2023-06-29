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
import MicrobitIcon from "./MicrobitIcon";
interface IconDecoratorProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  style?: React.CSSProperties
}


const deviceIcons = {
    Button: ButtonIcon,
    Buzzer: BuzzerIcon,
    DCMotor: DCMotorIcon,
    RGBLight: LEDIcon,
    LightSensor: LightSensorIcon,
    PressureSensor: PressureSensorIcon,
    ProximitySensor: ProximitySensor,
    HeatSensor: TemperatureSensorIcon,
    ServoMotor: ServoMotorIcon,
    Slider: SliderIcon,
    Tilt: TiltIcon,
    Microbit: MicrobitIcon,
};

const IconDecorator = (props: IconDecoratorProps) => {
    const { icon: Icon, style, ...rest } = props;
    const customStyle = {
      width: "5rem",
      height: "5rem",
      ...style,
    };
    return (
        <div style = {{marginBottom:"-0.4rem"}}>
        <svg width="0" height="0" style={{ display: 'none' }}>
        <defs>
          <filter id="colorChangeFilter">
            <feFlood floodColor={"#fff"} floodOpacity="1" result="newFill" />
            <feFlood floodColor={"#fff"} floodOpacity="1" result="newStroke" />
            <feComposite in="newFill" in2="SourceGraphic" operator="in" result="fillChanged" />
            <feComposite in="newStroke" in2="SourceGraphic" operator="in" result="strokeChanged" />
            <feMerge>
              <feMergeNode in="fillChanged" />
              <feMergeNode in="strokeChanged" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <Icon style={{...customStyle,filter: 'url(#colorChangeFilter)' }} {...rest} />
      </div>
    );
  };

export const getDeviceIcon = (name: deviceNameType, style?:object):JSX.Element => {
  const Icon = deviceIcons[name as keyof typeof deviceIcons];
  return <IconDecorator icon={Icon} style = {style ? style: {}}  />;
};

export const getAllDeviceIcons = () => {
  return Object.keys(deviceIcons).map((name) =>
    getDeviceIcon(name as deviceNameType)
  );
};