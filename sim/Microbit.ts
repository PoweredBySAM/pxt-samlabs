//% groups=['Actions','Values']
namespace pxsim.Microbit {
  //% blockId="write_digital_pin" block="on %variable V2 write digital pin $pinId value $value"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Actions"
  export function writeDigitalPin(
    variable: pxsim.BBCMicrobit,
    pinId: MicrobitPinOptions,
    value: number
  ): void {
    variable.writeDigitalPin(pinId, value);
  }
  //% blockId="cleaar_led" block="clear %variable LEDs"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Actions"
  export function clearLED(variable: pxsim.BBCMicrobit): void {
    variable.clearLED();
  }

  //% blockId="on_microbit_toggle" block="on %variable toggle X: $x Y: $y"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Actions"
  //% x.min=-0 x.max=4
  //% y.min=-0 y.max=4
  export function onMicrobitToggle(
    variable: pxsim.BBCMicrobit,
    x: number,
    y: number
  ): void {
    variable.onMicrobitToggle(x, y);
  }

  //% blockId="on_microbit_unplot" block="on %variable unplot X: $x Y: $y"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Actions"
  //% x.min=-0 x.max=4
  //% y.min=-0 y.max=4
  export function onMicrobitUnPlot(
    variable: pxsim.BBCMicrobit,
    x: number,
    y: number
  ): void {
    variable.onMicrobitUnPlot(x, y);
  }

  //% blockId="on_microbit_plot" block="on %variable plot X: $x Y: $y"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Actions"
  //% x.min=-0 x.max=4
  //% y.min=-0 y.max=4
  export function onMicrobitPlot(
    variable: pxsim.BBCMicrobit,
    x: number,
    y: number
  ): void {
    variable.onMicrobitPlot(x, y);
  }

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

  //% blockId="shape_conv" block="$shapes"
  //% blockHidden=true
  export function shapeConversion(shapes: MicrobitLEDShapes): string {
    switch (shapes) {
      case MicrobitLEDShapes.Heart:
        return "heart";
      case MicrobitLEDShapes.SmallHeart:
        return "small heart";
      case MicrobitLEDShapes.Yes:
        return "yes";
      case MicrobitLEDShapes.No:
        return "no";
      case MicrobitLEDShapes.Happy:
        return "happy";
      case MicrobitLEDShapes.Sad:
        return "sad";
      case MicrobitLEDShapes.Confused:
        return "confused";
      case MicrobitLEDShapes.Angry:
        return "angry";
      case MicrobitLEDShapes.Asleep:
        return "asleep";
      case MicrobitLEDShapes.Surprised:
        return "surprised";
      case MicrobitLEDShapes.Silly:
        return "silly";
      case MicrobitLEDShapes.Fabulous:
        return "fabulous";
      case MicrobitLEDShapes.Meh:
        return "meh";
      case MicrobitLEDShapes.TShirt:
        return "t-shirt";
      case MicrobitLEDShapes.Rollerskate:
        return "roller skate";
      case MicrobitLEDShapes.Duck:
        return "duck";
      case MicrobitLEDShapes.House:
        return "house";
      case MicrobitLEDShapes.Tortoise:
        return "tortoise";
      case MicrobitLEDShapes.Butterfly:
        return "butterfly";
      case MicrobitLEDShapes.StickFigure:
        return "stick figure";
      case MicrobitLEDShapes.Ghost:
        return "ghost";
      case MicrobitLEDShapes.Sword:
        return "sword";
      case MicrobitLEDShapes.Giraffe:
        return "giraffe";
      case MicrobitLEDShapes.Skull:
        return "skull";
      case MicrobitLEDShapes.Umbrella:
        return "umbrella";
      case MicrobitLEDShapes.Snake:
        return "snake";
      default:
        return "heart";
    }
  }

  //% blockId="on_microbit_display_shape" block="on %variable display $shape"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% shape.shadow=shape_conv
  //% group="Actions"
  export function onMicrobitDisplayShape(
    variable: pxsim.BBCMicrobit,
    shape: string
  ): void {
    variable.onMicrobitDisplayShape(shape);
  }

  //% blockId="create_microbit" block="Create new Microbit"
  //% variable.defl="Microbit 1"
  //% group="Actions"
  export function createMicrobit(): pxsim.BBCMicrobit {
    return new pxsim.BBCMicrobit();
  }

  //% blockId="microbit_pin_pressed" block="is %variable V2 $analogPinOption pressed"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Values"
  export function isMicrobitPinPressed(
    variable: pxsim.BBCMicrobit,
    analogPinOption: MicrobitAnalogPinOptions
  ): boolean {
    return variable.isMicrobitPinPressed(analogPinOption);
  }

  //% blockId="microbit_temperature_changed" block="is %variable temperature changed"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Values"
  export function isMicrobitTemperatureChanged(
    variable: pxsim.BBCMicrobit
  ): boolean {
    return variable.isMicrobitTemperatureChanged();
  }

  //% blockId="microbit_button_pressed" block="is %variable button $buttonOption pressed"
  //% variable.shadow=variables_get
  //% variable.defl="Microbit 1"
  //% group="Values"
  export function isMicrobitButtonPressed(
    variable: pxsim.BBCMicrobit,
    buttonOption: MicrobitButtonOptions
  ): boolean {
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
    return variable.isMicrobitButtonPressed(buttonSelected());
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
      this.dispatchToSimValueChange(detail);
    }

    public onMicrobitDisplayShape(word: string) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: word,
        property: "ledDisplayShape",
      };
      this.dispatchToSimValueChange(detail);
    }

    public onMicrobitPlot(x: number, y: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: { x, y },
        property: "plot",
      };
      this.dispatchToSimValueChange(detail);
    }

    public onMicrobitUnPlot(x: number, y: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: { x, y },
        property: "unplot",
      };
      this.dispatchToSimValueChange(detail);
    }

    public onMicrobitToggle(x: number, y: number) {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: { x, y },
        property: "toggle",
      };
      this.dispatchToSimValueChange(detail);
    }

    public clearLED() {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: "clear",
        property: "clearLED",
      };
      this.dispatchToSimValueChange(detail);
    }

    public writeDigitalPin = (pinId: number, value: number) => {
      const detail = {
        device: this.deviceName,
        event: "device_value_changed",
        id: this._id,
        value: { pinId, value },
        property: "writeDigitalPin",
      };
      this.dispatchToSimValueChange(detail);
    };

    public isMicrobitButtonPressed(button: string) {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return button === "A" ? deviceData?.aDown : deviceData?.bDown;
    }
    public isMicrobitTemperatureChanged() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.isTemperatureChanged;
    }
    public isMicrobitPinPressed(pinOption: number) {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      switch (pinOption) {
        case 0:
          return deviceData?.pin0;

        case 1:
          return deviceData?.pin1;
        case 2:
          return deviceData?.pin2;
      }
    }

    dispatchToSimValueChange = (detail: any) => {
      this._dispatch(
        { device: this.deviceName, detail },
        `${samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED}_${this._id}`
      );
    };

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
