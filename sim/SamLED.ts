namespace pxsim.RGB_LED {
  /**
   * Turn the LED with the given ID off
   * @param variable The  LED to turn on
   */
  //% blockId="turn_led_off" block="turn off $variable"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
  //% color="#4169e1"
  export function turnLEDOff(variable: SamLED): void {
    variable.turnOff();
  }

  /**
   * Set the color of the LED with the given ID
   * @param variable The LED to set the color for
   * @param color The new color for the LED
   */
  //% blockId="set_led_color" block="set %variable LED color to %color"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
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
  //% blockId="set_led_body_color" block="set %variable body color to %color"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
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
  //% blockId="change_led_brightness" block="set %variable brightness to $brightness"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
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
  //% blockId="get_led_brightness" block="$variable brightness"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
  //% color="#4169e1"
  export function getLEDBrightness(variable: SamLED): number {
    return variable.getLEDBrightness();
  }

  /**
   * Get the color of the LED with the given ID
   * @param variable The LED to get the brightness of
   */
  //% blockId="get_led_color" block="$variable color"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
  //% color="#4169e1"
  export function getLEDColor(variable: SamLED): number {
    return variable.getLEDColor();
  }

  /**
   * Check if the LED with the given ID is on
   * @param ledId The ID of the LED to check if it's on
   */
  //% blockId="is_led_on" block="is $variable on"
  //% variable.shadow=variables_get
  //% variable.defl="RGB LED"
  //% ledId.defl=0
  //% color="#4169e1"
  export function isLEDOn(variable: SamLED): boolean {
    return variable.isLEDOn();
  }

  //% blockId="create_led" block="new SAM RGB Light"
  //% blockSetVariable="RGB LED"
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
    private _ledColor: string = "#000000";
    private _ledBrightness: number = 100;

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
      return deviceData.ledColor;
    }
    public isLEDOn() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData.isDeviceActive;
    }
    public getLEDBrightness() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData.ledBrightness;
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
      if (this._ledColor === this.hexColorFromCode(color)) return;
      this._ledColor = this.hexColorFromCode(color);
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
      if (this._ledBrightness === value) return;
      this._ledBrightness = value;
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
    public turnOff() {
      if (this._ledColor === "#000000") return;
      this._ledColor = "#000000";
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: "#000000",
        property: "turnOff",
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
