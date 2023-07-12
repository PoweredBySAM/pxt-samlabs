import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class ServoMotorDevice {
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
  @observable _position: number;
  @observable  _adjustedPosition: number;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable testPosition: number;
  customEventGenerator: any;
  lsStateStore: SamDeviceManager;

  constructor(deviceData: any) {
    this.customEventGenerator = CustomEventGenerator.getInstance();
    this.lsStateStore = SamDeviceManager.getInstance();
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
    this._position = 0
    this._adjustedPosition = 0
    this.deviceInTestMode = false;
    this.testPosition = 0
    this.deleted = false;
    makeAutoObservable(this);
    this.updateLsStateStore();


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
    this.updateLsStateStore()
  }

  @action
  getPosition() {
    return this._virtualController.getPosition()||
    this.isConnected && this._bluetoothController?.getPosition();
  }
  @action
  setPosition(value: number) {
    this._virtualController.setPosition(value);
    this.isConnected && this._bluetoothController?.setSpeed(value);
    this.updateLsStateStore()
  }
  @action
  setTestPosition(value: number) {
    this.testPosition = this.testPosition + value;
  }

  @action
  reset() {
    this._virtualController._reset();
    this.isConnected && this._bluetoothController?._reset();
  } 

  @action
  toggleTestMode() {
    if(!this.deviceInTestMode){
      this.testPosition = 0
    }
    this.deviceInTestMode = !this.deviceInTestMode;
  }

  @action
  deleteDevice() {
    this.deleted = true;
  }

  getAllData(){
    return {
      deviceId:this._deviceId,
      deviceType:this.virtualInteractionComponentName,
      isDeviceActive:this.isActive,
      deviceColor:this.Color,
      currentValue:this._position,
    }
  }
  broadcastState(eventName ?:string) {
    this.customEventGenerator.dispatchEvent('deviceStateChange', {
      data:this.getAllData()
    });
  }

  updateLsStateStore(){ 
    this.lsStateStore.updateDevice(this.getAllData())
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

export default ServoMotorDevice;
