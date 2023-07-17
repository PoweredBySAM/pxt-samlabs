namespace pxsim.LightSensor {
  
    //% blockId="get_light_sensor_value" block="value of light sensor %variable"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function getSamLightSensorValue(
      variable: pxsim.SamLightSensor
    ): any {
      return variable.getValue();
    }
    //% blockId="get_light_sensor_value_equals" block="value of light sensor %variable is equal to %number"
    //% variable.shadow=variables_get
     //% number.min=0 number.max=100
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function lightSensorValueIsEqualTo(
      variable: pxsim.SamLightSensor,
      number: number
    ): any {
      return variable.getValue()===number;
    }
    //% blockId="get_light_sensor_value_less" block="value of light sensor %variable is less than %number"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
     //% number.min=0 number.max=100
    //% color="#FF5733"
    export function lightSensorValueIsLessThan(
      variable: pxsim.SamLightSensor,
      number: number
    ): any {
      return variable.getValue() < number;
    }
    //% blockId="get_light_sensor_value_greater" block="value of light sensor %variable is greater than %number"
    //% variable.shadow=variables_get
     //% number.min=0 number.max=100
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function lightSensorValueIsGreaterThan(
      variable: pxsim.SamLightSensor,
      number:number
    ): any {
      return variable.getValue() > number;
    }
  
    //% blockId="get_light_sensor_color" block="get color of light sensor %variable"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function getSamLightSensorColor(variable: pxsim.SamLightSensor): any {
      return variable.getSensorColor();
    }
  
    //% blockId="set_light_sensor_color" block="set color of light sensor %variable to %value"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function setSamLightSensorColor(
      variable: pxsim.SamLightSensor,
      value: string
    ): void {
      variable.setDeviceColor(value);
    }
  
    //% blockId="create_light_sensor" block="Create new light sensor"
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function createLightSensor(): pxsim.SamLightSensor {
      return new pxsim.SamLightSensor();
    }
  }
  
  namespace pxsim {
    /**
     * A Light Sensor.
     */
    //%
    export class SamLightSensor {
      public deviceName = "sam_light_sensor";
      private _id: string;
      private previousValue:number
  
      constructor() {
        this._id = samlabs.uuidv4();
        this.previousValue = 0;
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
  
      public getValue() {
        const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
          this._id
        );
        return deviceData?.currentValue || 0;
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
  