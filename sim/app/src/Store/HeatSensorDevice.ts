import { observable, action, makeObservable, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class HeatSensorDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  lsStateStore: SamDeviceManager;

  @observable Color: string;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable isHeatSensorValueChanged: boolean;

  _ledColor: string;
  _ledBrightness: number;
  customEventGenerator: CustomEventGenerator;
  value: number;
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
    this._ledColor = "#000000";
    this._ledBrightness = 100;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = "#FFFFFF";
    this.value = 0;
    this.isHeatSensorValueChanged = false;
    this.customEventGenerator = CustomEventGenerator.getInstance();
    this.createMessageType = "createHeatSensor";
    this.assignedName = "HeatSensor";
    makeAutoObservable(this);
    this.updateLsStateStore();
    window.addEventListener("message", (event) => {
      if (event.data.type === `${this.assignedName} valueChanged`) {
        this.heatSensorValueChanged(event.data.value);
      }
    });
  }

  @action
  toggleVisibility() {
    this.blockVisibility = !this.blockVisibility;
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
  updateColor(value: string) {
    this.Color = value;
    this.updateLsStateStore();
    window.parent.postMessage(
      {
        type: `setHeatSensorColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  heatSensorValueChanged(newValue: number) {
    this.value = newValue;
    this.isHeatSensorValueChanged;
    this.updateLsStateStore();
  }
  @action
  setValue(newValue: number) {
    this.value = newValue;
  }

  @action
  getCelsiusValue() {
    return (
      this.value
    );
  }

  @action
  getFarenheitValue() {
    return (
      this.value
    );
  }



  @action
  deleteDevice() {
    this.deleted = true;
  }

  toggleTestMode() {
    this.deviceInTestMode = !this.deviceInTestMode;
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      isDeviceActive: this.isActive,
      deviceColor: this.Color,
      currentValue: this.value,
      isHeatSensorValueChanged: this.isHeatSensorValueChanged,
    };
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

export default HeatSensorDevice;
