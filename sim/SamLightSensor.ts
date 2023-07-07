namespace pxsim.LightSensor {
    //% blockId="on_light_sensor_value_changes" block="when light sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#FF5733"
    export function onLightSensorValueChanges(
      variable: pxsim.SamLightSensor,
      handler: () => void
    ): void {
      variable.receiveEvent(handler);
    }
  
    //% blockId="get_light_sensor_value" block="get light %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function getSamLightSensorValue(
      variable: pxsim.SamLightSensor
    ): any {
      return variable.getValue();
    }
  
    //% blockId="get_light_sensor_color" block="get light sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function getSamLightSensorColor(variable: pxsim.SamLightSensor): any {
      return variable.getSensorColor();
    }
  
    //% blockId="set_light_sensor_color" block="set light sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    export function setSamLightSensorColor(
      variable: pxsim.SamLightSensor,
      value: string
    ): void {
      variable.setDeviceColor(value);
    }
  
    /**
     * Wait until the light sensor value changes
     * @param sensorId The ID of the light sensor to wait for
     */
    //% blockId="wait_until_light_sensor_value_changes" block="wait until light sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#FF5733"
    export function waitUntilLightSensorValueChanges(variable:SamLightSensor,handler:()=>any): void {
      variable.receiveEvent(handler);  
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
        window.console.log("LightSensor created");
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
  