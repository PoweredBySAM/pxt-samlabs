import { observable, action, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class ButtonDevice {
  private _virtualController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  assignedName: string;
  createMessageType: string;

  @observable currentState = "";
  @observable isConnected = false;
  @observable isConnecting = false;
  @observable batteryLevel = 0;
  @observable Color = "";
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
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
    this.possibleStates = meta?.possibleStates;
    this.virtualInteractionComponentName = virtualInteractionComponentName;
    this._virtualController = virtualController;
    this.restProps = restprops;
    this.currentState = meta?.defaultState;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = meta?.hue;
    this.createMessageType = "createButton";
    this.assignedName = "Button";
    makeAutoObservable(this);
    this.updateLsStateStore();
    window.addEventListener("message", (event) => {
      switch (event.data.type) {
        case `${this.assignedName} buttonPressed`:
          return this.updateState("pressed");
        case `${this.assignedName} buttonReleased`:
          return this.updateState("released");
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
  updateState(newState: string) {
    if (this.possibleStates.includes(newState)) {
      this.currentState = newState;
      this.updateLsStateStore();
    }
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
        type: `setButtonColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }
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

  get virtualController() {
    return this._virtualController;
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      deviceState: this.currentState,
      deviceColor: this.Color,
      isDeleted: this.deleted,
    };
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }

  updateLsStateStore() {
    this.lsStateStore.updateDevice(this.getAllData());
  }
}

export default ButtonDevice;
