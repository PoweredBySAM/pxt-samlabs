import { ButtonProps } from "@samlabs/samblocks/dist/Blocks/Button";
import { BuzzerProps } from "@samlabs/samblocks/dist/Blocks/Buzzer";
import { DCMotorProps } from "@samlabs/samblocks/dist/Blocks/DCMotor";
import { DimmerProps } from "@samlabs/samblocks/dist/Blocks/Dimmer";
import { LEDProps } from "@samlabs/samblocks/dist/Blocks/LED";
import { SliderProps } from "@samlabs/samblocks/dist/Blocks/Slider";
import { TiltProps } from "@samlabs/samblocks/dist/Blocks/Tilt";
import { VibrationMotorProps } from "@samlabs/samblocks/dist/Blocks/VibrationMotor";
import { CommonProp, IBasicDeviceProps, IDevice } from "@samlabs/samblocks/dist/Types";
import { deviceNameType } from "./Icons/deviceIconTypes";

export function initialButtonProps(): ButtonProps {
  return {
    buttonPressed: false,
  };
}
interface IServoProps extends CommonProp, IDevice{
    getPosition: () => number;
}

export const initialBuzzerProps = (): BuzzerProps => {
  return {
    getIsActive: () => false,
  };
}

export const initialDCMotorProps = (): DCMotorProps => {
  return {
    getMotorSpeed: () => 0,
    style:{color:"blue"}
  };
} 

export const initialDimmerProps = (): DimmerProps => {
  return {
    getValue: () => 0,
  };
}

export const defaultRGBLightProps = (): LEDProps => {
  return {
    colorIndicator:{color:"#ffffff",opacity: 100},
  };
}

export const defaultLightSensorProps = (): IBasicDeviceProps => {
  return {
    wireFrame: true

  };
}
export const defaultProximitySensorProps = (): IBasicDeviceProps => {
  return {
    wireFrame: true

  };
}
export const defaultPressureSensorProps = (): IBasicDeviceProps => {
  return {
    wireFrame: true

  };
}
export const defaultHeatSensorProps = (): IBasicDeviceProps => {
  return {
    wireFrame: true

  };
}
export const defaultServoMotorProps = (): IServoProps => {
  return {
    getPosition: () => 0,
  };
}
export const defaultSliderProps = (): SliderProps => {
  return {
    getValue: () => 0

  };
}
export const defaultTiltProps = (): TiltProps => {
  return {
    getIsTilted: () => false
  };
}
export const defaultVibrationMotorProps = (): VibrationMotorProps => {
  return {
    getMotorSpeed: () => 0

  };
}

export const getInitialProps = (deviceName: deviceNameType) => {
  switch (deviceName) {
    case "Button":
      return initialButtonProps();
    case "Buzzer":
      return initialBuzzerProps();
    case "DCMotor":
      return initialDCMotorProps();
    case "RGBLight":
      return defaultRGBLightProps();
    case "LightSensor":
      return defaultLightSensorProps();
    case "PressureSensor":
      return defaultPressureSensorProps();
    case "ProximitySensor":
      return defaultProximitySensorProps();
    case "ServoMotor":
      return defaultServoMotorProps();
    case "Slider":
      return defaultSliderProps();
    case "Tilt":
      return defaultTiltProps();
    default:
      return {};
  }
}

