import Device from "../Store/Device";
import ButtonInit from "./Animatable/Button/ButtonInit";
import BuzzerInit from "./Animatable/Buzzer/BuzzerInit";

class DeviceDependencies
{

    getDeviceControlUtilities(deviceName:string) {
        switch (deviceName){
            case "Button":
                return {
                    controlUtilities: ButtonInit,
                }
            case "Buzzer":
                return {
                    controlUtilities: BuzzerInit,
                }
            default:
                return {}
        }
    }

}
export default new DeviceDependencies();