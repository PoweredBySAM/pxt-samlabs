import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class DCMotorDevice {
   _virtualController: any;
   _deviceId: string;
  restProps: any;
  virtualInteractionComponentName: string;
  lsStateStore:SamDeviceManager;


  @observable isConnected = false;
  @observable isConnecting = false;
  @observable _bluetoothController: any;
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
  deviceVarNameInPxt: any;

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
    this.restProps = restprops;
    this.Color = meta?.hue;
    this.isActive = false;
    this.blockVisibility = true;
    this.speed = 0
    this._adjustedSpeed = 0
    this.deviceInTestMode = false;
    this.deleted = false;
    this.testModeSpeed = 0
    this.deviceVarNameInPxt = deviceData.deviceVarNameInPxt;
    makeAutoObservable(this);
    this.updateLsStateStore()

  }
  
  @action 
  setBluetoothController(controller:any){
    this._bluetoothController = controller
    this.isConnected = true
    this.hydrateBTController()
  }

  @action
  disconnectBluetoothController(){
    this._bluetoothController = null
    this.isConnected = false
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
    this.hydrateBTController()
    this.updateLsStateStore();
  }

  @action
  setSpeed(value: number) {
    this.speed = value;
    this.hydrateBTController()
    this.updateLsStateStore();
  }

  @action
  setDeviceProp(property:string,value: number|string) {
    switch (property) {
      case 'speed':
        this.setSpeed(value as number)
        break;
      case 'color':
        this.updateColor(value as string)
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
  }

  @action
  setTestModeSpeed(value:number) {
    this.testModeSpeed = value;
  }
  hydrateBTController(){
    if(!this._bluetoothController) return
    this._bluetoothController.setSpeed(this.speed);
    this._bluetoothController.setColor(this.Color);
  }

  get virtualController() {
    return this._virtualController;
  }
  get bluetoothController() {
    return this._bluetoothController;
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
  updateLsStateStore(data?:any){ 
    this.lsStateStore.updateDevice(this.getAllData())
  }
}

export default DCMotorDevice;
