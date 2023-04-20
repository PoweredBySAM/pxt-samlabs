import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { IBuzzerDevice } from "./types";

class BuzzerDevice {
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
  pitch: any;
  volume: number;
  @observable  isActive: boolean;
  @observable blockVisibility: boolean;

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
    this.pitch = virtualController?.pitch;
    this.volume = 100;
    this.Color = meta?.hue;
    this.isActive = false;
    this.blockVisibility = true;
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
  setPitch(value: number) {
    this.pitch = value;
    this._virtualController?._toneGenerator?.setPitch(value);
    this.isConnected && this._bluetoothController?.setPitch(value);
  }

  @action
  setVolume(value: number) {
    this.volume = value;
    this._virtualController?._toneGenerator?.setVolume(value);
    this.isConnected && this._bluetoothController?.setVolume(value);
  }
  @action
  start() {
    this.isActive = true
    this._virtualController?._toneGenerator?.start();
  }
  @action
  clear() {
    this.isConnected && this._bluetoothController?.clear();
  }

  @action
  reset() {
    this.isConnected && this._bluetoothController?._reset();
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

export default BuzzerDevice;
