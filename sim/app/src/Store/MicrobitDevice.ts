import { action, makeAutoObservable, observable } from "mobx";
import { CustomEventGenerator } from "src/Features/CustomEventGenerator";
class MicrobitDevice {
  private _virtualController: any;
  private _bluetoothController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;

  @observable
  ledMatrix: number[][] = [
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
  customEventGenerator: CustomEventGenerator;
  constructor(deviceData: any) {
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
    this._bluetoothController = controller;
    this._virtualController = virtualController;
    this.ledMatrix = this._virtualController.ledMatrix;
    this.restProps = restprops;
    this.isActive = false;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.aPressed = false;
    this.bPressed = false;
    this.pin0 = false;
    this.pin1 = false;
    this.pin2 = false;
    this.pin3 = false;
    this.pinGND = false;
    this._virtualController.on("LEDChanged", this.onLEDChanged);
    makeAutoObservable(this);
  }

  @action
  setDeviceProp(property: string, value: any) {
    switch (property) {
      case "ledDisplayShape":
        this._virtualController.displayPattern(value);
        break;
      case "ledDisplayWord":
        this._virtualController.displayText(value);
        break;
      case "plot":
        this._virtualController.plot(value.x, value.y);
        break;
      case "unplot":
        this._virtualController.unplot(value.x, value.y);
        break;
      case "toggle":
        this._virtualController.toggle(value.x, value.y);
        break;
      case "clearLED":
        this._virtualController.clearLED();
        break;
      case "writeDigitalPin":
        this._virtualController.writeDigitalPin(value.pinId, value.value);
        break;
      case "buttonAPressed":
        value ? this.onAButtonDown() : this.onAButtonUp();
        break;
      case "buttonBPressed":
        value ? this.onBButtonDown() : this.onBButtonUp();
        break;
      default:
        return "Invalid property";
    }
  }

  @action
  onLEDChanged = () => {
    this.ledMatrix = this._virtualController.ledMatrix;
    this.broadcastState();
  };

  @action
  onBButtonDown = () => {
    this.bPressed = true;
    this.broadcastState();
  };
  @action
  onBButtonUp = () => {
    this.bPressed = false;
    this.broadcastState();
  };
  @action
  onAButtonDown = () => {
    this.aPressed = true;
    this.broadcastState();
  };
  @action
  onAButtonUp = () => {
    this.aPressed = false;
    this.broadcastState();
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
    this.broadcastState();
  }
  get virtualController() {
    return this._virtualController;
  }
  get bluetoothController() {
    return this._bluetoothController;
  }
  broadcastState() {
    this.customEventGenerator.dispatchEvent("deviceStateChange", {
      data: this.getAllData(),
    });
  }
  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      ledMatrix: this.ledMatrix,
      aPressed: this.aPressed,
      bPressed: this.bPressed,
      pin0: this.pin0,
      pin1: this.pin1,
      pin2: this.pin2,
      pin3: this.pin3,
      pinGND: this.pinGND,
      isDeleted: this.deleted,
    };
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
}

export default MicrobitDevice;
