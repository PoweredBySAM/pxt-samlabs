import { observable, action,makeAutoObservable } from "mobx";
import AudioController from "../Utils/Tones/toneGenerator/AudioController";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
class BuzzerDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  testAudioController: AudioController = new AudioController();

  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color = "";
  pitch: any;
  volume: number;
  @observable  isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable testSoundActive: boolean = false;
  customEventGenerator: any;

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
    this.pitch = virtualController?.pitch;
    this.volume = 100;
    this.Color = meta?.hue;
    this.isActive = false;
    this.blockVisibility = true;
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
    this.broadcastState()
  }

  @action
  setPitch(value: number) {
    this.pitch = value;
    this._virtualController?._toneGenerator?.setPitch(value);
    this.isConnected && this._bluetoothController?.setPitch(value);
    this.broadcastState()
  }
  getAllData(){
    return {
      deviceId:this._deviceId,
      deviceType:this.virtualInteractionComponentName,
      deviceVlume:this.volume,
      devicePitch:this.pitch,
      isDeviceActive:this.isActive,
      deviceColor:this.Color,
    }
  }
  @action
  setVolume(value: number) {
    this.volume = value;
    this._virtualController?._toneGenerator?.setVolume(value);
    this.isConnected && this._bluetoothController?.setVolume(value);
    this.broadcastState()
  }
  @action
  start() {
    this.isActive = true
    this._virtualController?._toneGenerator?.start();
    this.broadcastState()
  }
  @action
  testTone(key?:string,value?:number){
    switch(key){
      case 'start': {
        this.testSoundActive = true;
        this.testAudioController.start()
        this.testAudioController.setVolume(100);

      }; 
      break;
      case 'stop': {
        this.testSoundActive = false;
        this.testAudioController.stop();
      }
      break;
      case 'volumeUp': value && this.testAudioController.setVolume(value);
      break;
      case 'volumeDown': value && this.testAudioController.setVolume(value);
    }
   if(!key){ 
    this.testAudioController.start();
  }else {
    this.testAudioController.stop()
  }
  }
  @action
  clear() {
    this.isConnected && this._bluetoothController?.clear();
  }

  @action
  reset() {
    this.isConnected && this._bluetoothController?._reset();
  }
  @action
  toggleTestMode() {
    console.log('recieved!',this.deviceInTestMode)
    this.deviceInTestMode = !this.deviceInTestMode;
  }
  @action
  deleteDevice() {
    this.deleted = true;
  }
  broadcastState() {
    this.customEventGenerator.dispatchEvent('deviceStateChange', {
      data:this.getAllData()
    });
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
