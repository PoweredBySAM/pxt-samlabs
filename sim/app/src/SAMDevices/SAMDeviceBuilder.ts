import DeviceDependencies from "./DeviceDependencies";
import { v4 as uuidv4 } from "uuid";
export const defaultDeviceColor = "#000000";
const defaultDeviceName = "SAM Button";

class SAMDeviceBuilder {
  deviceName: any;
  deviceId: any;
  deviceType: any;
  initialProps: any;
  store: any;

  constructor(deviceType: any) {
    this.deviceType = deviceType;
    this.deviceName = deviceType?.label?.name;
    this.deviceId = deviceType?.deviceId;
  }

  build() {
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
      defaultDeviceName
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
