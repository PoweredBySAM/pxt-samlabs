import { observable, action, makeAutoObservable } from "mobx";
import AudioController from "../Utils/Tones/toneGenerator/AudioController";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";
class BuzzerDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  testAudioController: AudioController = new AudioController();
  lsStateStore: SamDeviceManager;
  assignedName: string;
  createMessageType: string;

  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color: string;
  pitch: any;
  volume: number;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable testSoundActive: boolean = false;
  customEventGenerator: any;

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
    this.pitch = virtualController?.pitch;
    this.volume = 100;
    this.isActive = false;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = "#FFFFFF";
    this.createMessageType = "createBuzzer";
    this.assignedName = "Buzzer";
    makeAutoObservable(this);
    this.updateLsStateStore();
  }

  @action
  setDeviceProp(property: string, value: number | string) {
    switch (property) {
      case "volume":
        this.setVolume(value as number);
        break;
      case "pitch":
        this.setPitch(value as number);
        break;
      case "clear":
        this.clear();
        break;
      case "color":
        this.updateColor(value as string);
        break;
      default:
        return "Invalid property";
    }
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
    window.parent.postMessage(
      {
        type: `setBuzzerColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  setPitch(value: number) {
    this.pitch = value;
    this._virtualController?._toneGenerator?.setPitch(value);
    this.updateLsStateStore();
    this.broadcastState();
    window.parent.postMessage(
      {
        type: `setBuzzerPitch for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }
  @action
  setVolume(value: number) {
    this.volume = value;
    this._virtualController?._toneGenerator?.setVolume(value);
    this.broadcastState();

    window.parent.postMessage(
      {
        type: `setBuzzerVolume for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      deviceVlume: this.volume,
      devicePitch: this.pitch,
      isDeviceActive: this.isActive,
      deviceColor: this.Color,
    };
  }

  @action
  start() {
    this.isActive = true;
    this._virtualController?._toneGenerator?.start();
    this.broadcastState();
  }
  @action
  testTone(key?: string, value?: number) {
    switch (key) {
      case "start":
        {
          this.testSoundActive = true;
          this.testAudioController.start();
          this.testAudioController.setVolume(100);
        }
        break;
      case "stop":
        {
          this.testSoundActive = false;
          this.testAudioController.stop();
        }
        break;
      case "volumeUp":
        value && this.testAudioController.setVolume(value);
        break;
      case "volumeDown":
        value && this.testAudioController.setVolume(value);
    }
    if (!key) {
      this.testAudioController.start();
    } else {
      this.testAudioController.stop();
    }
  }

  clear() {
    this._virtualController?._toneGenerator?.setVolume(0);
    this._virtualController?._toneGenerator?.setPitch(0);
    window.parent.postMessage(
      {
        type: `clearBuzzer for ${this.assignedName}`,
      },
      window.location.origin
    );
  }

  @action
  reset() {
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
  broadcastState() {
    this.customEventGenerator.dispatchEvent("deviceStateChange", {
      data: this.getAllData(),
    });
  }
  updateLsStateStore() {
    this.lsStateStore.updateDevice(this.getAllData());
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
