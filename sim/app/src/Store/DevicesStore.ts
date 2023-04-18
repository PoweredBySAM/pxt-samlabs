import { observable, action, makeObservable } from 'mobx';
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
  buildStore(deviceData:any){
    console.log(deviceData.labels.name,"labels....")
    const store = storeMap[deviceData.labels.defaultName as keyof typeof storeMap];
    console.log(store)
    if (store) {
      return new store(deviceData);
    }
  }
}

export default new DevicesStore();
