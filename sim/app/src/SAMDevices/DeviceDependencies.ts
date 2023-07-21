import ButtonInit from "./Animatable/Button/ButtonInit";
import BuzzerInit from "./Animatable/Buzzer/BuzzerInit";
import DCMotorInit from "./Animatable/DCMotor/DCMotorInit";
import { LEDInit } from "./Animatable/LED/LEDInit";
import LightSensorInit from "./Animatable/LightSensor/LightSensorInit";
import PressureSensorInit from "./Animatable/PresureSensor/PressureSensorInit";
import ProximitySensorInit from "./Animatable/ProximitySensor/ProximitySensorInit";
import ServoMotorInit from "./Animatable/Servo/ServoMotorInit";
import SliderInit from "./Animatable/Slider/SliderInit";
import HeatSensorInit from "./Animatable/TemperatureSensor/HeatSensorInit";
import MicrobitInit from "./Animatable/Microbit/MicrobitInit";
import { deviceNameType } from "./Icons/deviceIconTypes";
import GoogleSheetInit from "src/SAMDevices/Animatable/GoogleSheet/GoogleSheetInit";

class DeviceDependencies {
  getDeviceControlUtilities(deviceName: deviceNameType) {
    switch (deviceName) {
      case "Button":
        return {
          controlUtilities: ButtonInit,
        };
      case "Buzzer":
        return {
          controlUtilities: BuzzerInit,
        };
      case "DCMotor":
        return {
          controlUtilities: DCMotorInit,
        };
      case "RGBLight":
        return {
          controlUtilities: LEDInit,
        };
      case "LightSensor":
        return {
          controlUtilities: LightSensorInit,
        };
      case "ServoMotor":
        return {
          controlUtilities: ServoMotorInit,
        };
      case "PressureSensor":
        return {
          controlUtilities: PressureSensorInit,
        };
      case "ProximitySensor":
        return {
          controlUtilities: ProximitySensorInit,
        };
      case "Slider":
        return {
          controlUtilities: SliderInit,
        };
      case "HeatSensor":
        return {
          controlUtilities: HeatSensorInit,
        };
      case "Tilt":
        return {
          controlUtilities: HeatSensorInit,
        };
      case "Microbit":
        return {
          controlUtilities: MicrobitInit,
        };
      case "GoogleSheet":
        return {
          controlUtilities: GoogleSheetInit,
        };
      default:
        throw new Error("Device dependencies not in getDeviceControlUtilities");
    }
  }
}
export default new DeviceDependencies();
