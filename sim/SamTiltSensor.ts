namespace pxsim.TiltSensor {
    //% blockId="on_tilt_sensor_tilted" block="when tilt sensor %variable is tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function onTiltSensorTilted(
      variable: pxsim.SamTiltSensor,
      handler: () => void
    ): void {
      variable.onTilt(handler);
    }
  
    //% blockId="wait_until_tilt_sensor_tilted" block="wait until tilt sensor %variable is tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function waitUntilTiltSensorTilted(
      variable: pxsim.SamTiltSensor,
      handler: () => void
    ): void {
      variable.waitUntilTilt(handler);
    }
  
    //% blockId="set_tilt_sensor_border_color" block="set tilt sensor %variable border color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function setTiltSensorBorderColor(
      variable: pxsim.SamTiltSensor,
      value: string
    ): void {
      variable.setBorderColor(value);
    }
  
    //% blockId="is_tilt_sensor_tilted" block="is tilt sensor %variable tilted?"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function isTiltSensorTilted(variable: pxsim.SamTiltSensor): boolean {
      return variable.isTilted();
    }
  
    //% blockId="create_tilt_sensor" block="Create new tilt sensor"
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function createTiltSensor(): pxsim.SamTiltSensor {
      return new pxsim.SamTiltSensor();
    }
  }
  
  namespace pxsim {
    /**
     * A Tilt Sensor.
     */
    //%
    export class SamTiltSensor {
      public deviceName = "sam_tilt_sensor";
      private _id: string;
      private _isTilted: boolean;
  
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
        window.console.log("TiltSensor created");
      }
  
      public isTilted(): boolean {
        return this._isTilted;
      }
  
      public setBorderColor(color: string) {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value: color,
          property: "borderColor",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
      }
  
      public onTilt(handler: () => any) {
        samlabs.WindowEventService.getInstance().sendEvent(
          samlabs.buildEventName(samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED, this._id),
          () => handler()
        );
      }
  
      public waitUntilTilt(handler: () => any) {
        // Implementation here. This might involve a polling mechanism or an event listener.
      }
  
      get deviceId() {
        return this._id;
      }
  
      public _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, {
          ...payload,
        });
      }
    }
  }
  