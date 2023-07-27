namespace pxsim.ProximitySensor {
  
  
    //% blockId="get_proximity_sensor_value" block="get proximity sensor %variable value"
    //% variable.shadow=variables_get
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    export function getSamProximitySensorValue(
      variable: pxsim.SamProximitySensor
    ): any {
      return variable.getValue();
    }
    //% blockId="get_proximity_sensor_value_equals" block="proximity sensor %variable value equals %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    export function sensorValueEquals(
      variable: pxsim.SamProximitySensor,
      number: number
    ): any {
      return variable.getValue()===number;
    }
    //% blockId="get_proximity_sensor_value_less" block="proximity sensor %variable value is less than %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    export function sensorValueLessThan(
      variable: pxsim.SamProximitySensor,
      number: number
    ): any {
      return variable.getValue() < number;
    }
    //% blockId="get_proximity_sensor_value_more" block="proximity sensor %variable value is greater than %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    export function sensorValueMoreThan(
      variable: pxsim.SamProximitySensor,
      number: number
    ): any {
      return variable.getValue() > number;
    }
  
    //% blockId="get_proximity_sensor_color" block="get proximity sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    export function getSamProximitySensorColor(variable: pxsim.SamProximitySensor): any {
      return variable.getSensorColor();
    }
  
    //% blockId="set_proximity_sensor_color" block="set proximity sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% value.shadow="1"
    //% color="#1e90ff"
    export function setSamProximitySensorColor(
      variable: pxsim.SamProximitySensor,
      value: samLedColors
    ): void {
      variable.setDeviceColor(value);
    }
  
  
    //% blockId="create_proximity_sensor" block="Create new proximity sensor"
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    export function createProximitySensor(): pxsim.SamProximitySensor {
      return new pxsim.SamProximitySensor();
    }
  }
  
  namespace pxsim {
    /**
     * A Proximity Sensor.
     */
    //%
    export class SamProximitySensor {
      public deviceName = "sam_proximity_sensor";
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
        window.console.log("ProximitySensor created");
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
          `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`        );
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
  