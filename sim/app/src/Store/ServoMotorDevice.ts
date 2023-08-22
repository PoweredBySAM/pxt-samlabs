import { observable, action, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class ServoMotorDevice {
  private _virtualController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;

  @observable batteryLevel = 0;
  @observable Color: string;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable _position: number;
  @observable _adjustedPosition: number;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable testPosition: number;
  customEventGenerator: any;
  lsStateStore: SamDeviceManager;
  assignedName: string;
  createMessageType: string;

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
    this.isActive = false;
    this.blockVisibility = true;
    this._position = 0;
    this._adjustedPosition = 0;
    this.deviceInTestMode = false;
    this.testPosition = 0;
    this.deleted = false;
    this.Color = "#FFFFFF";
    this.createMessageType = "createServoMotor";
    this.assignedName = "ServoMotor";
    makeAutoObservable(this);
    this.updateLsStateStore();
  }

  @action
  setDeviceProp(property: string, value: number | string) {
    switch (property) {
      case "setPosition":
        this.setPosition(value as number);
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
  updateColor(value: string) {
    this.Color = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setServoMotorColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  setPosition(value: number) {
    this._position = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setPosition for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }
  @action
  setTestPosition(value: number) {
    this.testPosition = this.testPosition + value;
  }

  @action
  reset() {
    this._virtualController._reset();
  }

  @action
  toggleTestMode() {
    if (!this.deviceInTestMode) {
      this.testPosition = 0;
    }
    this.deviceInTestMode = !this.deviceInTestMode;
  }

  @action
  deleteDevice() {
    this.deleted = true;
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      isDeviceActive: this.isActive,
      deviceColor: this.Color,
      servoPosition: this._position,
    };
  }
  broadcastState(eventName?: string) {
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

export default ServoMotorDevice;
