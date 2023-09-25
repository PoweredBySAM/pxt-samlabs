namespace pxsim.ServoMotor {
  //% blockId="set_servo_motor_position" block="Set servo motor %variable position to %value degrees"
  //% value.min=0 value.max=180
  //% variable.shadow=variables_get
  //% variable.defl="Servo_Motor_1"
  //% color="#ff69b4"
  export function setServoMotorPosition(
    variable: pxsim.SamServoMotor,
    value: number
  ): void {
    variable.setPosition(value);
  }

  //% blockId="get_servo_motor_position" block="Get servo motor %variable position"
  //% variable.shadow=variables_get
  //% variable.defl="Servo_Motor_1"
  //% color="#ff69b4"
  export function getServoMotorPosition(variable: pxsim.SamServoMotor): number {
    return variable.getPosition();
  }

  //% blockId="set_servo_motor_color" block="Set servo motor %variable color to %value"
  //% variable.shadow=variables_get
  //% variable.defl="Servo_Motor_1"
  //% color="#ff69b4"
  export function setServoMotorColor(
    variable: pxsim.SamServoMotor,
    value: samLedColors
  ): void {
    variable.setDeviceColor(value);
  }

  //% blockId="create_servo_motor" block="Create new servo motor"
  //% variable.defl="Servo_Motor_1"
  //% color="#ff69b4"
  export function createServoMotor(): pxsim.SamServoMotor {
    return new pxsim.SamServoMotor();
  }
}

namespace pxsim {
  /**
   * A ServoMotor.
   */
  //%
  export class SamServoMotor {
    public deviceName = "sam_servo_motor";
    private _id: string;
    private _position: number;

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
      this._position = 2;
    }

    public setPosition(value: number) {
      this._position = value;
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: this._position,
        property: "setPosition",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }

    public getPosition() {
      return this._position;
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

    public _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}
