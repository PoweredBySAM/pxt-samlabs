namespace pxsim.Microbit {
  //% blockId="is_microbit_button_a_pressed" block="is %variable button A pressed"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"

  export function isMicrobitButtonAPressed(variable: pxsim.BBCMicrobit): void {
    variable.isButtonAPressed(variable);
  }
  //% blockId="create_microbit" block="Create new Microbit"
  //% variable.defl="Microbit 1"
  export function createMicrobit(): pxsim.BBCMicrobit {
    return new pxsim.BBCMicrobit();
  }
}

namespace pxsim {
  /**
   * A Microbit.
   */
  //%
  export class BBCMicrobit {
    public deviceName = "bbc_microbit";
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
      window.console.log("Microbit created");
    }

    public isButtonAPressed(device: BBCMicrobit) {
      const id = device.deviceId;
      const deviceData =
        samlabs.SamSimDataService.getInstance().getDeviceProps(id);
      window.console.log(deviceData, "Microbit button A pressed");
      return deviceData.aPressed;
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
