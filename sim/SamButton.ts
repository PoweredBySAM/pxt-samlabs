namespace pxsim.button {

  //% blockId="set_button_color" block="set color of Button $variable to $color"
  //% variable.shadow=variables_get
  //% variable.defl="Button 1"  
  //% color.shadow="colorNumberPicker"
  //% advanced=true
  export function setButtonColor(variable: pxsim.SamBuzzer, color: samLedColors): void {
    variable.setColor(color);
  }

  //% blockId="create_button" block="create new button"
  //% variable.shadow=variables_get
  //% variable.defl="Button 1"  //% weight=2
  export function createNewButton(): pxsim.SamButton {
    window.console.log(runtime.globals,"globalsssssss" )
    return new pxsim.SamButton()
  }
  //% blockId="get_is_pressed" block="$variable is pressed"
  //% variable.shadow=variables_get
  //% variable.defl="Button 1"  //% weight=2
  export function buttonIsPressed(variable:SamButton): boolean {
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
    public setColor(color: samLedColors) {
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

    public getIsPressed(){
      return samlabs.SamSimDataService.getInstance().getDeviceProps(this._id)?.deviceState==='pressed';
    }

    get deviceId() {
      return this.deviceName;
    }
    _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, { ...payload });
    }

    listen(handler: any) {
      samlabs.WindowEventService.getInstance().receiveEvent(
        `${samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED}_${this._id}`,
        (detail: any) => {
            handler();
          
        }
      );
    }
  }
}
