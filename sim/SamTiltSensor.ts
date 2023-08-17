namespace pxsim.TiltSensor {
  //% blockId="set_tilt_color" block="Set Tilt Sensor %variable color to $color"
  //% variable.shadow=variables_get
  //% value.shadow=1
  //% variable.defl="Tilt 1"
  //% color="#9400d3"
  export function setTiltColor(
    variable: pxsim.SamTiltSensor,
    color: samLedColors
  ): void {
    variable.setTiltColor(color);
  }

  //% blockId="is_tilt_sensor_tilted" block="Is Tilt Sensor  %variable  tilted"
  //% variable.shadow=variables_get
  //% variable.defl="Tilt 1"
  //% color="#9400d3"
  export function IsTiltTilted(variable: pxsim.SamTiltSensor): boolean {
    return variable.IsTiltTilted();
  }

  // //% blockId="tilt_sensor_not_tilted" block="Is Tilt Sensor %variable value changed"
  // //% variable.shadow=variables_get
  // //% variable.defl="Tilt 1"
  // //% color="#9400d3"
  // export function isTiltValueChanged(variable: pxsim.SamTiltSensor): boolean {
  //   return variable.isTiltValueChanged();
  // }

  //% blockId="create_tilt_sensor" block="Create new Tilt Sensor"
  //% variable.defl="Tilt 1"
  //% color="#9400d3"
  export function createTiltSensor(): pxsim.SamTiltSensor {
    return new pxsim.SamTiltSensor();
  }
}

namespace pxsim {
  /**
   * A Tilt Sensor.
   */
  //%
  export class SamTiltSensor {
    public deviceName = "sam_tilt";
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
    }

    public setTiltColor(color: samLedColors) {
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

    public IsTiltTilted() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.isTilted;
    }

    get deviceId() {
      return this._id;
    }

    public _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}
