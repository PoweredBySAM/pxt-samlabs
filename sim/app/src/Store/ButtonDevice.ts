import { observable, action, makeObservable,makeAutoObservable } from 'mobx';
import { CustomEventGenerator } from '../Features/CustomEventGenerator';
import SamDeviceManager from 'src/Features/SamSimState';

class ButtonDevice {
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
  @observable deviceInTestMode: boolean;
  @observable deleted : boolean;
  customEventGenerator: CustomEventGenerator;
  lsStateStore:SamDeviceManager;


  constructor(deviceData: any) {
    this.lsStateStore = SamDeviceManager.getInstance()
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
    this.possibleStates = meta?.possibleStates;
    this.virtualInteractionComponentName = virtualInteractionComponentName;
    this._virtualController = virtualController;
    this.restProps = restprops;
    this.currentState = meta?.defaultState;
    this.blockVisibility = true
    this.deviceInTestMode = false
    this.deleted = false
    this.Color=meta?.hue;
    makeAutoObservable(this)
    this.updateLsStateStore()

  }

  @action
  updateState(newState: string) {
    if (this.possibleStates.includes(newState)) {
      this.currentState = newState;
      this.updateLsStateStore()
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
    this.updateLsStateStore()  }
  @action
  toggleVisibility() {
    this.blockVisibility = !this.blockVisibility;
  }
  @action
  toggleTestMode() {
    this.deviceInTestMode = !this.deviceInTestMode;
  }
  @action
  deleteDevice() {
    this.deleted = true;
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
      deviceState:this.currentState,
      deviceColor:this.Color,
      isDeleted:this.deleted,
    }
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
  
  updateLsStateStore(){
    this.lsStateStore.updateDevice(this.getAllData())
  }


}

export default ButtonDevice;
