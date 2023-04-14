
import DeviceDependencies from "./DeviceDependencies";
import {v4 as uuidv4} from "uuid";

class SAMDeviceBuilder {
  deviceName: any;
  deviceId: any;
  deviceType: any;
  deviceAnimation: any;
  initialProps: any;
  store: any;

  constructor(deviceType: any, fetchDeviceAnimation: any,store: any) {
    this.deviceType = deviceType;
    this.deviceName = deviceType?.label?.name;
    this.deviceId = deviceType?.deviceId;
    this.deviceAnimation = fetchDeviceAnimation(deviceType?.label?.name);
    this.store = store
  }

  build() {
    const deviceIdOnCreate = uuidv4();
    const { VirtualController, Controller, ...rest } =
      DeviceDependencies.getDeviceControlUtilities(this.deviceName)
        ?.controlUtilities || {};
    const virtualController = new VirtualController();
    const controller = new Controller();
    this.store.addDeviceToStore(this.deviceName,deviceIdOnCreate)

    return {
      deviceIdOnCreate: deviceIdOnCreate,
      deviceAnimation: this.deviceAnimation,
      labels: this.deviceType?.label,
      virtualController: virtualController,
      controller: controller,
      ...rest,
    };
  }

  addDeviceToStore(){

  }
}

export default SAMDeviceBuilder;