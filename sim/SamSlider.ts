namespace pxsim.Slider {
    //% blockId="on_slider_value_changes" block="when slider %variable value changes"
    //% variable.shadow=variables_get
    //% variable.defl="Slider1"
    //% color="#ff69b4"
    export function onSliderValueChanges(
      variable: pxsim.SamSlider,
      handler: () => void
    ): void {
      variable.receiveEvent(handler);
    }
  
    //% blockId="get_slider_value" block="get slider %variable value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider1"
    //% color="#ff69b4"
    export function getSamSliderValue(variable: pxsim.SamSlider): any {
      return variable.getValue();
    }
  
    //% blockId="set_slider_color" block="set slider %variable color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider1"
    //% color="#ff69b4"
    export function setSamSliderColor(
      variable: pxsim.SamSlider,
      value: string
    ): void {
      variable.setDeviceColor(value);
    }
  
    //% blockId="create_slider" block="Create new slider"
    //% variable.defl="Slider1"
    //% color="#ff69b4"
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
      private _value: number;
  
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
  
      public getValue() {
        return this._value;
      }
  
      public setDeviceColor(color: string) {
        const detail = {
          device: this.deviceName,
          event: "device_value_changed",
          id: this._id,
          value: color,
          property: "color",
        };
        this._dispatch(
          { device: this.deviceName, detail },
          samlabs.samSimEvents.TOSIM_DEVICE_VALUE_CHANGED
        );
      }
  
      public receiveEvent(handler: () => any) {
        samlabs.WindowEventService.getInstance().sendEvent(
          samlabs.buildEventName(samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED, this._id),
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
  