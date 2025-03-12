namespace pxsim.HeatSensor {
  //% blockId="get_heat_sensor_value_celsius" block="%variable temperature in Celsius"
  //% variable.shadow=variables_get
  //% variable.defl="Heat Sensor"
  //% color="#3455db"
  export function getSamHeatSensorValueCelsius(
    variable: pxsim.SamHeatSensor
  ): any {
    return variable.getValueCelsius();
  }

  //% blockId="get_heat_sensor_value_fahrenheit" block="%variable temperature in Fahrenheit"
  //% variable.shadow=variables_get
  //% variable.defl="Heat Sensor"
  //% color="#3455db"
  export function getSamHeatSensorValueFahrenheit(
    variable: pxsim.SamHeatSensor
  ): any {
    return variable.getValueFahrenheit();
  }

  //% blockId="heat_sensor_value_change" block="is %variable temperature changed"
  //% variable.shadow=variables_get
  //% variable.defl="Heat Sensor"
  //% color="#3455db"
  export function isSamHeatSensorValueChanged(
    variable: pxsim.SamHeatSensor
  ): boolean {
    return variable.isSamHeatSensorValueChanged();
  }

  //% blockId="create_heat_sensor" block="new SAM Heat Sensor"
  //% blockSetVariable="Heat Sensor"
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
    private previousValue: number;

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
      return deviceData?.currentValue || 0;
    }

    public getValueFahrenheit() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.fahrenheitValue || 0;
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

    public isSamHeatSensorValueChanged() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      if (this.previousValue === deviceData?.currentValue) {
        return false;
      } else {
        this.previousValue = deviceData?.currentValue;
        return true;
      }
    }

    public receiveEvent(handler: () => any) {
      samlabs.WindowEventService.getInstance().sendEvent(
        samlabs.buildEventName(
          samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED,
          this._id
        ),
        () => handler()
      );
    }

    public _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}
