//% groups=['Actions','Events','Values']
namespace pxsim.Microbit {
  //% blockId="on_microbit_display_word" block="on %variable display  $word"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Actions"
  export function onMicrobitDisplayWord(
    variable: pxsim.BBCMicrobit,
    word: string
  ): void {
    variable.onMicrobitDisplayWord(word);
  }

  //% blockId="create_microbit" block="Create new Microbit"
  //% variable.defl="Microbit 1"
  //% group="Actions"
  export function createMicrobit(): pxsim.BBCMicrobit {
    return new pxsim.BBCMicrobit();
  }

  //% blockId="when_button_pressed" block="when %variable button $buttonOption $velocityOption"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Events"
  export function whenButtonPressed(
    variable: pxsim.BBCMicrobit,
    buttonOption: MicrobitButtonOptions,
    velocityOption: MicrobitButtonVelocity
  ): void {
    const buttonSelected = (): string => {
      switch (buttonOption) {
        case MicrobitButtonOptions.A:
          return "A";
        case MicrobitButtonOptions.B:
          return "B";
        default:
          return "A";
      }
    };
    switch (velocityOption) {
      case MicrobitButtonVelocity.pressed:
        variable.whenButtonPressed(buttonSelected());
        break;
      case MicrobitButtonVelocity.released:
        //TODO
        window.console.log("whenMicrobitButtonReleased called");
        break;
      case MicrobitButtonVelocity.longPressed:
        //TODO
        window.console.log("whenMicrobitButtonLongPressed called");
        break;
    }
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

    public onMicrobitDisplayWord(word: string) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: word,
        property: "ledDisplayWord",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    }

    public whenButtonPressed(button: string) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: true,
        property: button === "A" ? "buttonAPressed" : "buttonBPressed",
      };
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
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
