import { DeviceNameEnum } from "src/types/utilTypes";

export const simToBTDeviceNameMap: { [key in DeviceNameEnum]: string } = {
  [DeviceNameEnum.Button]: 'SAM Button',
  [DeviceNameEnum.Buzzer]: 'SAM Buzzer',
  [DeviceNameEnum.DCMotor]: 'SAM DC Motor',
  [DeviceNameEnum.RGBLight]: 'SAM RGB LED',
  [DeviceNameEnum.LightSensor]: 'SAM LDR',
  [DeviceNameEnum.Microbit]: "BBC",
  [DeviceNameEnum.PressureSensor]: 'SAM Pressure',
  [DeviceNameEnum.ProximitySensor]: 'SAM IR Sensor',
  [DeviceNameEnum.ServoMotor]: 'SAM Servo Motor',
  [DeviceNameEnum.Slider]: 'SAM Potentiometer',
  [DeviceNameEnum.Tilt]: 'SAM Tilt',
  [DeviceNameEnum.HeatSensor]: 'SAM Temperature',
};

export const BTDeviceToSimNameMap: { [key: string]: DeviceNameEnum } = {
  'SAM Button': DeviceNameEnum.Button,
  'SAM Buzzer': DeviceNameEnum.Buzzer,
  'SAM DC Motor': DeviceNameEnum.DCMotor,
  'SAM RGB LED': DeviceNameEnum.RGBLight,
  'SAM LDR': DeviceNameEnum.LightSensor,
  'BBC': DeviceNameEnum.Microbit,
  'SAM Pressure': DeviceNameEnum.PressureSensor,
  'SAM IR Sensor': DeviceNameEnum.ProximitySensor,
  'SAM Servo Motor': DeviceNameEnum.ServoMotor,
  'SAM Potentiometer': DeviceNameEnum.Slider,
  'SAM Tilt': DeviceNameEnum.Tilt,
  'SAM Temperature': DeviceNameEnum.HeatSensor,
};
