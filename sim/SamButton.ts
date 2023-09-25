namespace pxsim.button {
  //% blockId="set_button_color" block="Set Button $variable color to %color"
  //% variable.shadow=variables_get
  //% variable.defl="Button_1"
  //% color.shadow="1" //% weight=2
  export function setButtonColor(
    variable: pxsim.SamButton,
    color: samLedColors
  ): void {
    variable.setButtonColor(color);
  }

  //% blockId="create_button" block="Create new button"
  //% variable.shadow=variables_get
  //% variable.defl="Button_1"  //% weight=2
  export function createNewButton(): pxsim.SamButton {
    return new pxsim.SamButton();
  }
  //% blockId="get_is_pressed" block="$variable is pressed"
  //% variable.shadow=variables_get
  //% variable.defl="Button_1"  //% weight=2
  export function buttonIsPressed(variable: SamButton): boolean {
    return variable.getIsPressed();
  }
}
namespace pxsim {
  /**
   * A Button.
   */
  //%
  export class SamButton {
    private _pressed: boolean;
    private color: samLedColors;
    public deviceName = "sam_button";
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
    public setButtonColor(color: samLedColors) {
      if (this.color === color) {
        return;
      }
      this.color = color;
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

    public getIsPressed() {
      return (
        samlabs.SamSimDataService.getInstance().getDeviceProps(this._id)
          ?.deviceState === "pressed"
      );
    }

    get deviceId() {
      return this.deviceName;
    }
    _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
        varNames: pxsim.runtime.globals,
      });
    }
  }
}
