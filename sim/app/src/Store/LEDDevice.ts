import { observable, action, makeObservable,makeAutoObservable } from "mobx";

class LEDDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;

  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color = "";
  @observable  isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;

    _ledColor: string;
    _ledBrightness: number;

  constructor(deviceData: any) {
    const {
      deviceIdOnCreate,
      meta,
      virtualInteractionComponentName,
      virtualController,
      controller,
      ...restprops
    } = deviceData;
    this._deviceId = deviceIdOnCreate;
    this.virtualInteractionComponentName = virtualInteractionComponentName;
    this._virtualController = virtualController;
    this._bluetoothController = controller;
    this.restProps = restprops;
    this.Color = meta?.hue;
    this.isActive = false;
    this.blockVisibility = true;
    this._ledColor = '#000000'
    this._ledBrightness = 100
    this.deviceInTestMode = false;
    this.deleted = false;
    makeAutoObservable(this);

  }
  @action
  toggleVisibility() {
    this.blockVisibility = !this.blockVisibility;
  }

  @action
  updateBatteryLevel(level: number) {
    this.batteryLevel = level;
  }
  @action
  updateIsConnected(value: boolean) {
    this.isConnecting = false;
    this.isConnected = value;
  }
  @action
  updateIsConnecting(value: boolean) {
    this.isConnected = value;
  }
  @action
  updateColor(value: string) {
    this.Color = value;
  }

  @action
  setLEDBrightness(value: number) {
    this._ledBrightness = value;
    this._virtualController.setLEDBrightness = value;
    this.isConnected && this._bluetoothController?.setLEDBrightness(value);
  }

  @action
  setLEDColor(value: string) {
    this._ledColor = value;
    this._virtualController.setLEDColor = value;
    this.isConnected && this._bluetoothController?.setLEDColor(value);
  }

  @action
  isLEDOn() {
    return this._virtualController.isLEDOn || this._bluetoothController?.isLEDOn();
  }

  @action
  turnLEDOff() {
    this._virtualController.turnLEDOff();
    this.isConnected && this._bluetoothController?.turnLEDOff();
  }

  @action
  reset() {
    this._virtualController._reset();
    this.isConnected && this._bluetoothController?._reset();
  } 

  @action
  getLEDBrightness() {
    return this._virtualController.getLEDBrightness || ( this.isConnected && this._bluetoothController?.getLEDBrightness());
  }
  @action
  toggleTestMode() {
    this.deviceInTestMode = !this.deviceInTestMode;
  }
  @action
  deleteDevice() {
    this.deleted = true;
  }

  get virtualController() {
    return this._virtualController;
  }
  get bluetoothController() {
    return this._bluetoothController;
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
}

export default LEDDevice;
