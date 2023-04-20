import DeviceDependencies from "./DeviceDependencies";
import { v4 as uuidv4 } from "uuid";
import { IBuiltDevice } from "./Types/SAMDeviceTypes";
export const defaultDeviceColor = "#000000";

class SAMDeviceBuilder {
  deviceName: any;
  deviceId: any;
  deviceType: any;
  initialProps: any;
  store: any;
  defaultDeviceName:string

  constructor(deviceType: any) {
    this.deviceType = deviceType;
    this.deviceName = deviceType?.label?.name;
    this.defaultDeviceName = deviceType?.label?.defaultDeviceName
    this.deviceId = deviceType?.deviceId;
  }

  build(): IBuiltDevice {
    const deviceIdOnCreate = uuidv4();
    const {
      VirtualController,
      Controller, 
      VirtualInteractionComponent,
      ...rest
    } =
      DeviceDependencies.getDeviceControlUtilities(this.deviceName)
        ?.controlUtilities || {};
    const virtualController = new VirtualController(
      defaultDeviceColor,
      this.defaultDeviceName
    );
    const controller = new Controller(defaultDeviceColor);

    return {
      deviceIdOnCreate: deviceIdOnCreate,
      virtualInteractionComponentName: this.deviceName,
      deviceAnimation: VirtualInteractionComponent,
      labels: this.deviceType?.label,
      virtualController: virtualController,
      controller: controller,
      ...rest,
    };
  }
}
export default SAMDeviceBuilder;


