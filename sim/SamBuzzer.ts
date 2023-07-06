
//% color=190 weight=100 icon="\uf025" block="Sam Labs" group="Buzzer"
namespace pxsim.buzzer{


    /**
 * Set the volume of the buzzer with the given ID
 * @param variable The buzzer instance to set the volume for
 * @param volume The new volume for the buzzer (0-100)
 */
//% blockId="set_buzzer_volume" block="set volume of Buzzer in variable $variable to $volume"
//% variable.shadow=variables_get
//% variable.defl="Buzzer 1"
//% volume.min=0 volume.max=100
//% color="#d400d4"
export function setBuzzerVolume(variable: pxsim.SamBuzzer, volume: number): void {
   variable.setVolume(volume); 
}
/**
 * Set the pitch of the buzzer with the given ID
 * @param buzzerId The ID of the buzzer to set the pitch for
 * @param pitch The new pitch for the buzzer (in Hz)
 */
//% blockId="set_buzzer_pitch" block="set pitch of Buzzer in variable $variable to $pitch Hz"
//% variable.shadow=variables_get
//% variable.defl="Buzzer 1"
//% volume.min=0 volume.max=100
//% pitch.min=20 pitch.max=20000
//% color="#d400d4"

export function setBuzzerPitch(variable: pxsim.SamBuzzer, pitch: number): void {
    variable.setPitch(pitch);
}

/**
 * Clear the buzzer with the given ID by setting its volume and pitch to zero
 * @param variable The buzzer instance to clear
 */
//% blockId="clear_buzzer" block="clear Buzzer in $variable"
//% variable.shadow=variables_get
//% variable.defl="Buzzer 1"
//% color="#d400d4"
export function clearBuzzer(variable: pxsim.SamBuzzer): void {
    variable.clear()
}
/**
 * Set the color of the buzzer with the given ID
 * @param buzzerId The ID of the buzzer to set the color for
 * @param color The new color for the buzzer
 */
//% blockId="set_buzzer_color" block="set color of Buzzer with ID $buzzerId to $color"
//% variable.shadow=variables_get
//% variable.defl="Buzzer 1"
//% color.shadow="colorNumberPicker"
//% color="#d400d4"
export function setBuzzerColor(variable: pxsim.SamBuzzer, color: string): void {
    variable.setColor(color);
}

}
namespace pxsim.buzzer {
    /**
    * Creates a new Buzzer
    */
    //% blockId="createBuzzer" block="createBuzzer"
    export function createBuzzer(): SamBuzzer {
        return new SamBuzzer();
    }
  }
namespace pxsim {
    /**
     * A Buzzer.
     */
    //%
    export class SamBuzzer {
        public deviceName = "sam_buzzer";
        private _id: string;
        constructor() {
            this._id = samlabs.uuidv4();
        const detail = {
            device: this.deviceName,
            event: "device_created",
            id: this._id
        };
        this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_CREATED
        );
        }
  
        public setVolume(newVolume: number) {
        const detail = {
            device: this.deviceName,
            event: "value_changed",
            properties: ["volume"],
            newValues: [newVolume],
        };
        this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
        }
        public setPitch(newPitch: number) {
        const detail = {
            device: this.deviceName,
            event: "value_changed",
            properties: ["pitch"],
            newValues: [newPitch],
        };
        this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
        }
        public clear() {
        const detail = {
            device: this.deviceName,
            event: "value_changed",
            properties: ["pitch", "volume"],
            newValue: [0, 0],
        };
        this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
        }
        public setColor(color: string) {
        const detail = {
            device: this.deviceName,
            event: "value_changed",
            properties: ["color"],
            newValue: [color],
        };
        this._dispatch(
            { device: this.deviceName, detail },
            samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
        }
  
        _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, { ...payload });
        }
    }
  }
  
