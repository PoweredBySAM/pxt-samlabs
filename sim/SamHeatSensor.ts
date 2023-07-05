
namespace pxsim.HeatSensor {
  //% blockId="on_heat_sensor_value_changes" block="when heat sensor $variable value changes"
  //% variable.shadow=variables_get
  //% buttonId.defl=0
  //% sensorId.defl=0
  //% color="#3455db"
  export function onHeatSensorValueChanges(
    variable: pxsim.SamHeatSensor,
    handler: () => void
  ): void {
    variable.receiveEvent(handler);
  }

  //% blockId="get_heat_sensor_value_celsius" block="get heat %variable sensor value in Celsius"
  //% variable.shadow=variables_get
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function getSamHeatSensorValueCelsius(
    variable: pxsim.SamHeatSensor
  ): any {
    return variable.getValueCelsius();
  }
  //% blockId="get_heat_sensor_value_fahrenheit" block="get heat sensor  %variable value in Fahrenheit"
  //% variable.shadow=variables_get
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function getSamHeatSensorValueFahrenheit(
    variable: pxsim.SamHeatSensor
  ): any {
    return variable.getValueFahrenheit();
  }
  //% blockId="get_heat_sensor_color" block="get heat sensor %variable  color"
  //% variable.shadow=variables_get
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function getSamHeatSensorColor(variable: pxsim.SamHeatSensor): any {
    return variable.getHeatSensorColor();
  }
  //% blockId="set_heat_sensor_color" block="set heat sensor %variable  color to %value"
  //% variable.shadow=variables_get
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function setSamHeatSensorColor(
    variable: pxsim.SamHeatSensor,
    value: string
  ): void {
    variable.setDeviceColor(value);
  }
    /**
     * Wait until the heat sensor value changes
     * @param sensorId The ID of the heat sensor to wait for
     */
    //% blockId="wait_until_heat_sensor_value_changes" block="wait until heat sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#3455db"
    export function waitUntilHeatSensorValueChanges(variable:SamHeatSensor,handler:()=>any): void {
        variable.receiveEvent(handler);  
    }

  //% blockId="create_heat_sensor" block="Create new heat sensor"
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function createHeatSensor(): pxsim.SamHeatSensor {
    return new pxsim.SamHeatSensor();
  }
}

namespace pxsim {
  /**
   * A Heat Sensor.
   */
  //%
  export class SamHeatSensor {
    public deviceName = "sam_heat_sensor";
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
      window.console.log("HeatSensor created");
    }

    public getValueCelsius() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.celsiusValue || 0;
    }

    public getValueFahrenheit() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.fahrenheitValue || 0;
    }

    public getHeatSensorColor() {
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
