namespace pxsim.DCMotor{

//% blockId="set_motor_speed" block="set %variable motor speed to %value"
//% speed.min=0 speed.max=100
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
//% color="#32cd32"
export function setSamMotorSpeed(variable: pxsim.SamDCMotor, value: number): void {
    variable.setSpeed(value); 
}
//% blockId="set_motor_color" block="set %variable motor color to %value"
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
//% color="#32cd32"
export function setSamMotorColor(variable: pxsim.SamDCMotor, value: string): void {
    variable.setMotorColor(value); 
}

//% blockId="get_motor_speed" block="get %variable motor speed"
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
export function getSamMotorSpeed(variable: pxsim.SamDCMotor): any {
    return variable.getMotorSpeed(variable);
}

//% blockId="get_motor_color" block="get %variable motor color"
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
// % prop.shadow=motor_property_dropdown
export function getSamMotorColor(variable: pxsim.SamDCMotor): any {
    return variable.getMotorColor(variable);
}
//% blockId="create_motor" block="Create new motor"
//% variable.defl="Motor 1"
export function createMotor(): pxsim.SamDCMotor {
    return new pxsim.SamDCMotor();  
}
}

namespace pxsim{
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
        window.console.log("DCMotor created")
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
            };
            this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
            );
        }

        public setMotorColor(color: string) {
            const detail = {
                device: this.deviceName,
                event: "device_value_changed",
                id: this._id,
                value: color,
                };
                this._dispatch(
                { device: this.deviceName, detail },
                samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
                );
            }
        public getMotorColor(device:SamDCMotor) {
            const id = device.deviceId;
            const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(id);
            return deviceData.color
        }
        public getMotorSpeed(device:SamDCMotor) {
            const id = device.deviceId;
            const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(id);
            return deviceData.speed
        }
      get deviceId() {
        return this._id;
      }

      _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, {
          ...payload,
        });
      }
    }
}