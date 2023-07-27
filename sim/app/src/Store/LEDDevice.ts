import { observable, action, makeObservable,makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";
import { update } from "@react-spring/web";

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
  @observable testLEDColor: string

  @observable _ledColor: string;
  _ledBrightness: number;
  customEventGenerator: CustomEventGenerator;
  lsStateStore: SamDeviceManager;
  

  constructor(deviceData: any) {
    this.lsStateStore = SamDeviceManager.getInstance();
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
    this.restProps = restprops;
    this.Color = meta?.hue;
    this.isActive = false;
    this.blockVisibility = true;
    this._ledColor = '#ffffff'
    this._ledBrightness = 100
    this.deviceInTestMode = false;
    this.testLEDColor = '#ffffff'
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
    this.updateLsStateStore();
  }

  @action
  setLEDBrightness(value: number) {
    this._ledBrightness = value;
    this._virtualController.setLEDBrightness = value;
    this.isConnected && this._bluetoothController?.setLEDBrightness(value);
    this.updateLsStateStore();
  }

  @action
  setLEDColor(value: string) {
    this._ledColor = value;
    this._virtualController.setLEDColor = value;
    this.isConnected && this._bluetoothController?.setLEDColor(value);
    this.updateLsStateStore();
  }
  @action
  setLEDTestColor(value: string) {
    console.log(value,'sote',this.testLEDColor)
    this.testLEDColor = value;
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
    if(!this.deviceInTestMode){
      this.testLEDColor = "#ffffff"
    }
    this.deviceInTestMode = !this.deviceInTestMode;
  }
  @action
  deleteDevice() {
    this.deleted = true;
  }
  @action
  setDeviceProp(property:string,value: string|number) {
    switch (property) {
      case 'led_color':
        this.setLEDColor(value as string)
        break;
      case 'brightness':
        this.setLEDBrightness(value as number)
        break;
      default:
        return "Invalid property"
    }
  }

  getAllData(){
    return {
      deviceId:this._deviceId,
      isDeviceActive:this.isActive,
      deviceColor:this.Color,
      ledColor:this._ledColor,
      ledBrightness:this._ledBrightness,
    }
  }
  broadcastState(eventName ?:string) {
    this.customEventGenerator.dispatchEvent('deviceStateChange', {
      data:this.getAllData()
    });
  }
  get ledColor() {
    return this._ledColor;
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

export default LEDDevice;
