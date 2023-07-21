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
import GoogleSheetDevice from "src/Store/GoogleSheetDevice";

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
  "GGL GoogleSheet": GoogleSheetDevice,
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
  }

  @action connectDevice(id: string) {
    const device = this.devices.find((device) => device.id === id);
    if (device) {
      device.connect();
    }
  }

  @action disconnectDevice(id: string) {
    const device = this.devices.find((device) => device.id === id);
    if (device) {
      device.disconnect();
    }
  }
  @action toggleDeviceFullVisibility(id: string) {
    const device: any = this.devices.find((device) => device.id === id);
    device?.toggleVisibility();
  }

  @action emptyDevicesStore() {
    this.devices = [];
    this.lsStateStore.emptySamSimState();
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
