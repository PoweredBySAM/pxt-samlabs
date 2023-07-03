//% color=190
//% advanced=true blockGap=8
namespace pxsim.button {

  //% blockId="create_button" block="set %variable to new button"
//% variable.shadow=variables_set
//% weight=2
export function createNewButton(variable: pxsim.SamButton): pxsim.SamButton {
  let newButton = new pxsim.SamButton();
  return newButton;
}

    // /**
    //  * Registers a handler that runs when the button with the given ID is pressed
    //  * @param buttonId The ID of the button to listen for
    //  * @param handler The function to run when the button is pressed
    //  */
    // //% variable.shadow=variables_get
    // //% variable.defl="Button 1"
    // //% blockId="on_button_pressed" block="when Button in variable $variable is pressed"
    // //% weight=1 icon="\uf11b"
    // export function onButtonPressed(variable: pxsim.SamButton, handler: () => void): void {
    //   const deviceId = variable.deviceId;
    //   const eventName = samlabs.buildEventName(samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED,deviceId)
    //   samlabs.WindowEventService.getInstance().receiveEvent(eventName, (payload: any) => {
    //     if (payload.deviceId === deviceId ) {
    //       handler();
    //     }
    //   })
    // }

    //% blockId="on_button_pressed" block="when button %variable is pressed"
    //% variable.shadow=variables_get
    //% weight=1
    export function onButtonPressed2(variable: pxsim.SamButton, handler: () => void): void {
      const deviceId = variable.deviceId;
      const eventName = samlabs.buildEventName(samlabs.samSimEvents.FROMSIM_DEVICE_VALUE_CHANGED, deviceId)
      samlabs.WindowEventService.getInstance().receiveEvent(eventName, (payload: any) => {
          if (payload.deviceId === deviceId ) {
              handler();
          }
      })
    }

    //% blockId="button_property_dropdown" block="%property"
    //% blockHidden=true
    //% property.fieldEditor="gridpicker" property.fieldOptions.columns=2
    //% weight=0
    export function buttonPropertyDropdown(property: string): string {
    return property;
    }



    /**
     * Wait until the button with the given ID is pressed
     * @param buttonId The ID of the button to wait for
     */
    //% blockId="wait_until_button_pressed" block="wait until Button with ID $buttonId is pressed"
    //% buttonId.defl=0
    //% advanced=true
    export function waitUntilButtonPressed(buttonId: number, handler: ()=> void): void {
     
    }
    //% blockId="set_button_property" block="set %variable button property %prop to %value"
    //% variable.shadow=variables_get
    //% prop.shadow=button_property_dropdown
    //% weight=2
    export function setButtonProperty(variable: pxsim.SamButton, prop: string, value: any): void {
      
    }

  
    /**
     * Get the state of the button with a given ID
     * @param buttonId The ID of the button to get the state of
     */
    //% blockId="get_button_state" block="get state of Button with ID $buttonId"
    //% buttonId.defl=0
    //% advanced=true
    export function getButtonState(buttonId: number): boolean {
      // TODO read the button state the simulator's UI
      // placeholder implementation that returns 'false' by default
      return false;
    }
  }
  namespace pxsim.button{
// //% blockId="create_button" block="set %variable to new button"
// //% variable.shadow=variables_set
// //% weight=3
// export function createButton(): pxsim.SamButton {
//   let newButton = new pxsim.SamButton();
//   return newButton;
// }

}
  namespace pxsim{
    /**
     * A Button.
     */
    //%
    export class SamButton {
        private _pressed: boolean;
        public deviceName = 'sam_button'
        private _id: string;
        constructor() {
          this._id = samlabs.uuidv4();
                const detail = {
                    device: this.deviceName,
                    event: 'device_created',
                    id: this._id
                }
                this._dispatch({ device: this.deviceName, detail }, samlabs.samSimEvents.TOSIM_DEVICE_CREATED)
        }
 
        get deviceId() {
            return this.deviceName;
        }
     _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, { ...payload });
      }
    }
}