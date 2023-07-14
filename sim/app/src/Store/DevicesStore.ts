import type { IBuiltDevice } from "../SAMDevices/Types/SAMDeviceTypes";
import { observable, action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import ButtonDevice from "src/Store/ButtonDevice";
import BuzzerDevice from "src/Store/BuzzerDevice";
import LEDDevice from "src/Store/LEDDevice";
import DCMotorDevice from "src/Store/DCMotorDevice";
import LightSensorDevice from "src/Store/LightSensorDevice";
import ServoMotorDevice from "src/Store/ServoMotorDevice";
import PressureSensorDevice from "src/Store/PressureSensorDevice";
import SliderDevice from "src/Store/SliderDevice";
import HeatSensorDevice from "src/Store/HeatSensorDevice";
import TiltDevice from "src/Store/TiltDevice";
import MicrobitDevice from "src/Store/MicrobitDevice";

const storeMap = {
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
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: "DevicesStore", properties: ["devices"] });
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
