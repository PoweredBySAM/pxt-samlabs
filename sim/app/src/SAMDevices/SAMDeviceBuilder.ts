
class SAMDeviceBuilder {
  deviceName: any;
  deviceId: any;
  deviceType: any;
    deviceAnimation: any;

  constructor(deviceType: any,fetchDeviceAnimation:any) {
    this.deviceType = deviceType;
    this.deviceName = deviceType?.label?.name;
    this.deviceId = deviceType?.deviceId;
    this.deviceAnimation = fetchDeviceAnimation(deviceType?.label?.name)
  }

  build() { 
      return {
        id: this.deviceId,
        deviceName: this.deviceName,
        deviceAnimation: this.deviceAnimation,
        labels: this.deviceType?.label,
        data:this.initialData(this.deviceName),
      }
  }
  initialData = (deviceName: any)=> {
    // TODO: return initial data for each device
       return {data:{}}
   
   }
}


const getInitialData = (deviceName: any)=> {
 // TODO: return initial data for each device
    return {data:{}}

}
export default SAMDeviceBuilder;