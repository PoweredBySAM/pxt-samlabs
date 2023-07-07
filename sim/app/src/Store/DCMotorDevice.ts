import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";

class DCMotorDevice {
   _virtualController: any;
   _bluetoothController: any;
   _deviceId: string;
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
  @observable testModeSpeed:number;
   @observable speed: number;
    _adjustedSpeed: number;
  customEventGenerator: CustomEventGenerator;

  constructor(deviceData: any) {
    this.customEventGenerator = CustomEventGenerator.getInstance();
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
    this.speed = 0
    this._adjustedSpeed = 0
    this.deviceInTestMode = false;
    this.deleted = false;
    this.testModeSpeed = 0
    makeAutoObservable(this);
    this.broadcastState();

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
    this.broadcastState();
  }

  @action
  setSpeed(value: number) {
    this.speed = value;
    this.isConnected && this._bluetoothController?.setSpeed(value);
    this.broadcastState();
  }
  @action
  setDeviceProp(property:string,value: number) {
    switch (property) {
      case 'speed':
        this.setSpeed(value)
        break;
      default:
        return "Invalid property"
    }
  }

  @action
  getspeed() {
    console.log(this._virtualController,'this._virtualController')
    return this._virtualController.getSpeed || ( this.isConnected && this._bluetoothController?.getSpeed)|| 0;
  }

  @action
  getTestspeed() {
    return this.testModeSpeed;
  }

  @action
  reset() {
    this._virtualController._reset();
    this.isConnected && this._bluetoothController?._reset();
  } 
  @action
  toggleTestMode() {
    if(!this.deviceInTestMode){
      this.testModeSpeed = 0
    }
    this.deviceInTestMode = !this.deviceInTestMode;

  }
  @action
  deleteDevice() {
    this.deleted = true;
    this.broadcastState();
  }
  @action
  setTestModeSpeed(value:number) {
    this.testModeSpeed = value;
  }

  get virtualController() {
    return this._virtualController;
  }
  get bluetoothController() {
    return this._bluetoothController;
  }
  broadcastState(eventName ?:string) {
    this.customEventGenerator.dispatchEvent('deviceStateChange', {
      data:this.getAllData()
    });
  }
  getAllData(){
    return {
      deviceId:this._deviceId,
      deviceType:this.virtualInteractionComponentName,
      isDeviceActive:this.isActive,
      deviceColor:this.Color,
      deviceSpeed:this.speed,

    }
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
}

export default DCMotorDevice;
