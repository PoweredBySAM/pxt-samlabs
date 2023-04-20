import { observable, action, makeObservable,makeAutoObservable } from 'mobx';
import { storeMap } from '.';

class DevicesStore {
  @observable devices:any[] = [];

  constructor() {
    makeObservable(this);
  }

  @action addDevice(deviceData: any) {
    const device = this.buildStore(deviceData);
      this.devices.push(device);
  }

  @action removeDevice(id: string) {
    this.devices = this.devices.filter(device => device.id !== id);
  }

  @action connectDevice(id: string) {
    const device = this.devices.find(device => device.id === id);
    if (device) {
      device.connect();
    }
  }

  @action disconnectDevice(id: string) {
    const device = this.devices.find(device => device.id === id);
    if (device) {
      device.disconnect();
    }
  }  
  @action toggleDeviceFullVisibility(id: string) {
    const device:any = this.devices.find(device=>(device.id === id))
    console.log(device)
    device?.toggleVisibility();
  }

  
  buildStore(deviceData:any){
    const store = storeMap[deviceData.labels.defaultName as keyof typeof storeMap];
    if (store) {
      return new store(deviceData);
    }
  }
}

export default new DevicesStore();
