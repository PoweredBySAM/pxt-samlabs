import { observable, action, makeObservable,makeAutoObservable } from 'mobx';

class Device {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;

  @observable currentState = "";
  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color = '';
  @observable blockVisibility: boolean;

  constructor(deviceData: any) {
    ;
    const {
      deviceIdOnCreate,
      meta,
      virtualInteractionComponentName,
      virtualController,
      controller,
      ...restprops
    } = deviceData;
    this._deviceId = deviceIdOnCreate;
    this.possibleStates = meta?.possibleStates;
    this.virtualInteractionComponentName = virtualInteractionComponentName;
    this._virtualController = virtualController;
    this._bluetoothController = controller;
    this.restProps = restprops;
    this.currentState = meta?.defaultState;
    this.blockVisibility = true
    this.Color=meta?.hue;
    makeAutoObservable(this)
  }

  @action
  updateState(newState: string) {
    if (this.possibleStates.includes(newState)) {
      this.currentState = newState;
    }
  }

  @action
  updateBatteryLevel(level: number) {
    this.batteryLevel = level;
  }
  @action
  updateIsConnected(value:boolean) {
    this.isConnecting = false;
    this.isConnected = value;
  }
  @action
  updateIsConnecting(value:boolean) {
    this.isConnected = value;
  }
  @action
  updateColor(value:string) {
    this.Color = value;
  }
  @action
  toggleVisibility() {
    this.blockVisibility = !this.blockVisibility;
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

export default Device;
