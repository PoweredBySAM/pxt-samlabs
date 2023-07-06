import { observable, action, makeObservable,makeAutoObservable } from 'mobx';

import { storeMap } from '.';
import type { IBuiltDevice } from '../SAMDevices/Types/SAMDeviceTypes';
import { makePersistable } from 'mobx-persist-store';

class DevicesStore {
  @observable devices:any[] = [];

  constructor() {
    makeObservable(this);
    makePersistable(this, { name: 'DevicesStore', properties: ['devices'] });

  }

  @action addDevice(deviceData: IBuiltDevice) {
    const device = this.buildStore(deviceData);
      this.devices.push(device);
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
    device?.toggleVisibility();
  }

  @action emptyDevicesStore() {
    this.devices = [];
  }

  
  buildStore(deviceData:IBuiltDevice){
    const store = storeMap[deviceData.labels.defaultName as keyof typeof storeMap];
    console.log(deviceData.labels.defaultName,"store")
    if (store) {
      return new store(deviceData);
    }
    throw new Error('No store in storemap for device');
  }
}

export default new DevicesStore();
