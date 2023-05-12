//% color="#ff69b4" weight=100 icon="\uf50b" block="Button" subcategory="Sam Button"
namespace pxsim.TiltSensor {
    /**
     * Register an event handler to run when the tilt sensor with the given ID is tilted
     * @param sensorId The ID of the tilt sensor to listen for
     * @param handler The function to run when the tilt sensor is tilted
     */
    //% blockId="on_tilt_sensor_tilted" block="when tilt sensor with ID $sensorId is tilted"
    //% sensorId.defl=0
    //% color="#9400d3"
    export function onTiltSensorTilted(sensorId: number, handler: () => void): void {
        // TODO: Implement the event listener for the tilt sensor tilt
    }

    /**
     * Wait until the tilt sensor with the given ID is tilted
     * @param sensorId The ID of the tilt sensor to wait for
     */
    //% blockId="wait_until_tilt_sensor_tilted" block="wait until tilt sensor with ID $sensorId is tilted"
    //% sensorId.defl=0
    //% color="#9400d3"
    export function waitUntilTiltSensorTilted(sensorId: number): void {
        // TODO: Implement the waiting mechanism for the tilt sensor tilt
    }

    /**
     * Set the border color of the tilt sensor
     * @param sensorId The ID of the tilt sensor to change the border color
     * @param color The new border color for the tilt sensor
     */
    //% blockId="set_tilt_sensor_border_color" block="set border color of tilt sensor with ID $sensorId to $color"
    //% sensorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#9400d3"
    export function setTiltSensorBorderColor(sensorId: number, color: string): void {
        // TODO: Update the simulator's UI or the hardware
    }

    /**
     * Check if the tilt sensor with a given ID is tilted
     * @param sensorId The ID of the tilt sensor to check
     */
    //% blockId="is_tilt_sensor_tilted" block="is tilt sensor with ID $sensorId tilted"
    //% sensorId.defl=0
    //% color="#9400d3"
    export function isTiltSensorTilted(sensorId: number): boolean {
        // TODO: Read the tilt sensor state from the simulator's UI or the hardware
        // Placeholder implementation that returns 'false' by default
        return false;
    }
}
