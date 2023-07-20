import { action, makeAutoObservable, observable } from "mobx";
import { CustomEventGenerator } from "src/Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";
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
  @observable aDown: boolean;
  @observable bDown: boolean;
  @observable pin0: boolean = false;
  @observable pin1: boolean = false;
  @observable pin2: boolean = false;
  @observable pin3: boolean = false;
  @observable pinGND: boolean = false;
  @observable isTemperatureChanged: boolean = false;
  @observable temperature: number;
  @observable xAccel: number;
  @observable yAccel: number;
  @observable zAccel: number;
  aLongPressTimeout: any;
  bLongPressTimeout: any;
  customEventGenerator: CustomEventGenerator;
  lsStateStore: SamDeviceManager;
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
    this._bluetoothController = controller;
    this._virtualController = virtualController;
    this.ledMatrix = this._virtualController.ledMatrix;
    this.restProps = restprops;
    this.isActive = false;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.aLongPressTimeout;
    this.bLongPressTimeout;
    this.aDown = false;
    this.bDown = false;
    this.pin0 = false;
    this.pin1 = false;
    this.pin2 = false;
    this.pin3 = false;
    this.pinGND = false;
    this.isTemperatureChanged = false;
    this.temperature = this._virtualController._temperature;
    this.xAccel = this._virtualController._xAccel;
    this.yAccel = this._virtualController._yAccel;
    this.zAccel = this._virtualController._zAccel;
    makeAutoObservable(this);
    this._virtualController.on("LEDChanged", this.onLEDChanged);
    this._virtualController.on("temperatureChanged", this.onTemperatureChanged);
    this._virtualController.on("ioPinChanged", this.onAnalogPinPressed);
    this._virtualController.on(
      "accelerometerChanged",
      this.onAccelerometerChanged
    );
    this.updateLsStateStore();
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
      default:
        return "Invalid property";
    }
  }

  @action
  onAnalogPinPressed = () => {
    const controller = this._virtualController;

    this.pin0 = controller.isPin0Pressed();
    this.pin1 = controller.isPin1Pressed();
    this.pin2 = controller.isPin2Pressed();

    this.updateLsStateStore();
  };
  @action
  onTemperatureChanged = () => {
    this.isTemperatureChanged = this._virtualController._isTemperatureChanged;
    this.temperature = this._virtualController._temperature;
    this.updateLsStateStore();
  };
  @action
  onAccelerometerChanged = () => {
    this.xAccel = this._virtualController._xAccel;
    this.yAccel = this._virtualController._yAccel;
    this.zAccel = this._virtualController._zAccel;
    this.updateLsStateStore();
  };
  @action
  onLEDChanged = () => {
    this.ledMatrix = this._virtualController.ledMatrix;
    this.updateLsStateStore();
  };

  @action
  onAButtonDown = () => {
    this.aDown = true;
    this._virtualController._characteristics.buttonB.oncharacteristicvaluechanged(
      {
        target: {
          value: {
            buffer: [1],
          },
        },
      }
    );

    this.bLongPressTimeout = setTimeout(() => {
      this._virtualController._characteristics.buttonB.oncharacteristicvaluechanged(
        {
          target: {
            value: {
              buffer: [2],
            },
          },
        }
      );
    }, 1000);
    this.updateLsStateStore();
  };
  @action
  onAButtonUp = () => {
    this.aDown = false;
    clearTimeout(this.aLongPressTimeout);
    this._virtualController._characteristics.buttonA.oncharacteristicvaluechanged(
      {
        target: {
          value: {
            buffer: [0],
          },
        },
      }
    );
    this.updateLsStateStore();
  };
  @action
  onBButtonDown = () => {
    this.bDown = true;
    this._virtualController._characteristics.buttonB.oncharacteristicvaluechanged(
      {
        target: {
          value: {
            buffer: [1],
          },
        },
      }
    );

    this.bLongPressTimeout = setTimeout(() => {
      this._virtualController._characteristics.buttonB.oncharacteristicvaluechanged(
        {
          target: {
            value: {
              buffer: [2],
            },
          },
        }
      );
    }, 1000);
    this.updateLsStateStore();
  };
  @action
  onBButtonUp = () => {
    this.bDown = false;
    clearTimeout(this.bLongPressTimeout);
    this._virtualController._characteristics.buttonB.oncharacteristicvaluechanged(
      {
        target: {
          value: {
            buffer: [0],
          },
        },
      }
    );
    this.updateLsStateStore();
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
  @action
  updateLsStateStore() {
    this.lsStateStore.updateDevice(this.getAllData());
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      ledMatrix: this.ledMatrix,
      aDown: this.aDown,
      bDown: this.bDown,
      pin0: this.pin0,
      pin1: this.pin1,
      pin2: this.pin2,
      pin3: this.pin3,
      pinGND: this.pinGND,
      temperature: this.temperature,
      xAccel: this.xAccel,
      yAccel: this.yAccel,
      zAccel: this.zAccel,
      isTemperatureChanged: this.isTemperatureChanged,
      isDeleted: this.deleted,
    };
  }
  set virtualController(controller: any) {
    this._virtualController = controller;
  }
}

export default MicrobitDevice;
