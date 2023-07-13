namespace pxsim.button {
  //% blockId="create_button" block="create new button"
  //% variable.shadow=variables_set
  //% weight=2
  export function createNewButton(): pxsim.SamButton {
    return new pxsim.SamButton()
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

    get deviceId() {
      return this.deviceName;
    }
    _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, { ...payload });
    }
  }
}
