//% color=190
//% advanced=true blockGap=8
namespace pxsim.button {

    /**
     * Registers a handler that runs when the button with the given ID is pressed
     * @param buttonId The ID of the button to listen for
     * @param handler The function to run when the button is pressed
     */
    //% blockId="on_button_pressed" block="when Button with ID $buttonId is pressed"
    //% buttonId.defl=0
    //% weight=1 icon="\uf11b"
    export function onButtonPressed(buttonId: number|string, handler: () => void): void {
 

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
    /**
     * Set the color of the button
     * @param buttonId The ID of the button to change color
     * @param color The new color for the button
     */
    //% blockId="set_button_color" block="set color of Button with ID $buttonId to $color"
    //% buttonId.defl=0
    //% color.shadow="colorNumberPicker"
    //% advanced=true
    export function setButtonColor(buttonId: number, color: string): void {
      //TODO update the simulator's UI
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