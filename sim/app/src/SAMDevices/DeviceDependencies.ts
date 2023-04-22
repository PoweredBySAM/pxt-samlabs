import ButtonInit from "./Animatable/Button/ButtonInit";
import BuzzerInit from "./Animatable/Buzzer/BuzzerInit";
import DCMotorInit from "./Animatable/DCMotor/DCMotorInit";
import { LEDInit } from "./Animatable/LED/LEDInit";
import LightSensorInit from "./Animatable/LightSensor/LightSensorInit";
import PressureSensorInit from "./Animatable/PresureSensor/PressureSensorInit";
import ServoMotorInit from "./Animatable/Servo/ServoMotorInit";
import { deviceNameType } from "./Icons/deviceIconTypes";

class DeviceDependencies
{
    getDeviceControlUtilities(deviceName:deviceNameType) {
        console.log(deviceName)
        switch (deviceName){
            case "Button":
                return {
                    controlUtilities: ButtonInit,
                }
            case "Buzzer":
                return {
                    controlUtilities: BuzzerInit,
                }
            case "DCMotor":
                return {
                    controlUtilities: DCMotorInit,
                }
            case 'RGBLight':
                return {
                    controlUtilities: LEDInit,
                }
            case 'LightSensor':
                return {
                    controlUtilities: LightSensorInit,
                }
            case 'ServoMotor':
                return {
                    controlUtilities: ServoMotorInit,
                }
            case 'PressureSensor':
                return {
                    controlUtilities: PressureSensorInit,
                }
            default:
                throw new Error("Device dependencies not in getDeviceControlUtilities");
        }
    }

}
export default new DeviceDependencies();