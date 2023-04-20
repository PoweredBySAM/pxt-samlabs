import ButtonInit from "./Animatable/Button/ButtonInit";
import BuzzerInit from "./Animatable/Buzzer/BuzzerInit";
import DCMotorInit from "./Animatable/DCMotor/DCMotorInit";
import { LEDInit } from "./Animatable/LED/LEDInit";
import { deviceNameType } from "./Icons/deviceIconTypes";

class DeviceDependencies
{

    getDeviceControlUtilities(deviceName:deviceNameType) {
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
            default:
                throw new Error("Device dependencies not in getDeviceControlUtilities");
                
        }
    }

}
export default new DeviceDependencies();