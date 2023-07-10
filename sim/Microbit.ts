namespace pxsim.Microbit {
  //% blockId="when_microbit_button_pressed" block="when %variable button $buttonOption $velocityOption"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  export function whenMicrobitButtonPressed(
    variable: pxsim.BBCMicrobit,
    buttonOption: MicrobitButtonOptions,
    velocityOption: MicrobitButtonVelocity
  ): void {
    const buttonSelected = () => {
      switch (buttonOption) {
        case MicrobitButtonOptions.A:
          variable.isButtonAPressed(variable);
        case MicrobitButtonOptions.B:
          variable.isButtonBPressed(variable);
      }
    };
    switch (velocityOption) {
      case MicrobitButtonVelocity.pressed:
        buttonSelected();
        variable.isButtonAPressed(variable);
      case MicrobitButtonVelocity.released:
        buttonSelected();
        variable.isButtonBPressed(variable);
      case MicrobitButtonVelocity.longPressed:
        buttonSelected();
        variable.isButtonBPressed(variable);
    }
  }

  //% blockId="is_microbit_button_pressed" block="is %variable button $option pressed"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  export function isMicrobitButtonPressed(
    variable: pxsim.BBCMicrobit,
    option: MicrobitButtonOptions
  ): void {
    switch (option) {
      case MicrobitButtonOptions.A:
        variable.isButtonAPressed(variable);
      case MicrobitButtonOptions.B:
        variable.isButtonBPressed(variable);
    }
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

    // public whenButtonPressed() {
    //   const detail = {
    //     device: this.deviceName,
    //     event: "device_value_changed",
    //     id: this._id,
    //   };
    //   this._dispatch(
    //     { device: this.deviceName, detail },
    //     samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
    //   );
    //   window.console.log("whenButtonPressed called");
    // }

    public isButtonAPressed(device: BBCMicrobit) {
      const id = device.deviceId;
      window.console.log(id, "Microbit button A pressed");
      const deviceData =
        samlabs.SamSimDataService.getInstance().getDeviceProps(id);
      // window.console.log(deviceData, "Microbit button A pressed");
      return deviceData.aPressed;
    }

    public isButtonBPressed(device: BBCMicrobit) {
      const id = device.deviceId;
      const deviceData =
        samlabs.SamSimDataService.getInstance().getDeviceProps(id);
      window.console.log(deviceData, "Microbit button B pressed");
      return deviceData.bPressed;
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
