namespace pxsim.LED {
    /**
     * Turn the LED with the given ID on
     * @param ledId The ID of the LED to turn on
     */
    //% blockId="turn_led_on" block="turn LED $variable on"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color="#4169e1"
    export function turnLEDOn(variable:SamLED): void {
      variable.turnOn();
    }
     /**
     * Set the color of the LED with the given ID
     * @param ledId The ID of the LED to set the color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED $variable to  $color"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color.shadow="colorNumberPicker"
    //% color="#4169e1"
    export function setLEDColor(variable: SamLED, color: string): void {
      variable.setLEDColor(color);
    }
     /**
     * Set the body color of the LED with the given ID
     * @param ledId The ID of the LED to set the color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED $variable to  $color"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% color.shadow="colorNumberPicker"
    //% color="#4169e1"
    export function setLEDBodyColor(variable: SamLED, color: string): void {
      variable.setBodyColor(color);
    }
  
    /**
     * Change the brightness of the LED with the given ID
     * @param ledId The ID of the LED to change the brightness for
     * @param brightness The new brightness for the LED (0 to 100)
     */
    //% blockId="change_led_brightness" block="change brightness of LED with ID $ledId to $brightness"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% brightness.min=0 brightness.max=100
    //% color="#4169e1"
    export function changeLEDBrightness(variable:SamLED, brightness: number): void {
      variable.setBrightness(brightness);
    }
  
    /**
     * Get the brightness of the LED with the given ID
     * @param ledId The ID of the LED to get the brightness of
     */
    //% blockId="get_led_brightness" block="get brightness of LED $variable"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% color="#4169e1"
    export function getLEDBrightness(variable:SamLED): number {
      return  variable.getLEDBrightness();
    }
    /**
     * Get the brightness of the LED with the given ID
     * @param ledId The ID of the LED to get the brightness of
     */
    //% blockId="get_led_color" block="get color of LED $variable"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% color="#4169e1"
    export function getLEDColor(variable:SamLED): number {
      return  variable.getLEDColor();
    }
  

  
    /**
     * Check if the LED with the given ID is on
     * @param ledId The ID of the LED to check if it's on
     */
    //% blockId="is_led_on" block="is LED $variable on"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% ledId.defl=0
    //% color="#4169e1"
    export function isLEDOn(variable:SamLED): boolean {
      return variable.isLEDOn();
    }

    //% blockId="create_led" block="Create new LED"
    //% variable.defl="LED1"
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
        window.console.log("LED created");
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
  
      public setBodyColor(color: string) {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value: color,
          property: "color",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
      }
      public setLEDColor(color: string) {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value: color,
          property: "color",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
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
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
      }
      public turnOn() {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value:true,
          property: "state",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
      }
      public turnOff() {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value:false,
          property: "state",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
      }
  
      get deviceId() {
        return this._id;
      }
  
      public receiveEvent(handler: ()=>any) {
          samlabs.WindowEventService.getInstance().sendEvent(samlabs.buildEventName(samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED,this._id), ()=>handler());
      }
  
      public _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, {
          ...payload,
        });
      }
    }
  }