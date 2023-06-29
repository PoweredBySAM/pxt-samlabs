//% color="#FF5733" weight=100 icon="\uf0eb" block="Light Sensor" subcategory="Light Sensor"
namespace pxsim.LightSensor {
    /**
     * Get the current value of the light sensor
     */
    //% blockId="get_light_sensor_value" block="get light sensor value"
    //% color="#FF5733"
    export function getLightSensorValue(): number {
        // TODO: Implement the functionality to read the light sensor's value
        return 0; // placeholder return
    }
    
    /**
     * Set the border color of the light sensor
     * @param color The new color for the light sensor border
     */
    //% blockId="set_light_sensor_border_color" block="set light sensor border color to $color"
    //% color.shadow="colorNumberPicker"
    //% color="#FF5733"
    export function setLightSensorBorderColor(color: string): void {
        // TODO: Implement the functionality to change the light sensor's border color
    }

    /**
     * Wait until the light sensor's value changes
     */
    //% blockId="wait_until_light_sensor_value_changes" block="wait until light sensor value changes"
    //% color="#FF5733"
    export function waitUntilLightSensorValueChanges(): void {
        // TODO: Implement the functionality to wait until the light sensor's value changes
    }

    /**
     * Registers a handler that runs when the light sensor's value changes
     * @param handler The function to run when the light sensor's value changes
     */
    //% blockId="on_light_sensor_value_change" block="when light sensor value changes"
    //% color="#FF5733"
    export function onLightSensorValueChange(handler: () => void): void {
        // TODO: Implement the functionality to handle the event when the light sensor's value changes
    }
}
