namespace pxsim.TiltSensor {
  //% blockId="set_tilt_color" block="set %variable color to $color"
  //% variable.shadow=variables_get
  //% value.shadow=1
  //% variable.defl="Tilt Sensor"
  //% color="#9400d3"
  export function setTiltColor(
    variable: pxsim.SamTiltSensor,
    color: samLedColors
  ): void {
    variable.setTiltColor(color);
  }

  //% blockId="is_tilt_sensor_tilted" block="is %variable tilted"
  //% variable.shadow=variables_get
  //% variable.defl="Tilt Sensor"
  //% color="#9400d3"
  export function IsTiltTilted(variable: pxsim.SamTiltSensor): boolean {
    return variable.IsTiltTilted();
  }

  //% blockId="tilt_sensor_not_tilted" block="is %variable value changed"
  //% variable.shadow=variables_get
  //% variable.defl="Tilt Sensor"
  //% color="#9400d3"
  export function IsTiltValueChanged(variable: pxsim.SamTiltSensor): boolean {
    return variable.IsTiltValueChanged();
  }

  //% blockId="create_tilt_sensor" block="new SAM Tilt Sensor"
  //% blockSetVariable="Tilt Sensor"
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
    private previousValue: boolean;

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
    public IsTiltValueChanged() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      if (this.previousValue === deviceData?.isTilted) {
        return false;
      } else {
        this.previousValue = deviceData?.isTilted;
        return true;
      }
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
