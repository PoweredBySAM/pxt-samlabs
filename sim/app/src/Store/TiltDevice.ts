import { observable, action, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class TiltDevice {
  private _virtualController: any;
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
  @observable isTilted: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  customEventGenerator: CustomEventGenerator;
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
    this.isTilted = false;
    this.Color = "#FFFFFF";
    this.deviceInTestMode = false;
    this.deleted = false;
    this.createMessageType = "createTilt";
    this.assignedName = "Tilt";
    makeAutoObservable(this);
    window.addEventListener("message", (event) => {
      if (event.data.type === `${this.assignedName} valueChanged`) {
        this.setIsTilted(event.data.value);
      }
    });
  }
  @action
  setDeviceProp(property: string, value: number | string) {
    switch (property) {
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
    this.Color = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setTiltColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  getValue() {
    this._virtualController.getValue();
  }
  @action
  setIsTilted(value: boolean) {
    this.isTilted = value;
    this.updateLsStateStore();
  }

  getIsTilted() {
    return this.isTilted;
  }
  @action
  toggleTestMode() {
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
      isTilted: this.isTilted,
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

export default TiltDevice;
