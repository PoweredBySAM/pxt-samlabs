import { CustomEventGenerator } from "./CustomEventGenerator";


export enum samSimEvents {
    TOSIM_DEVICE_VALUE_CHANGED = 'TOSIM_DEVICE_VALUE_CHANGED',
    TOSIM_DEVICE_CREATED = 'TOSIM_EDITOR_DEVICE_CREATED',
    FROMSIM_DEVICE_VALUE_CHANGED = 'FROMSIM_DEVICE_VALUE_CHANGED',
}

export type eventNameType =
  | "save_sam_device"
  | "update_sam_device"
  | "delete_sam_device"
  | "add_sam_device";

export default class SamDeviceManager {
  private devicesKey: string = "sam_devices_state";

  private static instance: SamDeviceManager;

  private constructor() {}

  public static getInstance(): SamDeviceManager {
    if (!SamDeviceManager.instance) {
      SamDeviceManager.instance = new SamDeviceManager();
    }
    return SamDeviceManager.instance;
  }

  private loadDevices(): Array<any> {
    const devices = localStorage.getItem(this.devicesKey);
    if (!!devices) {
      return JSON.parse(devices);
    } else {
      localStorage.setItem(this.devicesKey, JSON.stringify([]));
      return [];
    }
  }

  private saveDevices(devices: Array<any>): void {
    localStorage.setItem(this.devicesKey, JSON.stringify(devices));
  }
  public emptySamSimState(): void {
    localStorage.setItem(this.devicesKey, JSON.stringify([]));
  }

  public addNewDevice(device: any): void {
    const {deviceId} = device || {};
    if (!this.getDevice(deviceId)) {
      const devices = this.loadDevices();
      this.saveDevices([...devices,device]);
    }
  }

  public getDevice(id: string): any {
    const devices = this.loadDevices();
    return devices.find((device) => device.deviceId === id);
  }

  public updateDevice(updatedDevice: any): void {
    const isDeviceInStore = this.getDevice(updatedDevice.deviceId);
    if (!isDeviceInStore) {
      this.addNewDevice(updatedDevice);
    } else {
      let devices = this.loadDevices();
      const newDevices = devices.map((device) =>
        device.deviceId === updatedDevice.deviceId
          ? { ...device, ...updatedDevice }
          : { ...device }
      );
      this.saveDevices(newDevices);
      this.dispatchEvent(
        `${samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED}_${updatedDevice.deviceId}`,
        devices.find((device) => device.id === updatedDevice.id)
      );
    }
  }

  public deleteDevice(id: string): void {
    let devices = this.loadDevices();
    devices = devices.filter((device) => device.deviceId !== id);
    this.saveDevices([...devices]);
    this.dispatchEvent("delete_sam_device", id);
  }

  public dispatchEvent(eventName: string, detail: any): void {
    CustomEventGenerator.getInstance().dispatchEvent(eventName, detail);
  }

  public processEventQueue(queueItem: any): number {
    const { eventName, detail } = queueItem || {};
    switch (eventName) {
      case "save_sam_device":
        this.addNewDevice(detail);
        return 1;
      case "update_sam_device":
        this.updateDevice(detail);
        return 1;
      case "delete_sam_device":
        this.deleteDevice(detail);
        return 1;
      case "add_sam_device":
        this.addNewDevice(detail);
        return 1;
      default:
        return 0;
    }
  }
}

