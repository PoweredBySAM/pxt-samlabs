import type { IBuiltDevice } from "../SAMDevices/Types/SAMDeviceTypes";
import { observable, action, makeAutoObservable } from "mobx";

import ButtonDevice from "./ButtonDevice";
import BuzzerDevice from "./BuzzerDevice";
import DCMotorDevice from "./DCMotorDevice";
import HeatSensorDevice from "./HeatSensorDevice";
import LEDDevice from "./LEDDevice";
import LightSensorDevice from "./LightSensorDevice";
import MicrobitDevice from "./MicrobitDevice";
import PressureSensorDevice from "./PressureSensorDevice";
import ServoMotorDevice from "./ServoMotorDevice";
import SliderDevice from "./SliderDevice";
import TiltDevice from "./TiltDevice";
import SamDeviceManager from "src/Features/SamSimState";

export const storeMap = {
  "SAM Button": ButtonDevice,
  "SAM Buzzer": BuzzerDevice,
  "SAM RGB Light": LEDDevice,
  "SAM DC Motor": DCMotorDevice,
  "SAM Light Sensor": LightSensorDevice,
  "SAM Servo Motor": ServoMotorDevice,
  "SAM Pressure Sensor": PressureSensorDevice,
  "SAM Proximity Sensor": PressureSensorDevice,
  "SAM Slider": SliderDevice,
  "SAM Heat Sensor": HeatSensorDevice,
  "SAM Tilt": TiltDevice,
  "BBC Microbit": MicrobitDevice,
};

class DevicesStore {
  @observable devices: any[] = [];
  lsStateStore: any;
  constructor() {
    makeAutoObservable(this);
    this.lsStateStore = SamDeviceManager.getInstance();
  }

  @action addDevice(deviceData: IBuiltDevice) {
    const device = this.buildStore(deviceData);
    this.devices.push(device);
    this.updateAssignedNames();
    this.devices.forEach((device) => {
      window.parent.postMessage(
        {
          type: device.createMessageType,
          id: device.assignedName,
        },
        window.location.origin
      );
    });
  }

  // @action connectDevice(id: string) {
  //   const device = this.devices.find((device) => device.id === id);
  //   if (device) {
  //     device.connect();
  //   }
  // }
  //
  // @action disconnectDevice(id: string) {
  //   const device = this.devices.find((device) => device.id === id);
  //   if (device) {
  //     device.disconnect();
  //   }
  // }
  // @action toggleDeviceFullVisibility(id: string) {
  //   const device: any = this.devices.find((device) => device.id === id);
  //   device?.toggleVisibility();
  // }

  @action emptyDevicesStore() {
    this.devices = [];
    this.lsStateStore.emptySamSimState();
  }
  @action updateAssignedNames() {
    const counts: { [key: string]: number } = {};

    this.devices.forEach((device) => {
      const deviceType = device.constructor.name;
      const count = counts[deviceType] || 0;
      counts[deviceType] = count + 1;
      device.assignedName = `${deviceType} ${count + 1}`;
    });
  }

  buildStore(deviceData: IBuiltDevice) {
    const store =
      storeMap[deviceData.labels.defaultName as keyof typeof storeMap];
    if (store) {
      return new store(deviceData);
    }
    throw new Error("No store in storemap for device");
  }
}
const devicesStore = new DevicesStore();

export default devicesStore;
