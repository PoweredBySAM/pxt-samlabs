import Device from "../Store/Device";
import ButtonInit from "./Animatable/Button/ButtonInit";

class DeviceDependencies
{

    getDeviceInitDepencies(deviceName:string) {
        switch (deviceName){
            case "SAM Button":
                return {
                    controller: ButtonInit,
                }
        }
    }

}
export default new DeviceDependencies();