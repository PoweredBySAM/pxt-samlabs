// Auto-generated from simulator. Do not edit.
declare namespace loops {
    // /**
    //  * Repeats the code forever in the background. On each iteration, allows other code to run.
    //  * @param body the code to repeat
    //  */
    // //% help=functions/forever weight=55 blockGap=8
    // //% blockId=device_forever block="forever" 
    // export function forever(body: RefAction): void {
    //     thread.forever(body)
    // }
    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}
    /**
     * A ghost on the screen.
     */
    //%
    declare class Sprite {
        /**
         * The X-coordiante
         */
        //%
        //% shim=.x
        public x: number;

        /**
         * The Y-coordiante
         */
        //%
        //% shim=.y
        public y: number;

        /**
         * Move the thing forward
         */
        //%
        //% shim=.forwardAsync promise
        public forward(steps: number): void;

    }
declare namespace Microbit {
    //% blockId="write_digital_pin" block="on %variable V2 write digital pin $pinId value $value"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% shim=Microbit::writeDigitalPin
    function writeDigitalPin(variable: BBCMicrobit, pinId: MicrobitPinOptions, value: number): void;

    //% blockId="cleaar_led" block="clear %variable LEDs"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% shim=Microbit::clearLED
    function clearLED(variable: BBCMicrobit): void;

    //% blockId="on_microbit_toggle" block="on %variable toggle X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% shim=Microbit::onMicrobitToggle
    function onMicrobitToggle(variable: BBCMicrobit, x: number, y: number): void;

    //% blockId="on_microbit_unplot" block="on %variable unplot X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% shim=Microbit::onMicrobitUnPlot
    function onMicrobitUnPlot(variable: BBCMicrobit, x: number, y: number): void;

    //% blockId="on_microbit_plot" block="on %variable plot X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% shim=Microbit::onMicrobitPlot
    function onMicrobitPlot(variable: BBCMicrobit, x: number, y: number): void;

    //% blockId="on_microbit_display_word" block="on %variable display  $word"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% shim=Microbit::onMicrobitDisplayWord
    function onMicrobitDisplayWord(variable: BBCMicrobit, word: string): void;

    //% blockId="shape_conv" block="$shapes"
    //% blockHidden=true
    //% shim=Microbit::shapeConversion
    function shapeConversion(shapes: MicrobitLEDShapes): string;

    //% blockId="on_microbit_display_shape" block="on %variable display $shape"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% shape.shadow=shape_conv
    //% group="Actions"
    //% shim=Microbit::onMicrobitDisplayShape
    function onMicrobitDisplayShape(variable: BBCMicrobit, shape: string): void;

    //% blockId="create_microbit" block="Create new Microbit"
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% shim=Microbit::createMicrobit
    function createMicrobit(): BBCMicrobit;

    //% blockId="get_microbit_v2_analog_pin" block="get %variable V2 analog pin $pin value"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::getMicrobitAnalogPin
    function getMicrobitAnalogPin(variable: BBCMicrobit, pin: MicrobitAnalogPinOptions): number;

    //% blockId="get_microbit_v2_digital_pin" block="get %variable V2 digital pin $pin value"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::getMicrobitDigitalPin
    function getMicrobitDigitalPin(variable: BBCMicrobit, pin: MicrobitPinOptions): number;

    //% blockId="get_microbit_Accelerometer_axis_values" block="get %variable $AccelerometerAxisOptions acceleration"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::getMicrobitAccelerometerValues
    function getMicrobitAccelerometerValues(variable: BBCMicrobit, AccelerometerAxisOptions: MicrobitAccelerometerAxisOptions): number;

    //% blockId="get_microbit_Temperature" block="get %variable temperature"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::getMicrobitTemperature
    function getMicrobitTemperature(variable: BBCMicrobit): number;

    //% blockId="microbit_led_on" block="is %variable LED on X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% group="Values"
    //% shim=Microbit::isMicrobitLedOn
    function isMicrobitLedOn(variable: BBCMicrobit, x: number, y: number): boolean;

    //% blockId="microbit_pin_pressed" block="is %variable V2 $analogPinOption pressed"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::isMicrobitPinPressed
    function isMicrobitPinPressed(variable: BBCMicrobit, analogPinOption: MicrobitAnalogPinOptions): boolean;

    //% blockId="microbit_temperature_changed" block="is %variable temperature changed"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::isMicrobitTemperatureChanged
    function isMicrobitTemperatureChanged(variable: BBCMicrobit): boolean;

    //% blockId="microbit_button_pressed" block="is %variable button $buttonOption pressed"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Values"
    //% shim=Microbit::isMicrobitButtonPressed
    function isMicrobitButtonPressed(variable: BBCMicrobit, buttonOption: MicrobitButtonOptions): boolean;

}
    /**
     * A Microbit.
     */
    //%
    declare class BBCMicrobit {
    }
declare namespace button {
    //% blockId="set_button_color" block="set $variable color to %color"
    //% variable.shadow=variables_get
    //% variable.defl="Button 1"
    //% color.shadow="1" //% weight=2
    //% shim=button::setButtonColor
    function setButtonColor(variable: SamButton, color: samLedColors): void;

    //% blockId="create_button" block="create new button"
    //% variable.shadow=variables_get
    //% variable.defl="Button 1"  //% weight=2
    //% shim=button::createNewButton
    function createNewButton(): SamButton;

    //% blockId="get_is_pressed" block="$variable is pressed"
    //% variable.shadow=variables_get
    //% variable.defl="Button 1"  //% weight=2
    //% shim=button::buttonIsPressed
    function buttonIsPressed(variable: SamButton): boolean;

}
    /**
     * A Button.
     */
    //%
    declare class SamButton {
    }
declare namespace buzzer {
    /**
     * Set the volume of the buzzer with the given ID
     * @param variable The buzzer instance to set the volume for
     * @param volume The new volume for the buzzer (0-100)
     */
    //% blockId="set_buzzer_volume" block="set volume of Buzzer in variable $variable to $volume"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer 1"
    //% volume.min=0 volume.max=100
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerVolume
    function setBuzzerVolume(variable: SamBuzzer, volume: number): void;

    /**
     * Set the pitch of the buzzer with the given ID
     * @param buzzerId The ID of the buzzer to set the pitch for
     * @param pitch The new pitch for the buzzer (in Hz)
     */
    //% blockId="set_buzzer_pitch" block="set pitch of Buzzer in variable $variable to $pitch Hz"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer 1"
    //% volume.min=0 volume.max=100
    //% pitch.min=20 pitch.max=20000
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerPitch
    function setBuzzerPitch(variable: SamBuzzer, pitch: number): void;

    /**
     * Clear the buzzer with the given ID by setting its volume and pitch to zero
     * @param variable The buzzer instance to clear
     */
    //% blockId="clear_buzzer" block="clear Buzzer in $variable"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer 1"
    //% color="#d400d4"
    //% shim=buzzer::clearBuzzer
    function clearBuzzer(variable: SamBuzzer): void;

    /**
     * Set the color of the buzzer with the given ID
     * @param buzzerId The ID of the buzzer to set the color for
     * @param color The new color for the buzzer
     */
    //% blockId="set_buzzer_color" block="set color of Buzzer $variable to $color"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer 1"
    //% color.shadow="colorNumberPicker"
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerColor
    function setBuzzerColor(variable: SamBuzzer, color: samLedColors): void;

    /**
     * Creates a new Buzzer
     */
    //% blockId="createBuzzer" block="createBuzzer"
    //% shim=buzzer::createBuzzer
    function createBuzzer(): SamBuzzer;

}
    /**
     * A Buzzer.
     */
    //%
    declare class SamBuzzer {
    }
declare namespace DCMotor {
    //% blockId="set_motor_speed" block="set %variable motor speed to %value"
    //% speed.min=0 speed.max=100
    //% variable.shadow=variables_get
    //% variable.defl="DCMotor 1"
    //% color="#32cd32"
    //% shim=DCMotor::setSamMotorSpeed
    function setSamMotorSpeed(variable: SamDCMotor, value: number): void;

    //% blockId="stop_motor" block="stop motor %variable "
    //% variable.shadow=variables_get
    //% variable.defl="DCMotor 1"
    //% color="#32cd32"
    //% shim=DCMotor::stopMotor
    function stopMotor(variable: SamDCMotor): void;

    //% blockId="set_motor_color" block="set %variable color to %color"
    //% variable.shadow=variables_get
    //% variable.defl="Motor 1"
    //% color.shadow="1"
    //% color="#32cd32"
    //% shim=DCMotor::setSamMotorColor
    function setSamMotorColor(variable: SamDCMotor, value: samLedColors): void;

    // //% blockId="get_motor_speed" block="get %variable motor speed"
    // //% variable.shadow=variables_get
    // //% variable.defl="DCMotor 1"
    // export function getSamMotorSpeed(variable: pxsim.SamDCMotor): any {
    //   return variable.getSpeed();
    // }
    // //% blockId="get_motor_color" block="get %variable motor color"
    // //% variable.shadow=variables_get
    // //% variable.defl="DCMotor 1"
    // // % prop.shadow=motor_property_dropdown
    // export function getSamMotorColor(variable: pxsim.SamDCMotor): any {
    //   return 0;
    // }
    //% blockId="create_motor" block="Create new motor"
    //% variable.defl="DCMotor 1"
    //% shim=DCMotor::createMotor
    function createMotor(): SamDCMotor;

}
    /**
     * A DC Motor.
     */
    //%
    declare class SamDCMotor {
    }
declare namespace HeatSensor {
    //% blockId="get_heat_sensor_value_celsius" block="get heat %variable sensor value in Celsius"
    //% variable.shadow=variables_get
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::getSamHeatSensorValueCelsius
    function getSamHeatSensorValueCelsius(variable: SamHeatSensor): any;

    //% blockId="get_heat_sensor_value_fahrenheit" block="get heat sensor  %variable value in Fahrenheit"
    //% variable.shadow=variables_get
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::getSamHeatSensorValueFahrenheit
    function getSamHeatSensorValueFahrenheit(variable: SamHeatSensor): any;

    //% blockId="get_heat_sensor_value_equal_fahrenheit" block="value of heat sensor %variable equals %number fahrenheit"
    //% variable.shadow=variables_get
    //% number.min=0 
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    //% shim=HeatSensor::heatSensorfahrenHeitValueIsEqualTo
    function heatSensorfahrenHeitValueIsEqualTo(variable: SamHeatSensor, number: number): any;

    //% blockId="get_heat_sensor_value_greater_fahrenheit" block="value of heat sensor %variable is greater than %number fahrenheit"
    //% variable.shadow=variables_get
    //% number.min=0 
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    //% shim=HeatSensor::heatSensorfahrenHeitValueIsGreaterThan
    function heatSensorfahrenHeitValueIsGreaterThan(variable: SamHeatSensor, number: number): any;

    //% blockId="get_heat_sensor_value_less_fahrenheit" block="value of heat sensor %variable is less than %number fahrenheit"
    //% variable.shadow=variables_get
    //% number.min=0 
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    //% shim=HeatSensor::heatSensorfahrenHeitValueIsLessThan
    function heatSensorfahrenHeitValueIsLessThan(variable: SamHeatSensor, number: number): any;

    //% blockId="get_heat_sensor_value_equals_celsius" block="value of heat sensor %variable equals %number celsius"
    //% variable.shadow=variables_get
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    //% shim=HeatSensor::heatSensorCelciusValueEquals
    function heatSensorCelciusValueEquals(variable: SamHeatSensor, number: number): any;

    //% blockId="get_heat_sensor_value_greater_celsius" block="value of heat sensor %variable is greater than %number celsius"
    //% variable.shadow=variables_get
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    //% shim=HeatSensor::heatSensorCelciusValueIsGreaterThan
    function heatSensorCelciusValueIsGreaterThan(variable: SamHeatSensor, number: number): any;

    //% blockId="get_heat_sensor_value_less_celcius" block="value of heat sensor %variable is less than %number celsius"
    //% variable.shadow=variables_get
    //% variable.defl="Heat Sensor1"
    //% color="#3455db"
    //% shim=HeatSensor::heatSensorCelciusValueIsLessThan
    function heatSensorCelciusValueIsLessThan(variable: SamHeatSensor, number: number): any;

    //% blockId="get_heat_sensor_color" block="get heat sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::getSamHeatSensorColor
    function getSamHeatSensorColor(variable: SamHeatSensor): any;

    //% blockId="set_heat_sensor_color" block="set heat sensor %variable  color to $value"
    //% variable.shadow=variables_get
    //% color.shadow=1
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::setSamHeatSensorColor
    function setSamHeatSensorColor(variable: SamHeatSensor, value: samLedColors): void;

    //% blockId="create_heat_sensor" block="Create new heat sensor"
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::createHeatSensor
    function createHeatSensor(): SamHeatSensor;

}
    /**
     * A Heat Sensor.
     */
    //%
    declare class SamHeatSensor {
    }
declare namespace LED {
    /**
     * Turn the LED with the given ID on
     * @param variable The  LED to turn on
     */
    //% blockId="turn_led_ff" block="turn LED $variable on"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color="#4169e1"
    //% shim=LED::turnLEDOn
    function turnLEDOn(variable: SamLED): void;

    /**
     * Turn the LED with the given ID on
     * @param variable The  LED to turn on
     */
    //% blockId="turn_led_on" block="turn LED $variable off"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color="#4169e1"
    //% shim=LED::turnLEDOff
    function turnLEDOff(variable: SamLED): void;

    /**
     * Set the color of the LED with the given ID
     * @param variable The LED to set the color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED $variable to $color"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color.shadow="1"
    //% color="#4169e1"
    //% shim=LED::setLEDColor
    function setLEDColor(variable: SamLED, color: samLedColors): void;

    /**
     * Set the body color of the LED with the given ID
     * @param variable The  LED to set the Body color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_body_color" block="set body color of LED %variable to $color"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color.shadow="1"
    //% color="#4169e1"
    //% shim=LED::setLEDBodyColor
    function setLEDBodyColor(variable: SamLED, color: samLedColors): void;

    /**
     * Change the brightness of the LED with the given ID
     * @param ledId The ID of the LED to change the brightness for
     * @param brightness The new brightness for the LED (0 to 100)
     */
    //% blockId="change_led_brightness" block="change brightness of LED with ID $ledId to $brightness"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% brightness.min=0 brightness.max=100
    //% color="#4169e1"
    //% shim=LED::changeLEDBrightness
    function changeLEDBrightness(variable: SamLED, brightness: number): void;

    /**
     * Get the brightness of the LED with the given ID
     * @param ledId The ID of the LED to get the brightness of
     */
    //% blockId="get_led_brightness" block="get brightness of LED $variable"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% color="#4169e1"
    //% shim=LED::getLEDBrightness
    function getLEDBrightness(variable: SamLED): number;

    /**
     * Get the brightness of the LED with the given ID
     * @param variable The LED to get the brightness of
     */
    //% blockId="get_led_color" block="get color of LED $variable"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% color="#4169e1"
    //% shim=LED::getLEDColor
    function getLEDColor(variable: SamLED): number;

    /**
     * Check if the LED with the given ID is on
     * @param ledId The ID of the LED to check if it's on
     */
    //% blockId="is_led_on" block="is LED $variable on"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% ledId.defl=0
    //% color="#4169e1"
    //% shim=LED::isLEDOn
    function isLEDOn(variable: SamLED): boolean;

    //% blockId="create_led" block="Create new LED"
    //% variable.defl="LED1"
    //% color="#4169e1"
    //% shim=LED::createLED
    function createLED(): SamLED;

}
    /**
     * A LED.
     */
    //%
    declare class SamLED {
    }
declare namespace LightSensor {
    //% blockId="get_light_sensor_value" block="value of light sensor %variable"
    //% variable.shadow=variables_get
    //% variable.defl="Light Sensor1"
    //% color="#FF5733"
    //% shim=LightSensor::getSamLightSensorValue
    function getSamLightSensorValue(variable: SamLightSensor): any;

    //% blockId="get_light_sensor_value_equals" block="value of light sensor %variable is equal to %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Light Sensor1"
    //% color="#FF5733"
    //% shim=LightSensor::lightSensorValueIsEqualTo
    function lightSensorValueIsEqualTo(variable: SamLightSensor, number: number): any;

    //% blockId="get_light_sensor_value_less" block="value of light sensor %variable is less than %number"
    //% variable.shadow=variables_get
    //% variable.defl="Light Sensor1"
    //% number.min=0 number.max=100
    //% color="#FF5733"
    //% shim=LightSensor::lightSensorValueIsLessThan
    function lightSensorValueIsLessThan(variable: SamLightSensor, number: number): any;

    //% blockId="get_light_sensor_value_greater" block="value of light sensor %variable is greater than %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Light Sensor1"
    //% color="#FF5733"
    //% shim=LightSensor::lightSensorValueIsGreaterThan
    function lightSensorValueIsGreaterThan(variable: SamLightSensor, number: number): any;

    //% blockId="get_light_sensor_color" block="get color of light sensor %variable"
    //% variable.shadow=variables_get
    //% variable.defl="Light Sensor1"
    //% color="#FF5733"
    //% shim=LightSensor::getSamLightSensorColor
    function getSamLightSensorColor(variable: SamLightSensor): any;

    //% blockId="set_light_sensor_color" block="set color of light sensor %variable to $value"
    //% variable.shadow=variables_get
    //% variable.defl="Light Sensor1"
    //% color.shadow="1"
    //% color="#FF5733"
    //% shim=LightSensor::setSamLightSensorColor
    function setSamLightSensorColor(variable: SamLightSensor, value: samLedColors): void;

    /**
     * Set the body color of the Light Sensor with the given ID
     * @param variable The  LED to set the Body color for
     * @param color The new color for the LED
     */
    //% blockId="create_light_sensor" block="Create new light sensor"
    //% variable.defl="Light Sensor1"
    //% color="#FF5733"
    //% shim=LightSensor::createLightSensor
    function createLightSensor(): SamLightSensor;

}
    /**
     * A Light Sensor.
     */
    //%
    declare class SamLightSensor {
    }
declare namespace PressureSensor {
    //% blockId="get_pressure_sensor_value" block="get pressure %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    //% shim=PressureSensor::getSamPressureSensorValue
    function getSamPressureSensorValue(variable: SamPressureSensor): any;

    //% blockId="get_pressure_sensor_value_equals" block="value of pressure sensor %variable is equal to %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    //% shim=PressureSensor::pressureSensorValueIsEqualTo
    function pressureSensorValueIsEqualTo(variable: SamPressureSensor, number: number): any;

    //% blockId="get_pressure_sensor_value_less" block="value of pressure sensor %variable is less than %number"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% number.min=0 number.max=100
    //% color=""#00aa00""
    //% shim=PressureSensor::pressureSensorValueIsLessThan
    function pressureSensorValueIsLessThan(variable: SamPressureSensor, number: number): any;

    //% blockId="get_pressure_sensor_value_greater" block="value of pressure sensor %variable is greater than %number"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% number.min=0 number.max=100
    //% color=""#00aa00""
    //% shim=PressureSensor::pressureSensorValueIsGreaterThan
    function pressureSensorValueIsGreaterThan(variable: SamPressureSensor, number: number): any;

    //% blockId="get_pressure_sensor_color" block="get pressure sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    //% shim=PressureSensor::getSamPressureSensorColor
    function getSamPressureSensorColor(variable: SamPressureSensor): any;

    //% blockId="set_pressure_sensor_color" block="set pressure sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    //% shim=PressureSensor::setSamPressureSensorColor
    function setSamPressureSensorColor(variable: SamPressureSensor, value: samLedColors): void;

    //% blockId="create_pressure_sensor" block="Create new pressure sensor"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    //% shim=PressureSensor::createPressureSensor
    function createPressureSensor(): SamPressureSensor;

}
    /**
     * A Pressure Sensor.
     */
    //%
    declare class SamPressureSensor {
    }
declare namespace ProximitySensor {
    //% blockId="get_proximity_sensor_value" block="get proximity sensor %variable value"
    //% variable.shadow=variables_get
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::getSamProximitySensorValue
    function getSamProximitySensorValue(variable: SamProximitySensor): any;

    //% blockId="get_proximity_sensor_value_equals" block="proximity sensor %variable value equals %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::sensorValueEquals
    function sensorValueEquals(variable: SamProximitySensor, number: number): any;

    //% blockId="get_proximity_sensor_value_less" block="proximity sensor %variable value is less than %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::sensorValueLessThan
    function sensorValueLessThan(variable: SamProximitySensor, number: number): any;

    //% blockId="get_proximity_sensor_value_more" block="proximity sensor %variable value is greater than %number"
    //% variable.shadow=variables_get
    //% number.min=0 number.max=100
    //% variable.defl="Proximity Sensor 1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::sensorValueMoreThan
    function sensorValueMoreThan(variable: SamProximitySensor, number: number): any;

    //% blockId="get_proximity_sensor_color" block="get proximity sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::getSamProximitySensorColor
    function getSamProximitySensorColor(variable: SamProximitySensor): any;

    //% blockId="set_proximity_sensor_color" block="set proximity sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% value.shadow="1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::setSamProximitySensorColor
    function setSamProximitySensorColor(variable: SamProximitySensor, value: samLedColors): void;

    //% blockId="create_proximity_sensor" block="Create new proximity sensor"
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::createProximitySensor
    function createProximitySensor(): SamProximitySensor;

}
    /**
     * A Proximity Sensor.
     */
    //%
    declare class SamProximitySensor {
    }
declare namespace ServoMotor {
    //% blockId="set_servo_motor_position" block="set servo motor %variable position to %value degrees"
    //% value.min=0 value.max=180
    //% variable.shadow=variables_get
    //% variable.defl="ServoMotor1"
    //% color="#ff69b4"
    //% shim=ServoMotor::setServoMotorPosition
    function setServoMotorPosition(variable: SamServoMotor, value: number): void;

    //% blockId="get_servo_motor_position" block="get servo motor %variable position"
    //% variable.shadow=variables_get
    //% variable.defl="ServoMotor1"
    //% color="#ff69b4"
    //% shim=ServoMotor::getServoMotorPosition
    function getServoMotorPosition(variable: SamServoMotor): any;

    //% blockId="set_servo_motor_color" block="set servo motor %variable color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="ServoMotor1"
    //% color="#ff69b4"
    //% shim=ServoMotor::setServoMotorColor
    function setServoMotorColor(variable: SamServoMotor, value: string): void;

    //% blockId="create_servo_motor" block="Create new servo motor"
    //% variable.defl="ServoMotor1"
    //% color="#ff69b4"
    //% shim=ServoMotor::createServoMotor
    function createServoMotor(): SamServoMotor;

}
    /**
     * A ServoMotor.
     */
    //%
    declare class SamServoMotor {
    }
declare namespace Slider {
    //% blockId="get_slider_value" block="get slider %variable value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider 1"
    //% color="#ff4500"
    //% shim=Slider::getSamSliderValue
    function getSamSliderValue(variable: SamSlider): number;

    //% blockId="get_slider_value_equals" block="is %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Slider 1"
    //% number.min=0 number.max=100
    //% color="#ff4500"
    //% shim=Slider::isSliderValueChanged
    function isSliderValueChanged(variable: SamSlider): boolean;

    //% blockId="set_slider_color" block="set slider %variable color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider 1"
    //% color="#ff4500"
    //% shim=Slider::setSamSliderColor
    function setSamSliderColor(variable: SamSlider, value: samLedColors): void;

    //% blockId="create_slider" block="Create new slider"
    //% variable.defl="Slider 1"
    //% color="#ff4500"
    //% shim=Slider::createSlider
    function createSlider(): SamSlider;

}
    /**
     * A Slider.
     */
    //%
    declare class SamSlider {
    }
declare namespace TiltSensor {
    //% blockId="set_tilt_sensor_border_color" block="set tilt sensor %variable color to $value"
    //% variable.shadow=variables_get
    //% value.shadow=1
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::setTiltSensorBorderColor
    function setTiltSensorBorderColor(variable: SamTiltSensor, value: samLedColors): void;

    //% blockId="is_tilt_sensor_tilted" block=" tilt sensor %variable is tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::isTiltSensorTilted
    function isTiltSensorTilted(variable: SamTiltSensor): boolean;

    //% blockId="tilt_sensor_not_tilted" block=" tilt sensor %variable is not tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::tiltSensorNotTilted
    function tiltSensorNotTilted(variable: SamTiltSensor): boolean;

    //% blockId="create_tilt_sensor" block="Create new tilt sensor"
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::createTiltSensor
    function createTiltSensor(): SamTiltSensor;

}
    /**
     * A Tilt Sensor.
     */
    //%
    declare class SamTiltSensor {
    }

// Auto-generated. Do not edit. Really.
