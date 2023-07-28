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
  @observable pins: [] = [];
  @observable pin0Pressed: boolean = false;
  @observable pin1Pressed: boolean = false;
  @observable pin2Pressed: boolean = false;
  @observable pin3Pressed: boolean = false;
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
  deviceVarNameInPxt: any;
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
    this.pins = this._bluetoothController._pins;
    this.pin0Pressed = false;
    this.pin1Pressed = false;
    this.pin2Pressed = false;
    this.pinGND = false;
    this.isTemperatureChanged = false;
    this.temperature = this._virtualController._temperature;
    this.xAccel = this._bluetoothController._xAccel;
    this.yAccel = this._bluetoothController._yAccel;
    this.zAccel = this._bluetoothController._zAccel;
    this.deviceVarNameInPxt = deviceData.deviceVarNameInPxt;
    makeAutoObservable(this);
    this._virtualController.on("LEDChanged", this.onLEDChanged);
    this._bluetoothController.on("APressed", this.onAButtonDown);
    this._bluetoothController.on("AReleased", this.onAButtonUp);
    this._bluetoothController.on("BPressed", this.onBButtonDown);
    this._bluetoothController.on("BReleased", this.onBButtonUp);
    this._bluetoothController.on(
      "temperatureChanged",
      this.onTemperatureChanged
    );
    this._bluetoothController.on(
      "accelerometerChanged",
      this.onAccelerometerChanged
    );
    this.updateLsStateStore();
  }
  @action
  setBluetoothController(controller: any) {
    this._bluetoothController = controller;
    this.isConnected = true;
    this.hydrateBTController();
  }

  @action
  disconnectBluetoothController() {
    this._bluetoothController = null;
    this.isConnected = false;
  }

  @action
  setDeviceProp(property: string, value: any) {
    switch (property) {
      case "ledDisplayShape":
        this._virtualController.displayPattern(value);
        if (this._bluetoothController._connected) {
          this._bluetoothController.displayPattern(value);
        }

        break;
      case "ledDisplayWord":
        this._bluetoothController.displayText(value);
        this._virtualController.displayText(value);
        break;
      case "plot":
        this._bluetoothController.plot(value.x, value.y);
        this._virtualController.plot(value.x, value.y);
        break;
      case "unplot":
        this._bluetoothController.unplot(value.x, value.y);
        this._virtualController.unplot(value.x, value.y);
        break;
      case "toggle":
        this._bluetoothController.toggle(value.x, value.y);
        this._virtualController.toggle(value.x, value.y);
        break;
      case "clearLED":
        this._bluetoothController.clearLED();
        this._virtualController.clearLED();
        break;
      case "writeDigitalPin":
        this._bluetoothController.writeDigitalPin(value.pinId, value.value);
        this._virtualController.writeDigitalPin(value.pinId, value.value);
        break;
      default:
        return "Invalid property";
    }
  }

  @action
  onAnalogPinPressed = () => {
    this.pins = this._virtualController._pins;
    this.updateLsStateStore();
  };
  @action
  onTemperatureChanged = () => {
    this.isTemperatureChanged = this._bluetoothController._isTemperatureChanged;
    this.temperature = this._bluetoothController._temperature;
    this.updateLsStateStore();
  };
  @action
  onAccelerometerChanged = () => {
    this.xAccel = this._bluetoothController._xAccel;
    this.yAccel = this._bluetoothController._yAccel;
    this.zAccel = this._bluetoothController._zAccel;
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
  hydrateBTController() {
    if (!this._bluetoothController) return;
    this._bluetoothController.on("APressed", this.onAButtonDown);
    this._bluetoothController.on("AReleased", this.onAButtonUp);
    this._bluetoothController.on("BPressed", this.onBButtonDown);
    this._bluetoothController.on("BReleased", this.onBButtonUp);
    this._bluetoothController.on(
      "temperatureChanged",
      this.onTemperatureChanged
    );
    this._bluetoothController.on(
      "accelerometerChanged",
      this.onAccelerometerChanged
    );
  }

  getAllData() {
    return {
      deviceId: this._deviceId,
      deviceType: this.virtualInteractionComponentName,
      ledMatrix: this.ledMatrix,
      aDown: this.aDown,
      bDown: this.bDown,
      pins: this.pins,
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
