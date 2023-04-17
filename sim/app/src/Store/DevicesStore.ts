import { observable, action, makeObservable } from 'mobx';
import Device from './Device';

class DevicesStore {
  @observable devices:any[] = [];

  constructor() {
    makeObservable(this);
  }

  @action addDevice(deviceData: any) {
    const device = new Device(deviceData);
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
}

export default new DevicesStore();
