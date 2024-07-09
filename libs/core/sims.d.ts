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
    function log(msg: string, testString?: string): void;

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
    /**
     * General.
     */
    //%
    declare class samGeneral {
    }
declare namespace general {
    //% blockId="on_prompt_input_display" block="Prompt for text with message $word"
    //% shim=general::onPromptInputDisplayAsync promise
    function onPromptInputDisplay(word: string): string;

    //% blockId="on_prompt_input_number_display" block="Prompt for number with message $numPrompt"
    //% shim=general::onPromptInputNumberDisplayAsync promise
    function onPromptInputNumberDisplay(numPrompt: string): number;

    //% block="on_print_input" block="Print $printValue"
    //% shim=general::onPrintInput
    function onPrintInput(printValue: any): void;

}
declare namespace Microbit {
    //:TODO: This block is Correct but since Microbit pins functionality not finalized, it is commented out
    // //% blockId="write_digital_pin" block="on %variable V2 write digital pin $pinId value $value"
    // //% variable.shadow=variables_get
    // //% variable.defl="Microbit_1"
    // //% group="Actions"
    // export function writeDigitalPin(
    //   variable: pxsim.BBCMicrobit,
    //   pinId: MicrobitPinOptions,
    //   value: number
    // ): void {
    //   variable.writeDigitalPin(pinId, value);
    // }
    //% blockId="cleaar_led" block="clear %variable LEDs"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Actions"
    //% shim=Microbit::clearLED
    function clearLED(variable: BBCMicrobit): void;

    //% blockId="on_microbit_toggle" block="on %variable toggle X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Actions"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% shim=Microbit::onMicrobitToggle
    function onMicrobitToggle(variable: BBCMicrobit, x: number, y: number): void;

    //% blockId="on_microbit_unplot" block="on %variable unplot X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Actions"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% shim=Microbit::onMicrobitUnPlot
    function onMicrobitUnPlot(variable: BBCMicrobit, x: number, y: number): void;

    //% blockId="on_microbit_plot" block="on %variable plot X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Actions"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% shim=Microbit::onMicrobitPlot
    function onMicrobitPlot(variable: BBCMicrobit, x: number, y: number): void;

    //% blockId="on_microbit_display_word" block="on %variable display  $word"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Actions"
    //% shim=Microbit::onMicrobitDisplayWord
    function onMicrobitDisplayWord(variable: BBCMicrobit, word: string): void;

    //% blockId="shape_conv" block="$shapes"
    //% blockHidden=true
    //% shim=Microbit::shapeConversion
    function shapeConversion(shapes: MicrobitLEDShapes): string;

    //% blockId="on_microbit_display_shape" block="on %variable display $shape"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% shape.shadow=shape_conv
    //% group="Actions"
    //% shim=Microbit::onMicrobitDisplayShape
    function onMicrobitDisplayShape(variable: BBCMicrobit, shape: string): void;

    //% blockId="create_microbit" block="Create new Microbit"
    //% variable.defl="Microbit_1"
    //% group="Actions"
    //% shim=Microbit::createMicrobit
    function createMicrobit(): BBCMicrobit;

    //:TODO: This block is Correct but since Microbit pins functionality not finalized, it is commented out
    // //% blockId="get_microbit_v2_analog_pin" block="get %variable V2 analog pin $pin value"
    // //% variable.shadow=variables_get
    // //% variable.defl="Microbit_1"
    // //% group="Values"
    // export function getMicrobitAnalogPin(
    //   variable: pxsim.BBCMicrobit,
    //   pin: MicrobitAnalogPinOptions
    // ): number {
    //   return variable.getMicrobitAnalogPin(pin);
    // }
    // //% blockId="get_microbit_v2_digital_pin" block="get %variable V2 digital pin $pin value"
    // //% variable.shadow=variables_get
    // //% variable.defl="Microbit_1"
    // //% group="Values"
    // export function getMicrobitDigitalPin(
    //   variable: pxsim.BBCMicrobit,
    //   pin: MicrobitPinOptions
    // ): number {
    //   return variable.getMicrobitDigitalPin(pin);
    // }
    //% blockId="get_microbit_Accelerometer_axis_values" block="get %variable $AccelerometerAxisOptions acceleration"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Values"
    //% shim=Microbit::getMicrobitAccelerometerValues
    function getMicrobitAccelerometerValues(variable: BBCMicrobit, AccelerometerAxisOptions: MicrobitAccelerometerAxisOptions): number;

    //% blockId="get_microbit_Temperature" block="get %variable temperature"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Values"
    //% shim=Microbit::getMicrobitTemperature
    function getMicrobitTemperature(variable: BBCMicrobit): number;

    //% blockId="microbit_led_on" block="is %variable LED on X: $x Y: $y"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% x.min=-0 x.max=4
    //% y.min=-0 y.max=4
    //% group="Values"
    //% shim=Microbit::isMicrobitLedOn
    function isMicrobitLedOn(variable: BBCMicrobit, x: number, y: number): boolean;

    //:TODO: This block is Correct but since Microbit pins functionality not finalized, it is commented out
    // //% blockId="microbit_pin_pressed" block="is %variable V2 $analogPinOption pressed"
    // //% variable.shadow=variables_get
    // //% variable.defl="Microbit_1"
    // //% group="Values"
    // export function isMicrobitPinPressed(
    //   variable: pxsim.BBCMicrobit,
    //   analogPinOption: MicrobitAnalogPinOptions
    // ): boolean {
    //   return variable.isMicrobitPinPressed(analogPinOption);
    // }
    //% blockId="microbit_temperature_changed" block="is %variable temperature changed"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
    //% group="Values"
    //% shim=Microbit::isMicrobitTemperatureChanged
    function isMicrobitTemperatureChanged(variable: BBCMicrobit): boolean;

    //% blockId="microbit_button_pressed" block="is %variable button $buttonOption pressed"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit_1"
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
    //% blockId="set_button_color" block="Set Button $variable color to %color"
    //% variable.shadow=variables_get
    //% variable.defl="Button_1"
    //% color.shadow="1" //% weight=2
    //% shim=button::setButtonColor
    function setButtonColor(variable: SamButton, color: samLedColors): void;

    //% blockId="get_is_pressed" block="$variable is pressed"
    //% variable.shadow=variables_get
    //% variable.defl="Button_1"  //% weight=2
    //% shim=button::buttonIsPressed
    function buttonIsPressed(variable: SamButton): boolean;

    //% blockId="create_button" block="Create new button"
    //% variable.shadow=variables_get
    //% variable.defl="Button_1"  //% weight=2
    //% shim=button::createNewButton
    function createNewButton(): SamButton;

}
    /**
     * A Button.
     */
    //%
    declare class SamButton {
    }
declare namespace buzzer {
    //% blockId="get_buzzer_volume_pitch" block="get Buzzer %variable pitch"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
    //% color="#d400d4"
    //% shim=buzzer::getBuzzerPitch
    function getBuzzerPitch(variable: SamBuzzer): number;

    //% blockId="get_buzzer_volume_value" block="get Buzzer %variable volume"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
    //% color="#d400d4"
    //% shim=buzzer::getBuzzerVolume
    function getBuzzerVolume(variable: SamBuzzer): number;

    /**
     * Set the volume of the buzzer with the given ID
     * @param variable The buzzer instance to set the volume for
     * @param volume The new volume for the buzzer (0-100)
     */
    //% blockId="set_buzzer_volume" block="Set Buzzer $variable volume to $volume"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
    //% volume.min=0 volume.max=100
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerVolume
    function setBuzzerVolume(variable: SamBuzzer, volume: number): void;

    /**
     * Set the pitch of the buzzer with the given ID
     * @param buzzerId The ID of the buzzer to set the pitch for
     * @param pitch The new pitch for the buzzer (in Hz)
     */
    //% blockId="set_buzzer_pitch" block="Set Buzzer $variable pitch to $pitch Hz"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
    //% volume.min=0 volume.max=100
    //% pitch.min=20 pitch.max=2500
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerPitch
    function setBuzzerPitch(variable: SamBuzzer, pitch: number): void;

    /**
     * Clear the buzzer with the given ID by setting its volume and pitch to zero
     * @param variable The buzzer instance to clear
     */
    //% blockId="clear_buzzer" block="clear Buzzer $variable"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
    //% color="#d400d4"
    //% shim=buzzer::clearBuzzer
    function clearBuzzer(variable: SamBuzzer): void;

    /**
     * Set the color of the buzzer with the given ID
     * @param buzzerId The ID of the buzzer to set the color for
     * @param color The new color for the buzzer
     */
    //% blockId="set_buzzer_color" block="Set Buzzer $variable color to $color"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
    //% color.shadow="colorNumberPicker"
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerColor
    function setBuzzerColor(variable: SamBuzzer, color: samLedColors): void;

    //% blockId="createBuzzer" block="Create new Buzzer"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer_1"
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
    //% variable.defl="DCMotor_1"
    //% color="#32cd32"
    //% shim=DCMotor::setSamMotorSpeed
    function setSamMotorSpeed(variable: SamDCMotor, value: number): void;

    //% blockId="stop_motor" block="stop motor %variable "
    //% variable.shadow=variables_get
    //% variable.defl="DCMotor_1"
    //% color="#32cd32"
    //% shim=DCMotor::stopMotor
    function stopMotor(variable: SamDCMotor): void;

    //% blockId="set_motor_color" block="set %variable color to %color"
    //% variable.shadow=variables_get
    //% variable.defl="DCMotor_1"
    //% color.shadow="1"
    //% color="#32cd32"
    //% shim=DCMotor::setSamMotorColor
    function setSamMotorColor(variable: SamDCMotor, value: samLedColors): void;

    //% blockId="create_motor" block="Create new motor"
    //% variable.defl="DCMotor_1"
    //% color.shadow="1"
    //% color="#32cd32"
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
    //% variable.defl="Heat_Sensor_1"
    //% color="#3455db"
    //% shim=HeatSensor::getSamHeatSensorValueCelsius
    function getSamHeatSensorValueCelsius(variable: SamHeatSensor): any;

    //% blockId="get_heat_sensor_value_fahrenheit" block="get heat sensor  %variable value in Fahrenheit"
    //% variable.shadow=variables_get
    //% variable.defl="Heat_Sensor_1"
    //% color="#3455db"
    //% shim=HeatSensor::getSamHeatSensorValueFahrenheit
    function getSamHeatSensorValueFahrenheit(variable: SamHeatSensor): any;

    //% blockId="heat_sensor_value_change" block="is %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Heat_Sensor_1"
    //% color="#3455db"
    //% shim=HeatSensor::isSamHeatSensorValueChanged
    function isSamHeatSensorValueChanged(variable: SamHeatSensor): boolean;

    //% blockId="create_heat_sensor" block="Create new heat sensor"
    //% variable.defl="Heat_Sensor_1"
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
declare namespace RGB_LED {
    /**
     * Turn the LED with the given ID off
     * @param variable The  LED to turn on
     */
    //% blockId="turn_led_on" block="turn $variable LED off"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% color="#4169e1"
    //% shim=RGB_LED::turnLEDOff
    function turnLEDOff(variable: SamLED): void;

    /**
     * Set the color of the LED with the given ID
     * @param variable The LED to set the color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED %variable to %color"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% color.shadow="1"
    //% color="#4169e1"
    //% shim=RGB_LED::setLEDColor
    function setLEDColor(variable: SamLED, color: samLedColors): void;

    /**
     * Set the body color of the LED with the given ID
     * @param variable The  LED to set the Body color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_body_color" block="set body color of %variable to %color"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% color.shadow="1"
    //% color="#4169e1"
    //% shim=RGB_LED::setLEDBodyColor
    function setLEDBodyColor(variable: SamLED, color: samLedColors): void;

    /**
     * Change the brightness of the LED with the given ID
     * @param ledId The ID of the LED to change the brightness for
     * @param brightness The new brightness for the LED (0 to 100)
     */
    //% blockId="change_led_brightness" block="change LED brightness of %variable to $brightness"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% brightness.min=0 brightness.max=100
    //% color="#4169e1"
    //% shim=RGB_LED::changeLEDBrightness
    function changeLEDBrightness(variable: SamLED, brightness: number): void;

    /**
     * Get the brightness of the LED with the given ID
     * @param ledId The ID of the LED to get the brightness of
     */
    //% blockId="get_led_brightness" block="get $variable LED brightness"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% color="#4169e1"
    //% shim=RGB_LED::getLEDBrightness
    function getLEDBrightness(variable: SamLED): number;

    /**
     * Get the brightness of the LED with the given ID
     * @param variable The LED to get the brightness of
     */
    //% blockId="get_led_color" block="get $variable LED color"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% color="#4169e1"
    //% shim=RGB_LED::getLEDColor
    function getLEDColor(variable: SamLED): number;

    /**
     * Check if the LED with the given ID is on
     * @param ledId The ID of the LED to check if it's on
     */
    //% blockId="is_led_on" block="is $variable LED on"
    //% variable.shadow=variables_get
    //% variable.defl="RGB_LED_1"
    //% ledId.defl=0
    //% color="#4169e1"
    //% shim=RGB_LED::isLEDOn
    function isLEDOn(variable: SamLED): boolean;

    //% blockId="create_led" block="Create new RGB Light"
    //% variable.defl="RGB_LED_1"
    //% color="#4169e1"
    //% shim=RGB_LED::createLED
    function createLED(): SamLED;

}
    /**
     * A LED.
     */
    //%
    declare class SamLED {
    }
declare namespace LightSensor {
    //% blockId="get_light_sensor_value" block="get %variable value "
    //% variable.shadow=variables_get
    //% variable.defl="Light_Sensor_1"
    //% color="#FF5733"
    //% shim=LightSensor::getSamLightSensorValue
    function getSamLightSensorValue(variable: SamLightSensor): number;

    //% blockId="get_light_sensor_color" block="is %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Light_Sensor_1"
    //% color="#FF5733"
    //% shim=LightSensor::isSamLightSensorValueChanged
    function isSamLightSensorValueChanged(variable: SamLightSensor): boolean;

    //% blockId="set_light_sensor_color" block="set color of light sensor %variable to $value"
    //% variable.shadow=variables_get
    //% variable.defl="Light_Sensor_1"
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
    //% variable.defl="Light_Sensor_1"
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
    //% variable.defl="Pressure_Sensor_1"
    //% color="#00aa00"
    //% shim=PressureSensor::getSamPressureSensorValue
    function getSamPressureSensorValue(variable: SamPressureSensor): any;

    //% blockId="pressure_sensor_value_change" block="is %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Pressure_Sensor_1"
    //% color="#00aa00"
    //% shim=PressureSensor::isSamPressureSensorValueChanged
    function isSamPressureSensorValueChanged(variable: SamPressureSensor): boolean;

    //% blockId="set_pressure_sensor_color" block="set pressure sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Pressure_Sensor_1"
    //% color="#00aa00"
    //% shim=PressureSensor::setSamPressureSensorColor
    function setSamPressureSensorColor(variable: SamPressureSensor, value: samLedColors): void;

    //% blockId="create_pressure_sensor" block="Create new pressure sensor"
    //% variable.shadow=variables_get
    //% variable.defl="Pressure_Sensor_1"
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
    //% variable.defl="Proximity_Sensor_1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::getSamProximitySensorValue
    function getSamProximitySensorValue(variable: SamProximitySensor): any;

    //% blockId="proximity_sensor_value_change" block="is %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Proximity_Sensor_1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::isSamProximitySensorValueChanged
    function isSamProximitySensorValueChanged(variable: SamProximitySensor): boolean;

    //% blockId="set_proximity_sensor_color" block="set proximity sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Proximity_Sensor_1"
    //% value.shadow="1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::setSamProximitySensorColor
    function setSamProximitySensorColor(variable: SamProximitySensor, value: samLedColors): void;

    //% blockId="create_proximity_sensor" block="Create new proximity sensor"
    //% variable.defl="Proximity_Sensor_1"
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
    //% blockId="set_servo_motor_position" block="Set servo motor %variable position to %value degrees"
    //% value.min=0 value.max=180
    //% variable.shadow=variables_get
    //% variable.defl="Servo_Motor_1"
    //% color="#ff69b4"
    //% shim=ServoMotor::setServoMotorPosition
    function setServoMotorPosition(variable: SamServoMotor, value: number): void;

    //% blockId="get_servo_motor_position" block="Get servo motor %variable position"
    //% variable.shadow=variables_get
    //% variable.defl="Servo_Motor_1"
    //% color="#ff69b4"
    //% shim=ServoMotor::getServoMotorPosition
    function getServoMotorPosition(variable: SamServoMotor): number;

    //% blockId="set_servo_motor_color" block="Set servo motor %variable color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Servo_Motor_1"
    //% color="#ff69b4"
    //% shim=ServoMotor::setServoMotorColor
    function setServoMotorColor(variable: SamServoMotor, value: samLedColors): void;

    //% blockId="create_servo_motor" block="Create new servo motor"
    //% variable.defl="Servo_Motor_1"
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
    //% variable.defl="Slider_1"
    //% color="#ff4500"
    //% shim=Slider::getSamSliderValue
    function getSamSliderValue(variable: SamSlider): number;

    //% blockId="get_slider_value_equals" block="is %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Slider_1"
    //% number.min=0 number.max=100
    //% color="#ff4500"
    //% shim=Slider::isSliderValueChanged
    function isSliderValueChanged(variable: SamSlider): boolean;

    //% blockId="set_slider_color" block="set slider %variable color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider_1"
    //% color="#ff4500"
    //% shim=Slider::setSamSliderColor
    function setSamSliderColor(variable: SamSlider, value: samLedColors): void;

    //% blockId="create_slider" block="Create new slider"
    //% variable.defl="Slider_1"
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
    //% blockId="set_tilt_color" block="Set Tilt Sensor %variable color to $color"
    //% variable.shadow=variables_get
    //% value.shadow=1
    //% variable.defl="Tilt_Sensor_1"
    //% color="#9400d3"
    //% shim=TiltSensor::setTiltColor
    function setTiltColor(variable: SamTiltSensor, color: samLedColors): void;

    //% blockId="is_tilt_sensor_tilted" block="Is Tilt Sensor  %variable  tilted"
    //% variable.shadow=variables_get
    //% variable.defl="Tilt_Sensor_1"
    //% color="#9400d3"
    //% shim=TiltSensor::IsTiltTilted
    function IsTiltTilted(variable: SamTiltSensor): boolean;

    //% blockId="tilt_sensor_not_tilted" block="Is Tilt Sensor %variable value changed"
    //% variable.shadow=variables_get
    //% variable.defl="Tilt_Sensor_1"
    //% color="#9400d3"
    //% shim=TiltSensor::IsTiltValueChanged
    function IsTiltValueChanged(variable: SamTiltSensor): boolean;

    //% blockId="create_tilt_sensor" block="Create new Tilt Sensor"
    //% variable.defl="Tilt_Sensor_1"
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
