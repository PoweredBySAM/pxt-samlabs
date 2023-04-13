import DeviceDependencies from "./DeviceDependencies";
import { getInitialProps } from "./InitialDeviceProps";

class SAMDeviceBuilder {
  deviceName: any;
  deviceId: any;
  deviceType: any;
  deviceAnimation: any;
  initialProps: any;

  constructor(deviceType: any,fetchDeviceAnimation:any) {
    this.deviceType = deviceType;
    this.deviceName = deviceType?.label?.name;
    this.deviceId = deviceType?.deviceId;
    this.deviceAnimation = fetchDeviceAnimation(deviceType?.label?.name)
    this.initialProps = getInitialProps(deviceType?.label?.name)
  }

  build() { 
      return {
        dependencies:DeviceDependencies.getDeviceInitDepencies(this.deviceName),
        id: this.deviceId,
        deviceName: this.deviceName,
        deviceAnimation: this.deviceAnimation,
        labels: this.deviceType?.label,
        props:this.initialProps
      }
  }

}

export default SAMDeviceBuilder;