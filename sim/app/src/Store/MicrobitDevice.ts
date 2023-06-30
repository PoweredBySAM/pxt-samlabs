import { action, makeAutoObservable, observable } from "mobx";

class MicrobitDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;

  @observable
  ledArray: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  @observable isConnected = false;
  @observable isConnecting = false;
  @observable isActive: boolean;
  @observable blockVisibility: boolean;
  @observable deviceInTestMode: boolean;
  @observable deleted: boolean;
  @observable aPressed: boolean;
  @observable bPressed: boolean;
  @observable pin0: boolean = false;
  @observable pin1: boolean = false;
  @observable pin2: boolean = false;
  @observable pin3: boolean = false;
  @observable pinGND: boolean = false;
  constructor(deviceData: any) {
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
    this._bluetoothController = controller;
    this.restProps = restprops;
    this.isActive = false;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.ledArray = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    this.aPressed = false;
    this.bPressed = false;
    this.pin0 = false;
    this.pin1 = false;
    this.pin2 = false;
    this.pin3 = false;
    this.pinGND = false;
    makeAutoObservable(this);
  }
  @action
  onBButtonDown = () => {
    this.bPressed = true;
  };
  @action
  onBButtonUp = () => {
    this.bPressed = false;
  };
  @action
  onAButtonDown = () => {
    this.aPressed = true;
  };
  @action
  onAButtonUp = () => {
    this.aPressed = false;
  };
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
  get bluetoothController() {
    return this._bluetoothController;
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
}

export default MicrobitDevice;
