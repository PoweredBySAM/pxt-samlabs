export type eventNameType =
  | "save_sam_device"
  | "update_sam_device"
  | "delete_sam_device"
  | "add_sam_device";

export default class SamDeviceManager {
  private devicesKey: string = "sam_devices_state";

  constructor() {}

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

  public addNewDevice(device: any): void {
    const { id } = device || {};
    if (!this.getDevice(id)) {
      const devices = this.loadDevices();
      devices.push(device);
      this.saveDevices(devices);
      this.dispatchEvent("add_sam_device", device);
    } else {
      throw new Error("Device already exists");
    }
  }

  public getDevice(id: string): any {
    const devices = this.loadDevices();
    return devices.find((device) => device.id === id);
  }

  public updateDevice(updatedDevice: any): void {
    let devices = this.loadDevices();
    devices = devices.map((device) =>
      device.id === updatedDevice.id
        ? { ...device, ...updatedDevice }
        : { ...device }
    );
    this.saveDevices(devices);
    this.dispatchEvent("sam_device_value_changed", updatedDevice);
  }

  public deleteDevice(id: string): void {
    let devices = this.loadDevices();
    devices = devices.filter((device) => device.id !== id);
    this.saveDevices([...devices]);
    this.dispatchEvent("delete_sam_device", id);
  }

  public dispatchEvent(eventName: string, detail: any): void {
    const event = new CustomEvent(eventName, { detail: detail });
    window.dispatchEvent(event);
  }

  public processEventQueue(queueItem:any): number {
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

