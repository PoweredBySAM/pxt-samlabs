import { observable, action, makeAutoObservable } from "mobx";
import AudioController from "../Utils/Tones/toneGenerator/AudioController";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";
class BuzzerDevice {
  private _virtualController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  lsStateStore: SamDeviceManager;
  assignedName: string;
  createMessageType: string;

  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color: string;
  @observable pitch: number;
  @observable volume: number;
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
    this.pitch = 20;
    this.volume = 70;
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
  updateColor(value: string) {
    if (value === this.Color) return;
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
    this.isActive = value > 0;
    if (value === 0) {
      this._virtualController?._toneGenerator?.stop();
    } else {
      this._virtualController?._toneGenerator?.start();
    }

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
      deviceVolume: this.volume,
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

  clear() {
    this._virtualController?._toneGenerator?.setVolume(0);
    this._virtualController?._toneGenerator?.setPitch(0);
    this.isActive = false;
    window.parent.postMessage(
      {
        type: `clearBuzzer for ${this.assignedName}`,
      },
      window.location.origin
    );
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
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
}

export default BuzzerDevice;
