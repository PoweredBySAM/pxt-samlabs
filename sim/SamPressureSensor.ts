namespace pxsim.PressureSensor {
    //% blockId="on_pressure_sensor_value_changes" block="when pressure sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#00aa00"
    export function onPressureSensorValueChanges(
      variable: pxsim.SamPressureSensor,
      handler: () => void
    ): void {
      variable.receiveEvent(handler);
    }
  
    //% blockId="get_pressure_sensor_value" block="get pressure %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    export function getSamPressureSensorValue(
      variable: pxsim.SamPressureSensor
    ): any {
      return variable.getValue();
    }
  
    //% blockId="get_pressure_sensor_color" block="get pressure sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    export function getSamPressureSensorColor(variable: pxsim.SamPressureSensor): any {
      return variable.getSensorColor();
    }
  
    //% blockId="set_pressure_sensor_color" block="set pressure sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    export function setSamPressureSensorColor(
      variable: pxsim.SamPressureSensor,
      value: string
    ): void {
      variable.setDeviceColor(value);
    }
  
    /**
     * Wait until the pressure sensor value changes
     * @param sensorId The ID of the pressure sensor to wait for
     */
    //% blockId="wait_until_pressure_sensor_value_changes" block="wait until pressure sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#00aa00"
    export function waitUntilPressureSensorValueChanges(variable:SamPressureSensor,handler:()=>any): void {
      variable.receiveEvent(handler);  
    }
  
    //% blockId="create_pressure_sensor" block="Create new pressure sensor"
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    export function createPressureSensor(): pxsim.SamPressureSensor {
      return new pxsim.SamPressureSensor();
    }
  }
  
  namespace pxsim {
    /**
     * A Pressure Sensor.
     */
    //%
    export class SamPressureSensor {
      public deviceName = "sam_pressure_sensor";
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
        window.console.log("PressureSensor created");
      }
  
      public getValue() {
        const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
          this._id
        );
        return deviceData?.value || 0;
      }
  
      public getSensorColor() {
          const deviceData =
          samlabs.SamSimDataService.getInstance().getDeviceProps(this._id);
        return deviceData.color;
      }
  
      public setDeviceColor(color: string) {
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
  
      get deviceId() {
        return this._id;
      }
  
      public getDeviceColor() {
        const deviceData =
          samlabs.SamSimDataService.getInstance().getDeviceProps(this._id);
        return deviceData.color;
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
  