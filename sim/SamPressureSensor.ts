namespace pxsim.PressureSensor {

    //% blockId="get_pressure_sensor_value" block="get pressure %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    export function getSamPressureSensorValue(
      variable: pxsim.SamPressureSensor
    ): any {
      return variable.getValue();
    }

    //% blockId="get_pressure_sensor_value_equals" block="value of pressure sensor %variable is equal to %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    export function pressureSensorValueIsEqualTo(
      variable: pxsim.SamPressureSensor,
      number: number
    ): any {
      return variable.getValue()===number;
    }
    //% blockId="get_pressure_sensor_value_less" block="value of pressure sensor %variable is less than %number"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% number.min=0 number.max=100
    //% color=""#00aa00""
    export function pressureSensorValueIsLessThan(
      variable: pxsim.SamPressureSensor,
      number: number
    ): any {
      return variable.getValue() < number;
    }
    //% blockId="get_pressure_sensor_value_greater" block="value of pressure sensor %variable is greater than %number"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% number.min=0 number.max=100
    //% color=""#00aa00""
    export function pressureSensorValueIsGreaterThan(
      variable: pxsim.SamPressureSensor,
      number: number
    ): any {
      return variable.getValue() > number;
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
      value: samLedColors
    ): void {
      variable.setDeviceColor(value);
    }
  
    //% blockId="create_pressure_sensor" block="Create new pressure sensor"
    //% variable.shadow=variables_get
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
  
      public setDeviceColor(color: samLedColors) {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value: samlabs.hexColorFromCode(color),
          property: "color",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
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
  