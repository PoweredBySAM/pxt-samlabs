import DeviceDependencies from "./DeviceDependencies";
import { v4 as uuidv4 } from "uuid";
import { DeviceMenuItemType, IBuiltDevice } from "./Types/SAMDeviceTypes";
import { deviceNameType } from "./Icons/deviceIconTypes";
export const defaultDeviceColor = "#000000";

class SAMDeviceBuilder {
  deviceName: deviceNameType;
  deviceType: any;
  defaultDeviceName: string;
  id: any;
  deviceVarInPxt: any;

  constructor(deviceType: DeviceMenuItemType) {
    this.deviceType = deviceType;
    this.deviceName = deviceType?.label?.name;
    this.defaultDeviceName = deviceType?.label?.defaultName;
    this.id = deviceType?.id;
    this.deviceVarInPxt = deviceType?.globalVar;
  }
  build(): IBuiltDevice {
    const deviceIdOnCreate = this.id || uuidv4();
    const { VirtualController, VirtualInteractionComponent, ...rest } =
      DeviceDependencies.getDeviceControlUtilities(this.deviceName)
        ?.controlUtilities || {};
    const virtualController = new VirtualController(
      defaultDeviceColor,
      this.defaultDeviceName
    );
    return {
      deviceIdOnCreate: deviceIdOnCreate,
      virtualInteractionComponentName: this.deviceName,
      deviceAnimation: VirtualInteractionComponent,
      labels: this.deviceType?.label,
      virtualController: virtualController,
      deviceVarInPxt: this.deviceVarInPxt,
      ...rest,
    };
  }
}
export default SAMDeviceBuilder;
