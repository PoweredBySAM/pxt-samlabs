import Device from "../Store/Device";
import ButtonInit from "./Animatable/Button/ButtonInit";

class DeviceDependencies
{

    getDeviceControlUtilities(deviceName:string) {
        switch (deviceName){
            case "Button":
                return {
                    controlUtilities: ButtonInit,
                }
            default:
                return {}
        }
    }

}
export default new DeviceDependencies();