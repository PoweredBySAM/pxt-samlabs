import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class HeatSensorDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  lsStateStore:SamDeviceManager;


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
  customEventGenerator: CustomEventGenerator;
  value: number;

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
    this._ledColor = '#000000'
    this._ledBrightness = 100
    this.deviceInTestMode = false;
    this.deleted = false;
    this.value = 0;
    this.customEventGenerator = CustomEventGenerator.getInstance();
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
    this.updateLsStateStore(); 
    this.broadcastState();
  }
  @action
  setValue(newValue: number) {
    this.value = newValue;
    console.log(newValue, "value in store")
  }

  @action
  getCelsiusValue() {
    return this._virtualController.getCelsiusValue || ( this.isConnected && this._bluetoothController?.getCelsiusValue());
  }

  @action
  getFarenheitValue() {
    return this._virtualController.getFarenheitValue || ( this.isConnected && this._bluetoothController?.getFarenheitValue());
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
  deleteDevice() {
    this.deleted = true;
    this.broadcastState();  
  }

  toggleTestMode() {
    this.deviceInTestMode = !this.deviceInTestMode;
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

export default HeatSensorDevice;
