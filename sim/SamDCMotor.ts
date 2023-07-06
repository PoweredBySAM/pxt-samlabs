namespace pxsim.DCMotor{

//% blockId="set_motor_speed" block="set %variable motor speed to %value"
//% speed.min=0 speed.max=100
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
//% color="#32cd32"
<<<<<<< HEAD
    export function setSamMotorSpeed(variable: pxsim.SamDCMotor, value: number): void {
        variable.setSpeed(value);
    }
=======
export function setSamMotorSpeed(variable: pxsim.SamDCMotor, value: number): void {
    variable.setSpeed(value); 
}
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be
//% blockId="set_motor_color" block="set %variable motor color to %value"
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
//% color="#32cd32"
<<<<<<< HEAD
    export function setSamMotorColor(variable: pxsim.SamDCMotor, value: string): void {
        variable.setMotorColor(value);
    }
=======
export function setSamMotorColor(variable: pxsim.SamDCMotor, value: string): void {
    variable.setMotorColor(value); 
}
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be

//% blockId="get_motor_speed" block="get %variable motor speed"
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
<<<<<<< HEAD
    export function getSamMotorSpeed(variable: pxsim.SamDCMotor): any {
        return variable.getMotorSpeed(variable);
    }
=======
export function getSamMotorSpeed(variable: pxsim.SamDCMotor): any {
    return variable.getMotorSpeed(variable);
}
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be

//% blockId="get_motor_color" block="get %variable motor color"
//% variable.shadow=variables_get
//% variable.defl="Motor 1"
// % prop.shadow=motor_property_dropdown
<<<<<<< HEAD
    export function getSamMotorColor(variable: pxsim.SamDCMotor): any {
        return variable.getMotorColor(variable);
    }
//% blockId="create_motor" block="Create new motor"
//% variable.defl="Motor 1"
    export function createMotor(): pxsim.SamDCMotor {
        return new pxsim.SamDCMotor();
    }
=======
export function getSamMotorColor(variable: pxsim.SamDCMotor): any {
    return variable.getMotorColor(variable);
}
//% blockId="create_motor" block="Create new motor"
//% variable.defl="Motor 1"
export function createMotor(): pxsim.SamDCMotor {
    return new pxsim.SamDCMotor();  
}
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be
}

namespace pxsim{
    /**
     * A DC Motor.
<<<<<<< HEAD
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
=======
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
            };
            this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be
            );
        }

        public setMotorColor(color: string) {
            const detail = {
                device: this.deviceName,
                event: "device_value_changed",
                id: this._id,
                value: color,
<<<<<<< HEAD
            };
            this._dispatch(
                { device: this.deviceName, detail },
                samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
            );
        }
=======
                };
                this._dispatch(
                { device: this.deviceName, detail },
                samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
                );
            }
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be
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
<<<<<<< HEAD
        get deviceId() {
            return this._id;
        }

        _dispatch(payload: any, type: string) {
            samlabs.WindowEventService.getInstance().sendEvent(type, {
                ...payload,
            });
        }
=======
      get deviceId() {
        return this._id;
      }

      _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, {
          ...payload,
        });
      }
>>>>>>> 4aea8379e2421d7db5a80392af51a02d103633be
    }
}