namespace pxsim.LED {
  /**
   * Turn the LED with the given ID on
   * @param variable The  LED to turn on
   */
  //% blockId="turn_led_ff" block="turn LED $variable on"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% color="#4169e1"
  export function turnLEDOn(variable: SamLED): void {
    variable.turnOn("#008000");
  }
  /**
   * Turn the LED with the given ID on
   * @param variable The  LED to turn on
   */
  //% blockId="turn_led_on" block="turn LED $variable off"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% color="#4169e1"
  export function turnLEDOff(variable: SamLED): void {
    variable.turnOn("#ffffff");
  }
  /**
   * Set the color of the LED with the given ID
   * @param variable The LED to set the color for
   * @param color The new color for the LED
   */
  //% blockId="set_led_color" block="set color of LED %variable to %color"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% color.shadow="1"
  //% color="#4169e1"
  export function setLEDColor(variable: SamLED, color: samLedColors): void {
    variable.setLEDColor(color);
  }
  /**
   * Set the body color of the LED with the given ID
   * @param variable The  LED to set the Body color for
   * @param color The new color for the LED
   */
  //% blockId="set_led_body_color" block="set body color of LED %variable to %color"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% color.shadow="1"
  //% color="#4169e1"
  export function setLEDBodyColor(variable: SamLED, color: samLedColors): void {
    variable.setBodyColor(color);
  }

  /**
   * Change the brightness of the LED with the given ID
   * @param ledId The ID of the LED to change the brightness for
   * @param brightness The new brightness for the LED (0 to 100)
   */
  //% blockId="change_led_brightness" block="change brightness of LED with ID $ledId to $brightness"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% brightness.min=0 brightness.max=100
  //% color="#4169e1"
  export function changeLEDBrightness(
    variable: SamLED,
    brightness: number
  ): void {
    variable.setBrightness(brightness);
  }

  /**
   * Get the brightness of the LED with the given ID
   * @param ledId The ID of the LED to get the brightness of
   */
  //% blockId="get_led_brightness" block="get brightness of LED $variable"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% color="#4169e1"
  export function getLEDBrightness(variable: SamLED): number {
    return variable.getLEDBrightness();
  }
  /**
   * Get the brightness of the LED with the given ID
   * @param variable The LED to get the brightness of
   */
  //% blockId="get_led_color" block="get color of LED $variable"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% color="#4169e1"
  export function getLEDColor(variable: SamLED): number {
    return variable.getLEDColor();
  }

  /**
   * Check if the LED with the given ID is on
   * @param ledId The ID of the LED to check if it's on
   */
  //% blockId="is_led_on" block="is LED $variable on"
  //% variable.shadow=variables_get
  //% variable.defl="LED_1"
  //% ledId.defl=0
  //% color="#4169e1"
  export function isLEDOn(variable: SamLED): boolean {
    return variable.isLEDOn();
  }

  //% blockId="create_led" block="Create new LED"
  //% variable.defl="LED_1"
  //% color="#4169e1"
  export function createLED(): pxsim.SamLED {
    return new pxsim.SamLED();
  }
}

namespace pxsim {
  /**
   * A LED.
   */
  //%
  export class SamLED {
    public deviceName = "sam_led";
    private _id: string;

    constructor() {
      this._id = samlabs.uuidv4();
      const detail = {
        device: this.deviceName,
        event: "device_created",
        id: this._id,
      };
      this._dispatch(
        { device: this.deviceName, detail },
        samlabs.samSimEvents.TOSIM_DEVICE_CREATED
      );
    }

    public getLEDColor() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData.color;
    }
    public isLEDOn() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData.state;
    }
    public getLEDBrightness() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData.brighness;
    }

    public setBodyColor(color: samLedColors) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: this.hexColorFromCode(color),
        property: "color",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public setLEDColor(color: samLedColors) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: this.hexColorFromCode(color),
        property: "led_color",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public setBrightness(value: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value,
        property: "brightness",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public turnOn(value: string) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value,
        property: "color",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public turnOff() {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: false,
        property: "state",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    private hexColorFromCode(colorCode: number) {
      switch (+colorCode) {
        case 1:
          return "#FF0000"; // Red
        case 2:
          return "#00FF00"; // Green
        case 3:
          return "#0000FF"; // Blue
        case 4:
          return "#FFFF00"; // Yellow
        case 5:
          return "#FFA500"; // Orange
        case 6:
          return "#800080"; // Purple
        case 7:
          return "#FFFFFF"; // White
        case 8:
          return "#000000"; // Black
        default:
          return "#ffffff";
      }
    }

    get deviceId() {
      return this._id;
    }

    public receiveEvent(handler: () => any) {
      samlabs.WindowEventService.getInstance().sendEvent(
        samlabs.buildEventName(
          samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED,
          this._id
        ),
        () => handler()
      );
    }

    public _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}
