namespace pxsim.Slider {
  //% blockId="get_slider_value" block="get slider %variable value"
  //% variable.shadow=variables_get
  //% variable.defl="Slider_1"
  //% color="#ff4500"
  export function getSamSliderValue(variable: pxsim.SamSlider): number {
    return variable.getValue();
  }

  //% blockId="get_slider_value_equals" block="is %variable value changed"
  //% variable.shadow=variables_get
  //% variable.defl="Slider_1"
  //% number.min=0 number.max=100
  //% color="#ff4500"
  export function isSliderValueChanged(variable: pxsim.SamSlider): boolean {
    return variable.isSliderValueChanged();
  }

  //% blockId="set_slider_color" block="set slider %variable color to %value"
  //% variable.shadow=variables_get
  //% variable.defl="Slider_1"
  //% color="#ff4500"
  export function setSamSliderColor(
    variable: pxsim.SamSlider,
    value: samLedColors
  ): void {
    variable.setDeviceColor(value);
  }

  //% blockId="create_slider" block="Create new slider"
  //% variable.defl="Slider_1"
  //% color="#ff4500"
  export function createSlider(): pxsim.SamSlider {
    return new pxsim.SamSlider();
  }
}

namespace pxsim {
  /**
   * A Slider.
   */
  //%
  export class SamSlider {
    public deviceName = "sam_slider";
    private _id: string;
    private previousValue: number;

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
      window.console.log("Slider created");
    }

    public isSliderValueChanged(): boolean {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      if (this.previousValue === deviceData?.sliderValue) {
        return false;
      } else {
        this.previousValue = deviceData?.sliderValue;
        return true;
      }
    }

    public getValue() {
      const deviceData = samlabs.SamSimDataService.getInstance().getDeviceProps(
        this._id
      );
      return deviceData?.sliderValue || 0;
    }

    public setDeviceColor(color: samLedColors) {
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

    public receiveEvent(handler: () => any) {
      samlabs.WindowEventService.getInstance().sendEvent(
        samlabs.buildEventName(
          samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED,
          this._id
        ),
        () => handler()
      );
    }

    get deviceId() {
      return this._id;
    }

    public _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}
