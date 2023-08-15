namespace pxsim.DCMotor {
  //% blockId="set_motor_speed" block="set %variable motor speed to %value"
  //% speed.min=0 speed.max=100
  //% variable.shadow=variables_get
  //% variable.defl="DCMotor 1"
  //% color="#32cd32"
  export function setSamMotorSpeed(
    variable: pxsim.SamDCMotor,
    value: number
  ): void {
    variable.setSpeed(value);
  }
  //% blockId="stop_motor" block="stop motor %variable "
  //% variable.shadow=variables_get
  //% variable.defl="DCMotor 1"
  //% color="#32cd32"
  export function stopMotor(variable: pxsim.SamDCMotor): void {
    variable.stopMotor();
  }
  //% blockId="set_motor_color" block="set %variable motor color to %color"
  //% variable.shadow=variables_get
  //% variable.defl="Motor 1"
  //% color.shadow="1"
  //% color="#32cd32"
  export function setSamMotorColor(
    variable: pxsim.SamDCMotor,
    value: samLedColors
  ): void {
    variable.setMotorColor(value);
  }

  // //% blockId="get_motor_speed" block="get %variable motor speed"
  // //% variable.shadow=variables_get
  // //% variable.defl="DCMotor 1"
  // export function getSamMotorSpeed(variable: pxsim.SamDCMotor): any {
  //   return variable.getSpeed();
  // }

  // //% blockId="get_motor_color" block="get %variable motor color"
  // //% variable.shadow=variables_get
  // //% variable.defl="DCMotor 1"
  // // % prop.shadow=motor_property_dropdown
  // export function getSamMotorColor(variable: pxsim.SamDCMotor): any {
  //   return 0;
  // }
  //% blockId="create_motor" block="Create new motor"
  //% variable.defl="DCMotor 1"
  export function createMotor(): pxsim.SamDCMotor {
    return new pxsim.SamDCMotor();
  }
}

namespace pxsim {
  /**
   * A DC Motor.
   */
  //%

  export class SamDCMotor {
    public deviceName = "sam_dcmotor";
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
    public getSpeed() {
      return 0;
    }
    public setSpeed(speed: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: speed,
        property: "speed",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public stopMotor() {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        property: "stop",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }

    public setMotorColor(color: samLedColors) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        property: "color",
        value: color,
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public getMotorColor() {
      return 0;
    }
    get deviceId() {
      return this._id;
    }

    _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
        varNames: pxsim.runtime.globals,
      });
    }
  }
}
