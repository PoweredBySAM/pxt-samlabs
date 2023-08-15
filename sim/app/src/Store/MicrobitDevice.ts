import { action, makeAutoObservable, observable } from "mobx";
import { CustomEventGenerator } from "src/Features/CustomEventGenerator";
import SamDeviceManager from "src/Features/SamSimState";
class MicrobitDevice {
  private _virtualController: any;
  private _deviceId: string;
  possibleStates: any;
  restProps: any;
  virtualInteractionComponentName: string;
  assignedName: string;
  createMessageType: string;

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
    this.assignedName = "Microbit";
    this.createMessageType = "createMicrobit";
    this._virtualController = virtualController;
    this.ledMatrix = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    this.restProps = restprops;
    this.isActive = false;
    this.blockVisibility = true;
    this.deviceInTestMode = false;
    this.deleted = false;
    this.aLongPressTimeout;
    this.bLongPressTimeout;
    this.aDown = false;
    this.bDown = false;
    this.pins = [];
    this.pin0Pressed = false;
    this.pin1Pressed = false;
    this.pin2Pressed = false;
    this.pinGND = false;
    this.isTemperatureChanged = false;
    this.temperature = this._virtualController._temperature;
    this.xAccel = 0;
    this.yAccel = 0;
    this.zAccel = 0;
    this.deviceVarNameInPxt = deviceData.deviceVarNameInPxt;
    makeAutoObservable(this);
    this._virtualController.on("LEDChanged", this.onLEDChanged);
    this.updateLsStateStore();
    window.addEventListener("message", (event) => {
      switch (event.data.type) {
        case "AButtonDown":
          return this.onAButtonDown();
        case "AButtonUp":
          return this.onAButtonUp();
        case "BButtonDown":
          return this.onBButtonDown();
        case "BButtonUp":
          return this.onBButtonUp();
        case "temperatureChanged":
          return this.onTemperatureChanged(event.data.value);
        case "accelerometerChanged":
          return this.onAccelerometerChanged(event.data.value);
      }
    });
  }

  @action
  setDeviceProp(property: string, value: any) {
    switch (property) {
      case "ledDisplayShape":
        this._virtualController.displayPattern(value);

        window.parent.postMessage(
          {
            type: `${this.assignedName} ledDisplayShape`,
            value: value,
          },
          window.location.origin
        );
        break;
      case "ledDisplayWord":
        this._virtualController.displayText(value);
        window.parent.postMessage(
          {
            type: `${this.assignedName} ledDisplayWord`,
            value: value,
          },
          window.location.origin
        );
        break;
      case "plot":
        this._virtualController.plot(value.x, value.y);
        window.parent.postMessage(
          {
            type: `${this.assignedName} plot`,
            value: { x: value.x, y: value.y },
          },
          window.location.origin
        );
        break;
      case "unplot":
        this._virtualController.unplot(value.x, value.y);
        window.parent.postMessage(
          {
            type: `${this.assignedName} unplot`,
            value: { x: value.x, y: value.y },
          },
          window.location.origin
        );
        break;
      case "toggle":
        this._virtualController.toggle(value.x, value.y);
        window.parent.postMessage(
          {
            type: `${this.assignedName} toggle`,
            value: { x: value.x, y: value.y },
          },
          window.location.origin
        );
        break;
      case "clearLED":
        this._virtualController.clearLED();
        window.parent.postMessage(
          {
            type: `${this.assignedName} clearLED`,
          },
          window.location.origin
        );
        break;
      case "writeDigitalPin":
        this._virtualController.writeDigitalPin(value.pinId, value.value);
        break;
      default:
        return "Invalid property";
    }
  }
  @action
  setAssignedPropsToDeviceStore(assignedName: string) {
    this.assignedName = assignedName;
    this.isConnected = true;
  }

  @action
  onAnalogPinPressed = () => {
    this.pins = this._virtualController._pins;
    this.updateLsStateStore();
  };
  @action
  onTemperatureChanged = (value: {
    temperature: number;
    isTemperatureChanged: boolean;
  }) => {
    this.isTemperatureChanged = value.isTemperatureChanged;
    this.temperature = value.temperature;
    this.updateLsStateStore();
  };
  @action
  onAccelerometerChanged = (value: { x: number; y: number; z: number }) => {
    this.xAccel = value.x;
    this.yAccel = value.y;
    this.zAccel = value.z;
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
