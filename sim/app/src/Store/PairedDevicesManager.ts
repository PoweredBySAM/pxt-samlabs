import { deviceNameType } from "src/SAMDevices/Icons/deviceIconTypes";
import { BTDeviceToSimNameMap, simToBTDeviceNameMap } from "./storeUtils";

class PairedDevicesManager {
  pairedDevices: any[];
  private _deviceIdTracker: { [key: string]: number } = {};
  constructor() {
    this.pairedDevices = [];
  }

  addNewlyConnectedDevice(device: any) {
    const deviceName = BTDeviceToSimNameMap[device._namePrefix];
    this._deviceIdTracker = this._deviceIdTracker || {};
    this._deviceIdTracker[deviceName] =
      (this._deviceIdTracker[deviceName] || 0) + 1;
    device.assignedName = `${deviceName} ${this._deviceIdTracker[deviceName]}`;
    this.pairedDevices.push(device);
  }

  removeDisconnectedDevices() {
    this.pairedDevices = this.pairedDevices.filter(
      (pairedDevice: any) => pairedDevice._isConnected !== true
    );
  }

  getDevicesOfType(deviceBTName: string) {
    return this.pairedDevices.filter(
      (device: any) => device._namePrefix === deviceBTName
    );
  }

  getBTDevicesOfTypePairedAndConnected(deviceName: deviceNameType) {
    const BTName = simToBTDeviceNameMap[deviceName];
    const pairedDevicesOfType = this.getDevicesOfType(BTName);

    return pairedDevicesOfType.filter(
      (device: any) => !!device._connectedToSimDevice === true
    );
  }
  getBTDevicesOfTypePairedOnly(deviceName: deviceNameType) {
    const BTName = simToBTDeviceNameMap[deviceName];
    const pairedDevicesOfType = this.getDevicesOfType(BTName);

    return pairedDevicesOfType.filter(
      (device: any) => !!device._connectedToSimDevice === false
    );
  }

  getAllDevices() {
    return this.pairedDevices;
  }
}

const pairedDevicesManager = new PairedDevicesManager();
export default pairedDevicesManager;
