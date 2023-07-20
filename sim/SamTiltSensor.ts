namespace pxsim.TiltSensor {

    //% blockId="set_tilt_sensor_border_color" block="set tilt sensor %variable color to $value"
    //% variable.shadow=variables_get
    //% value.shadow=1
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function setTiltSensorBorderColor(
      variable: pxsim.SamTiltSensor,
      value: samLedColors
    ): void {
      variable.setBorderColor(value);
    }
  
    //% blockId="is_tilt_sensor_tilted" block=" tilt sensor %variable is tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function isTiltSensorTilted(variable: pxsim.SamTiltSensor): boolean {
      return variable.isTilted();
    }
    //% blockId="tilt_sensor_not_tilted" block=" tilt sensor %variable is not tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    export function tiltSensorNotTilted(variable: pxsim.SamTiltSensor): boolean {
      return !variable.isTilted();
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
      }
  
      public isTilted(): boolean {
        return this._isTilted;
      }
  
      public setBorderColor(color: samLedColors) {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value: color,
          property: "color",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`        
        );
      }

  
      public getIsTilted(){
        return samlabs.SamSimDataService.getInstance().getDeviceProps(this._id)?.deviceState==='tilted';
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
  