import { observable, action, makeObservable, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class ProximitySensorDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;


  @observable Color: string;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable isProximitySensorValueChanged: boolean;

  @observable value: number;
  customEventGenerator: any;
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
    this.value = 0;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = "#FFFFFF";
    this.isProximitySensorValueChanged = false;
    this.createMessageType = "createProximitySensor";
    this.assignedName = "ProximitySensor";
    makeAutoObservable(this);
    this.updateLsStateStore();
    window.addEventListener("message", (event) => {
      if (event.data.type === `${this.assignedName} valueChanged`) {
        this.proximitySensorValueChanged(event.data.value);
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
        type: `setProximitySensorColor for ${this.assignedName}`,
        value: value,
      },
      window.location.origin
    );
  }

  @action
  proximitySensorValueChanged(newValue: number) {
    this.value = newValue;
    this.isProximitySensorValueChanged = true;
    this.updateLsStateStore();
  }


  @action
  getValue() {
    this._virtualController.getValue() || this._bluetoothController?.getValue();
  }

  @action
  setValue(value: number) {
    this.value = value;
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
      isProximitySensorValueChanged:this.isProximitySensorValueChanged,
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

export default ProximitySensorDevice;
