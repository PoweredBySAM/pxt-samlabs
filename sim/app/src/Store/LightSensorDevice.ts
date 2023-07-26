import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class LightSensorDevice {
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
  @observable value: number;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  customEventGenerator: CustomEventGenerator;
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
    this.restProps = restprops;
    this.Color = meta?.hue;
    this.isActive = false;
    this.blockVisibility = true;
    this.value = 0
    this.deviceInTestMode = false;
    this.deleted = false;
    makeAutoObservable(this);
    this.updateLsStateStore();
  }
  @action 
  setBluetoothController(controller:any){
    this._bluetoothController = controller
    this.isConnected = true
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
  }

  @action
  setValue(newValue: number) {
    this.value = newValue;
    this.updateLsStateStore();  
  }

  @action
  getValue() {
    return (this.isConnected && this._bluetoothController?.getValue)||this.value;
  }

  @action
  reset() {
    this._virtualController._reset();
    this.isConnected && this._bluetoothController?._reset();
  } 

  @action
  toggleTestMode() {
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
      currentValue:this.getValue(),

    }
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
  updateLsStateStore(){ 
    this.lsStateStore.updateDevice(this.getAllData())
  }

}

export default LightSensorDevice;
