import { observable, action, makeAutoObservable } from "mobx";
import { CustomEventGenerator } from "../Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";

class GoogleSheetDevice {
  private _virtualController: any;
  private bluetoothController: any;
  private _deviceId: string;
  restProps: any;
  virtualInteractionComponentName: string;

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

    this.virtualInteractionComponentName = virtualInteractionComponentName;
    this._virtualController = virtualController;
    this.bluetoothController = controller;
    this.restProps = restprops;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.Color = meta?.hue;
    makeAutoObservable(this);
    this.updateLsStateStore();
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

export default GoogleSheetDevice;
