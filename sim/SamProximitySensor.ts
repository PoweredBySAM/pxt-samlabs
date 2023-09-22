namespace pxsim.ProximitySensor {
  //% blockId="get_proximity_sensor_value" block="get proximity sensor %variable value"
  //% variable.shadow=variables_get
  //% variable.defl="Proximity_Sensor_1"
  //% color="#1e90ff"
  export function getSamProximitySensorValue(
    variable: pxsim.SamProximitySensor
  ): any {
    return variable.getValue();
  }

  //% blockId="proximity_sensor_value_change" block="is %variable value changed"
  //% variable.shadow=variables_get
  //% variable.defl="Proximity_Sensor_1"
  //% color="#1e90ff"
  export function isSamProximitySensorValueChanged(
    variable: pxsim.SamProximitySensor
  ): boolean {
    return variable.isSamProximitySensorValueChanged();
  }

  //% blockId="set_proximity_sensor_color" block="set proximity sensor %variable  color to %value"
  //% variable.shadow=variables_get
  //% variable.defl="Proximity_Sensor_1"
  //% value.shadow="1"
  //% color="#1e90ff"
  export function setSamProximitySensorColor(
    variable: pxsim.SamProximitySensor,
    value: samLedColors
  ): void {
    variable.setDeviceColor(value);
  }

  //% blockId="create_proximity_sensor" block="Create new proximity sensor"
  //% variable.defl="Proximity_Sensor_1"
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
      window.console.log("ProximitySensor created");
    }

    public getValue() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.currentValue || 0;
    }

    public isSamProximitySensorValueChanged() {
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
