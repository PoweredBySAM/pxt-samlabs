//% color=190 weight=100 icon="\uf025" block="Sam Labs" group="Buzzer"
namespace pxsim.buzzer {
  /**
   * Set the volume of the buzzer with the given ID
   * @param variable The buzzer instance to set the volume for
   * @param volume The new volume for the buzzer (0-100)
   */
  //% blockId="set_buzzer_volume" block="Set Buzzer $variable volume to $volume"
  //% variable.shadow=variables_get
  //% variable.defl="Buzzer_1"
  //% volume.min=0 volume.max=100
  //% color="#d400d4"
  export function setBuzzerVolume(
    variable: pxsim.SamBuzzer,
    volume: number
  ): void {
    variable.setVolume(volume);
  }
  /**
   * Set the pitch of the buzzer with the given ID
   * @param buzzerId The ID of the buzzer to set the pitch for
   * @param pitch The new pitch for the buzzer (in Hz)
   */
  //% blockId="set_buzzer_pitch" block="Set Buzzer $variable pitch to $pitch Hz"
  //% variable.shadow=variables_get
  //% variable.defl="Buzzer_1"
  //% volume.min=0 volume.max=100
  //% pitch.min=20 pitch.max=20000
  //% color="#d400d4"

  export function setBuzzerPitch(
    variable: pxsim.SamBuzzer,
    pitch: number
  ): void {
    variable.setPitch(pitch);
  }

  /**
   * Clear the buzzer with the given ID by setting its volume and pitch to zero
   * @param variable The buzzer instance to clear
   */
  //% blockId="clear_buzzer" block="clear Buzzer $variable"
  //% variable.shadow=variables_get
  //% variable.defl="Buzzer_1"
  //% color="#d400d4"
  export function clearBuzzer(variable: pxsim.SamBuzzer): void {
    variable.clear();
  }
  /**
   * Set the color of the buzzer with the given ID
   * @param buzzerId The ID of the buzzer to set the color for
   * @param color The new color for the buzzer
   */
  //% blockId="set_buzzer_color" block="Set Buzzer $variable color to $color"
  //% variable.shadow=variables_get
  //% variable.defl="Buzzer_1"
  //% color.shadow="colorNumberPicker"
  //% color="#d400d4"
  export function setBuzzerColor(
    variable: pxsim.SamBuzzer,
    color: samLedColors
  ): void {
    variable.setColor(color);
  }
  //% blockId="createBuzzer" block="Create new Buzzer"
  //% variable.shadow=variables_get
  //% variable.defl="Buzzer_1"  //% weight=2
  export function createBuzzer(): pxsim.SamBuzzer {
    return new pxsim.SamBuzzer();
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
        id: this._id,
      };
      this._dispatch(
        { device: this.deviceName, detail },
        samlabs.samSimEvents.TOSIM_DEVICE_CREATED
      );
    }

    public setVolume(newVolume: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        property: "volume",
        id: this._id,
        value: newVolume,
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public setPitch(newPitch: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        property: "pitch",
        value: newPitch,
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public clear() {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        property: "clear",
        id: this._id,
        value: 0,
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }
    public setColor(color: samLedColors) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        property: "color",
        value: samlabs.hexColorFromCode(color),
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }

    _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, { ...payload });
    }
  }
}
