import { observable, action, makeObservable } from 'mobx';
import Device from './Device';

class DevicesStore {
  @observable devices = new Map();

  constructor() {
    makeObservable(this);
  }

  @action addDevice(id: any) {
    this.devices.set(id, new Device(id));
  }

  @action removeDevice(id: any) {
    this.devices.delete(id);
  }

  @action connectDevice(id: any) {
    const device = this.devices.get(id);
    if (device) {
      device.connect();
    }
  }

  @action disconnectDevice(id: any) {
    const device = this.devices.get(id);
    if (device) {
      device.disconnect();
    }
  }
}

export default DevicesStore;
