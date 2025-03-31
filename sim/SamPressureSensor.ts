namespace pxsim.PressureSensor {
  //% blockId="get_pressure_sensor_value" block="%variable sensor value"
  //% variable.shadow=variables_get
  //% variable.defl="Pressure Sensor"
  //% color="#00aa00"
  export function getSamPressureSensorValue(
    variable: pxsim.SamPressureSensor
  ): any {
    return variable.getValue();
  }

  //% blockId="pressure_sensor_value_change" block="is %variable value changed"
  //% variable.shadow=variables_get
  //% variable.defl="Pressure Sensor"
  //% color="#00aa00"
  export function isSamPressureSensorValueChanged(
    variable: pxsim.SamPressureSensor
  ): boolean {
    return variable.isSamPressureSensorValueChanged();
  }

  //% blockId="set_pressure_sensor_color" block="set %variable color to %value"
  //% variable.shadow=variables_get
  //% variable.defl="Pressure Sensor"
  //% color="#00aa00"
  export function setSamPressureSensorColor(
    variable: pxsim.SamPressureSensor,
    value: samLedColors
  ): void {
    variable.setDeviceColor(value);
  }

  //% blockId="create_pressure_sensor" block="new SAM Pressure Sensor"
  //% blockSetVariable="Pressure Sensor"
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
    }

    public getValue() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.currentValue || 0;
    }

    public isSamPressureSensorValueChanged() {
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
