//% color="#ff69b4" weight=100 icon="\uf06d" block="Button" subcategory="Sam Button"
namespace pxsim.HeatSensor {
    /**
     * Wait until the heat sensor value changes
     * @param sensorId The ID of the heat sensor to wait for
     */
    //% blockId="wait_until_heat_sensor_value_changes" block="wait until heat sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#3455db"
    export function waitUntilHeatSensorValueChanges(sensorId: number): void {
        // TODO: Implement the waiting mechanism for the heat sensor value change
    }

    /**
     * Register an event handler to run when the heat sensor value changes
     * @param sensorId The ID of the heat sensor to listen for
     * @param handler The function to run when the heat sensor value changes
     */
    //% blockId="on_heat_sensor_value_changes" block="when heat sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#3455db"
    export function onHeatSensorValueChanges(sensorId: number, handler: () => void): void {
        // TODO: Implement the event listener for the heat sensor value change
    }

    /**
     * Get the value of the heat sensor with a given ID in Celsius
     * @param sensorId The ID of the heat sensor to get the value of
     */
    //% blockId="get_heat_sensor_value_celsius" block="get value of heat sensor with ID $sensorId in Celsius"
    //% sensorId.defl=0
    //% color="#3455db"
    export function getHeatSensorValueCelsius(sensorId: number): number {
        // TODO: Read the heat sensor value in Celsius from the simulator's UI or the hardware
        // Placeholder implementation that returns a default value (0)
        return 0;
    }

    /**
     * Get the value of the heat sensor with a given ID in Fahrenheit
     * @param sensorId The ID of the heat sensor to get the value of
     */
    //% blockId="get_heat_sensor_value_fahrenheit" block="get value of heat sensor with ID $sensorId in Fahrenheit"
    //% sensorId.defl=0
    //% color="#3455db"
    export function getHeatSensorValueFahrenheit(sensorId: number): number {
        // TODO: Read the heat sensor value in Fahrenheit from the simulator's UI or the hardware
        // Placeholder implementation that returns a default value (0)
        return 0;
    }

    /**
     * Set the border color of the heat sensor
     * @param sensorId The ID of the heat sensor to change the border color
     * @param color The new border color for the heat sensor
     */
    //% blockId="set_heat_sensor_border_color" block="set border color of heat sensor with ID $sensorId to $color"
    //% sensorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#3455db"
    export function setHeatSensorBorderColor(sensorId: number, color: string): void {
        // TODO: Update the simulator's UI or the hardware
    }
}
