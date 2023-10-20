import { observable, action, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class DCMotorDevice {
  _virtualController: any;
  _deviceId: string;
  restProps: any;
  virtualInteractionComponentName: string;
  lsStateStore: SamDeviceManager;

  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color: string;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable testModeSpeed: number;
  @observable speed: number;
  _adjustedSpeed: number;
  customEventGenerator: CustomEventGenerator;
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
    this.speed = 0;
    this.Color = "#FFFFFF";
    this._adjustedSpeed = 0;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.testModeSpeed = 0;
    this.createMessageType = "createDCMotor";
    this.assignedName = "DC Motor";
    makeAutoObservable(this);
    this.updateLsStateStore();
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
    if (value === this.Color) return;
    this._virtualController.setColor(value);
    this.Color = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setDCMotorColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  setSpeed(value: number) {
    this.speed = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setDCMotorSpeed for ${this.assignedName}`,
        value: this.speed,
      },
      window.location.origin
    );
  }
  @action
  stopMotor() {
    this.speed = 0;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `stopDCMotorSpeed for ${this.assignedName}`,
      },
      window.location.origin
    );
  }

  @action
  setDeviceProp(property: string, value: number | string) {
    switch (property) {
      case "speed":
        this.setSpeed(value as number);
        break;
      case "color":
        this.updateColor(value as string);
        break;
      case "stop":
        this.stopMotor();
        break;
      default:
        return "Invalid property";
    }
  }

  @action
  getspeed() {
    return this._virtualController.getSpeed || 0;
  }

  @action
  getTestspeed() {
    return this.testModeSpeed;
  }

  @action
  reset() {
    this._virtualController._reset();
  }
  @action
  toggleTestMode() {
    if (!this.deviceInTestMode) {
      this.testModeSpeed = 0;
    }
    this.deviceInTestMode = !this.deviceInTestMode;
  }
  @action
  deleteDevice() {
    this.deleted = true;
  }

  @action
  setTestModeSpeed(value: number) {
    this.testModeSpeed = value;
  }

  get virtualController() {
    return this._virtualController;
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      isDeviceActive: this.isActive,
      deviceColor: this.Color,
      deviceSpeed: this.speed,
    };
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
  updateLsStateStore(data?: any) {
    this.lsStateStore.updateDevice(this.getAllData());
  }
}

export default DCMotorDevice;
