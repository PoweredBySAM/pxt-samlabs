import { observable, action, makeObservable, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class LightSensorDevice {
  private _virtualController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;

  @observable Color: string;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable value: number;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable isLightSensorValueChanged: boolean;
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
    this.value = 0;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = "#FFFFFF";
    this.isLightSensorValueChanged = false;
    this.createMessageType = "createLightSensor";
    this.assignedName = "LightSensor";
    makeAutoObservable(this);
    this.updateLsStateStore();
    window.addEventListener("message", (event) => {
      if (event.data.type === `${this.assignedName} valueChanged`) {
        this.lightSensorValueChanged(event.data.value);
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
    if (value === this.Color) return;
    this.Color = value;
    window.parent.postMessage(
      {
        type: `setLightSensorColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  lightSensorValueChanged(newValue: number) {
    this.value = newValue;
    this.isLightSensorValueChanged = true;
    this.updateLsStateStore();
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
      currentValue: this.value,
      isLightSensorValueChanged: this.isLightSensorValueChanged,
    };
  }

  get virtualController() {
    return this._virtualController;
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
  updateLsStateStore() {
    this.lsStateStore.updateDevice(this.getAllData());
  }
}

export default LightSensorDevice;
