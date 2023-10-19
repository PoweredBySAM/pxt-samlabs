import { observable, action, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

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
  @observable Color: string;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;

  @observable _ledColor: string;
  @observable _ledBrightness: number;
  customEventGenerator: CustomEventGenerator;
  lsStateStore: SamDeviceManager;
  assignedName: string;
  createMessageType: string;

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
    this.isActive = false;
    this.blockVisibility = true;
    this._ledColor = "#000000";
    this._ledBrightness = 0;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = "#FFFFFF";
    this.createMessageType = "createLED";
    this.assignedName = "LED";
    makeAutoObservable(this);
    this.updateLsStateStore();
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
        type: `setLEDDeviceBodyColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  setLEDBrightness(value: number) {
    this._ledBrightness = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setLEDBrightness for ${this.assignedName}`,
        value: this._ledBrightness,
      },
      window.location.origin
    );
  }

  @action
  setLEDColor(value: string) {
    this._ledColor = value;
    this._ledBrightness = 100;
    this.isActive = this._ledColor !== "#000000";
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setLEDColor for ${this.assignedName}`,
        value: this._ledColor,
      },
      window.location.origin
    );
  }

  @action
  reset() {
    this._virtualController._reset();
  }

  @action
  getLEDBrightness() {
    return (
      this._virtualController.getLEDBrightness ||
      (this.isConnected && this._bluetoothController?.getLEDBrightness())
    );
  }
  @action
  deleteDevice() {
    this.deleted = true;
  }

  @action
  turnLEDOff() {
    this._ledColor = "#000000";
    this._ledBrightness = 0;
    window.parent.postMessage(
      {
        type: `turnLEDOff for ${this.assignedName}`,
      },
      window.location.origin
    );
  }
  @action
  setDeviceProp(property: string, value: string | number) {
    switch (property) {
      case "led_color":
        this.setLEDColor(value as string);
        break;
      case "color":
        this.updateColor(value as string);
        break;
      case "brightness":
        this.setLEDBrightness(value as number);
        break;
      case "turnOff":
        this.turnLEDOff();
        break;
      default:
        return "Invalid property";
    }
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      isDeviceActive: this.isActive,
      deviceColor: this.Color,
      ledColor: this._ledColor,
      ledBrightness: this._ledBrightness,
    };
  }
  broadcastState(eventName?: string) {
    this.customEventGenerator.dispatchEvent("deviceStateChange", {
      data: this.getAllData(),
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
  updateLsStateStore() {
    this.lsStateStore.updateDevice(this.getAllData());
  }
}

export default LEDDevice;
