namespace pxsim.ProximitySensor {
    //% blockId="on_proximity_sensor_value_changes" block="when proximity sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#1e90ff"
    export function onProximitySensorValueChanges(
      variable: pxsim.SamProximitySensor,
      handler: () => void
    ): void {
      variable.receiveEvent(handler);
    }
  
    //% blockId="get_proximity_sensor_value" block="get proximity %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    export function getSamProximitySensorValue(
      variable: pxsim.SamProximitySensor
    ): any {
      return variable.getValue();
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
    //% color="#1e90ff"
    export function setSamProximitySensorColor(
      variable: pxsim.SamProximitySensor,
      value: string
    ): void {
      variable.setDeviceColor(value);
    }
  
    /**
     * Wait until the proximity sensor value changes
     * @param sensorId The ID of the proximity sensor to wait for
     */
    //% blockId="wait_until_proximity_sensor_value_changes" block="wait until proximity sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#1e90ff"
    export function waitUntilProximitySensorValueChanges(variable:SamProximitySensor,handler:()=>any): void {
      variable.receiveEvent(handler);  
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
  