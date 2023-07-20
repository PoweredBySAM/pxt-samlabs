
namespace pxsim.HeatSensor {

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


    //% blockId="get_heat_sensor_value_equal_fahrenheit" block="value of heat sensor %variable equals %number fahrenheit"
    //% variable.shadow=variables_get
    //% number.min=0 
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    export function heatSensorfahrenHeitValueIsEqualTo(
      variable: pxsim.SamHeatSensor,
      number:number
    ): any {
      return variable.getValueFahrenheit() === number;
    }
    //% blockId="get_heat_sensor_value_greater_fahrenheit" block="value of heat sensor %variable is greater than %number fahrenheit"
    //% variable.shadow=variables_get
    //% number.min=0 
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    export function heatSensorfahrenHeitValueIsGreaterThan(
      variable: pxsim.SamHeatSensor,
      number:number
    ): any {
      return variable.getValueFahrenheit() > number;
    }
    //% blockId="get_heat_sensor_value_less_fahrenheit" block="value of heat sensor %variable is less than %number fahrenheit"
    //% variable.shadow=variables_get
    //% number.min=0 
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    export function heatSensorfahrenHeitValueIsLessThan(
      variable: pxsim.SamHeatSensor,
      number:number
    ): any {
      return variable.getValueFahrenheit() < number;
    }
    //% blockId="get_heat_sensor_value_equals_celsius" block="value of heat sensor %variable equals %number celsius"
    //% variable.shadow=variables_get
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    export function heatSensorCelciusValueEquals(
      variable: pxsim.SamHeatSensor,
      number:number
    ): any {
      return variable.getValueCelsius() === number;
    }
    //% blockId="get_heat_sensor_value_greater_celsius" block="value of heat sensor %variable is greater than %number celsius"
    //% variable.shadow=variables_get
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    export function heatSensorCelciusValueIsGreaterThan(
      variable: pxsim.SamHeatSensor,
      number:number
    ): any {
      return variable.getValueCelsius() > number;
    }
    //% blockId="get_heat_sensor_value_less_celcius" block="value of heat sensor %variable is less than %number celsius"
    //% variable.shadow=variables_get
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    export function heatSensorCelciusValueIsLessThan(
      variable: pxsim.SamHeatSensor,
      number:number
    ): any {
      return variable.getValueCelsius() < number;
    }


  //% blockId="get_heat_sensor_color" block="get heat sensor %variable  color"
  //% variable.shadow=variables_get
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function getSamHeatSensorColor(variable: pxsim.SamHeatSensor): any {
    return variable.getHeatSensorColor();
  }
  //% blockId="set_heat_sensor_color" block="set heat sensor %variable  color to $value"
  //% variable.shadow=variables_get
  //% color.shadow=1
  //% variable.defl="HeatSensor1"
  //% color="#3455db"
  export function setSamHeatSensorColor(
    variable: pxsim.SamHeatSensor,
    value: samLedColors
  ): void {
    variable.setDeviceColor(value);
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
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
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
