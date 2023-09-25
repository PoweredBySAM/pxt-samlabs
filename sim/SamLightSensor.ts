namespace pxsim.LightSensor {
  //% blockId="get_light_sensor_value" block="get %variable value "
  //% variable.shadow=variables_get
  //% variable.defl="Light_Sensor_1"
  //% color="#FF5733"
  export function getSamLightSensorValue(
    variable: pxsim.SamLightSensor
  ): number {
    return variable.getValue();
  }

  //% blockId="get_light_sensor_color" block="is %variable value changed"
  //% variable.shadow=variables_get
  //% variable.defl="Light_Sensor_1"
  //% color="#FF5733"
  export function isSamLightSensorValueChanged(
    variable: pxsim.SamLightSensor
  ): boolean {
    return variable.isSamLightSensorValueChanged();
  }

  //% blockId="set_light_sensor_color" block="set color of light sensor %variable to $value"
  //% variable.shadow=variables_get
  //% variable.defl="Light_Sensor_1"
  //% color.shadow="1"
  //% color="#FF5733"
  export function setSamLightSensorColor(
    variable: pxsim.SamLightSensor,
    value: samLedColors
  ): void {
    variable.setDeviceColor(value);
  }
  /**
   * Set the body color of the Light Sensor with the given ID
   * @param variable The  LED to set the Body color for
   * @param color The new color for the LED
   */

  //% blockId="create_light_sensor" block="Create new light sensor"
  //% variable.defl="Light_Sensor_1"
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
    private previousValue: number;

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

    public isSamLightSensorValueChanged() {
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

    public _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}
