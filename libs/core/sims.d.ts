// Auto-generated from simulator. Do not edit.
declare namespace hare {
    /**
     * This is hop
     */
    //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
    //% hop.fieldEditor="gridpicker"
    //% shim=hare::hop
    function hop(hop: Hop, color: number): void;

    //% blockId=sampleOnLand block="on land"
    //% optionalVariableArgs
    //% shim=hare::onLand
    function onLand(handler: (height: number, more: number, most: number) => void): void;

}
declare namespace turtle {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% blockId=sampleForward block="forward %steps"
    //% shim=turtle::forwardAsync promise
    function forward(steps: number): void;

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    //% angle.min=-180 angle.max=180
    //% shim=turtle::turnAsync promise
    function turn(direction: Direction, angle: number): void;

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    //% shim=turtle::onBump
    function onBump(handler: () => void): void;

}
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

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
declare namespace sprites {
    /**
     * Creates a new sprite
     */
    //% blockId="sampleCreate" block="createSprite"
    //% shim=sprites::createSprite
    function createSprite(): Sprite;

}
declare namespace TiltSensor {
    /**
     * Creates a new ServoMotor
     */
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor 1"
    //% blockId="createTiltSensor" block="createTiltSensor"
    //% shim=TiltSensor::createProximitySensor
    function createProximitySensor(): SamTiltSensor;

}
declare namespace Microbit {
    //% blockId="on_microbit_display_word" block="on %variable display  $word"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% shim=Microbit::onMicrobitDisplayWord
    function onMicrobitDisplayWord(variable: BBCMicrobit, word: string): void;

    //% blockId="create_microbit" block="Create new Microbit"
    //% variable.defl="Microbit 1"
    //% group="Actions"
    //% shim=Microbit::createMicrobit
    function createMicrobit(): BBCMicrobit;

    //% blockId="when_button_pressed" block="when %variable button $buttonOption $velocityOption"
    //% variable.shadow=variables_get
    //% variable.defl="Microbit 1"
    //% group="Events"
    //% shim=Microbit::whenButtonPressed
    function whenButtonPressed(variable: BBCMicrobit, buttonOption: MicrobitButtonOptions, velocityOption: MicrobitButtonVelocity): void;

}
    /**
     * A Microbit.
     */
    //%
    declare class BBCMicrobit {
    }
declare namespace button {
    //% blockId="create_new_button" block="Create new Button"
    //% variable.defl="Button 1"
    //% advanced=true
    //% shim=button::createNewButton
    function createNewButton(): SamButton;

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
    //% advanced=true
    //% shim=button::onButtonPressed
    function onButtonPressed(variable: SamButton, handler: () => void): void;

    //% blockId="button_property_dropdown" block="%property"
    //% blockHidden=true
    //% property.fieldEditor="gridpicker" property.fieldOptions.columns=2
    //% weight=0
    //% shim=button::buttonPropertyDropdown
    function buttonPropertyDropdown(property: string): string;

    /**
     * Wait until the button with the given ID is pressed
     * @param buttonId The ID of the button to wait for
     */
    //% blockId="wait_until_button_pressed" block="wait until Button with ID $buttonId is pressed"
    //% buttonId.defl=0
    //% advanced=true
    //% shim=button::waitUntilButtonPressed
    function waitUntilButtonPressed(buttonId: number, handler: () => void): void;

    //% blockId="set_button_property" block="set %variable button property %prop to %value"
    //% variable.shadow=variables_get
    //% prop.shadow=button_property_dropdown
    //% weight=2
    //% shim=button::setButtonProperty
    function setButtonProperty(variable: SamButton, prop: string, value: any): void;

    /**
     * Get the state of the button with a given ID
     * @param buttonId The ID of the button to get the state of
     */
    //% blockId="get_button_state" block="get state of Button with ID $buttonId"
    //% buttonId.defl=0
    //% advanced=true
    //% shim=button::getButtonState
    function getButtonState(buttonId: number): boolean;

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
    //% blockId="set_buzzer_color" block="set color of Buzzer with ID $buzzerId to $color"
    //% variable.shadow=variables_get
    //% variable.defl="Buzzer 1"
    //% color.shadow="colorNumberPicker"
    //% color="#d400d4"
    //% shim=buzzer::setBuzzerColor
    function setBuzzerColor(variable: SamBuzzer, color: string): void;

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
    //% variable.defl="Motor 1"
    //% color="#32cd32"
    //% shim=DCMotor::setSamMotorSpeed
    function setSamMotorSpeed(variable: SamDCMotor, value: number): void;

    //% blockId="set_motor_color" block="stop motor %variable "
    //% variable.shadow=variables_get
    //% variable.defl="Motor 1"
    //% color="#32cd32"
    //% shim=DCMotor::stopMotor
    function stopMotor(variable: SamDCMotor): void;

    //% blockId="set_motor_color" block="set %variable motor color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Motor 1"
    //% color="#32cd32"
    //% shim=DCMotor::setSamMotorColor
    function setSamMotorColor(variable: SamDCMotor, value: string): void;

    //% blockId="get_motor_speed" block="get %variable motor speed"
    //% variable.shadow=variables_get
    //% variable.defl="Motor 1"
    //% shim=DCMotor::getSamMotorSpeed
    function getSamMotorSpeed(variable: SamDCMotor): any;

    //% blockId="get_motor_color" block="get %variable motor color"
    //% variable.shadow=variables_get
    //% variable.defl="Motor 1"
    // % prop.shadow=motor_property_dropdown
    //% shim=DCMotor::getSamMotorColor
    function getSamMotorColor(variable: SamDCMotor): any;

    //% blockId="create_motor" block="Create new motor"
    //% variable.defl="Motor 1"
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
    //% blockId="on_heat_sensor_value_changes" block="when heat sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#3455db"
    //% shim=HeatSensor::onHeatSensorValueChanges
    function onHeatSensorValueChanges(variable: SamHeatSensor, handler: () => void): void;

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

    //% blockId="get_heat_sensor_color" block="get heat sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::getSamHeatSensorColor
    function getSamHeatSensorColor(variable: SamHeatSensor): any;

    //% blockId="set_heat_sensor_color" block="set heat sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="HeatSensor1"
    //% color="#3455db"
    //% shim=HeatSensor::setSamHeatSensorColor
    function setSamHeatSensorColor(variable: SamHeatSensor, value: string): void;

    /**
     * Wait until the heat sensor value changes
     * @param sensorId The ID of the heat sensor to wait for
     */
    //% blockId="wait_until_heat_sensor_value_changes" block="wait until heat sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#3455db"
    //% shim=HeatSensor::waitUntilHeatSensorValueChanges
    function waitUntilHeatSensorValueChanges(variable: SamHeatSensor, handler: () => any): void;

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
    //% blockId="turn_led_on" block="turn LED $variable on"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color="#4169e1"
    //% shim=LED::turnLEDOn
    function turnLEDOn(variable: SamLED): void;

    /**
     * Set the color of the LED with the given ID
     * @param variable The LED to set the color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED $variable to  $color"
    //% variable.shadow=variables_get
    //% variable.defl="LED1"
    //% color.shadow="colorNumberPicker"
    //% color="#4169e1"
    //% shim=LED::setLEDColor
    function setLEDColor(variable: SamLED, color: string): void;

    /**
     * Set the body color of the LED with the given ID
     * @param variable The  LED to set the Body color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED $variable to  $color"
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% color.shadow="colorNumberPicker"
    //% color="#4169e1"
    //% shim=LED::setLEDBodyColor
    function setLEDBodyColor(variable: SamLED, color: string): void;

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
    //% blockId="on_light_sensor_value_changes" block="when light sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#FF5733"
    //% shim=LightSensor::onLightSensorValueChanges
    function onLightSensorValueChanges(variable: SamLightSensor, handler: () => void): void;

    //% blockId="get_light_sensor_value" block="get light %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    //% shim=LightSensor::getSamLightSensorValue
    function getSamLightSensorValue(variable: SamLightSensor): any;

    //% blockId="get_light_sensor_color" block="get light sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    //% shim=LightSensor::getSamLightSensorColor
    function getSamLightSensorColor(variable: SamLightSensor): any;

    //% blockId="set_light_sensor_color" block="set light sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor1"
    //% color="#FF5733"
    //% shim=LightSensor::setSamLightSensorColor
    function setSamLightSensorColor(variable: SamLightSensor, value: string): void;

    /**
     * Wait until the light sensor value changes
     * @param sensorId The ID of the light sensor to wait for
     */
    //% blockId="wait_until_light_sensor_value_changes" block="wait until light sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#FF5733"
    //% shim=LightSensor::waitUntilLightSensorValueChanges
    function waitUntilLightSensorValueChanges(variable: SamLightSensor, handler: () => any): void;

    //% blockId="create_light_sensor" block="Create new light sensor"
    //% variable.defl="LightSensor1"
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
    //% blockId="on_pressure_sensor_value_changes" block="when pressure sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#00aa00"
    //% shim=PressureSensor::onPressureSensorValueChanges
    function onPressureSensorValueChanges(variable: SamPressureSensor, handler: () => void): void;

    //% blockId="get_pressure_sensor_value" block="get pressure %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor1"
    //% color="#00aa00"
    //% shim=PressureSensor::getSamPressureSensorValue
    function getSamPressureSensorValue(variable: SamPressureSensor): any;

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
    function setSamPressureSensorColor(variable: SamPressureSensor, value: string): void;

    /**
     * Wait until the pressure sensor value changes
     * @param sensorId The ID of the pressure sensor to wait for
     */
    //% blockId="wait_until_pressure_sensor_value_changes" block="wait until pressure sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#00aa00"
    //% shim=PressureSensor::waitUntilPressureSensorValueChanges
    function waitUntilPressureSensorValueChanges(variable: SamPressureSensor, handler: () => any): void;

    //% blockId="create_pressure_sensor" block="Create new pressure sensor"
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
    //% blockId="on_proximity_sensor_value_changes" block="when proximity sensor $variable value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#1e90ff"
    //% shim=ProximitySensor::onProximitySensorValueChanges
    function onProximitySensorValueChanges(variable: SamProximitySensor, handler: () => void): void;

    //% blockId="get_proximity_sensor_value" block="get proximity %variable sensor value"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::getSamProximitySensorValue
    function getSamProximitySensorValue(variable: SamProximitySensor): any;

    //% blockId="get_proximity_sensor_color" block="get proximity sensor %variable  color"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::getSamProximitySensorColor
    function getSamProximitySensorColor(variable: SamProximitySensor): any;

    //% blockId="set_proximity_sensor_color" block="set proximity sensor %variable  color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor1"
    //% color="#1e90ff"
    //% shim=ProximitySensor::setSamProximitySensorColor
    function setSamProximitySensorColor(variable: SamProximitySensor, value: string): void;

    /**
     * Wait until the proximity sensor value changes
     * @param sensorId The ID of the proximity sensor to wait for
     */
    //% blockId="wait_until_proximity_sensor_value_changes" block="wait until proximity sensor $variable value changes"
    //% variable.shadow=variables_get
    //% sensorId.defl=0
    //% color="#1e90ff"
    //% shim=ProximitySensor::waitUntilProximitySensorValueChanges
    function waitUntilProximitySensorValueChanges(variable: SamProximitySensor, handler: () => any): void;

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
    //% blockId="set_servo_motor_position" block="set servo motor %variable position to %value"
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
    //% blockId="on_slider_value_changes" block="when slider %variable value changes"
    //% variable.shadow=variables_get
    //% variable.defl="Slider1"
    //% color="#ff69b4"
    //% shim=Slider::onSliderValueChanges
    function onSliderValueChanges(variable: SamSlider, handler: () => void): void;

    //% blockId="get_slider_value" block="get slider %variable value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider1"
    //% color="#ff69b4"
    //% shim=Slider::getSamSliderValue
    function getSamSliderValue(variable: SamSlider): any;

    //% blockId="set_slider_color" block="set slider %variable color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="Slider1"
    //% color="#ff69b4"
    //% shim=Slider::setSamSliderColor
    function setSamSliderColor(variable: SamSlider, value: string): void;

    //% blockId="create_slider" block="Create new slider"
    //% variable.defl="Slider1"
    //% color="#ff69b4"
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
    //% blockId="on_tilt_sensor_tilted" block="when tilt sensor %variable is tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::onTiltSensorTilted
    function onTiltSensorTilted(variable: SamTiltSensor, handler: () => void): void;

    //% blockId="wait_until_tilt_sensor_tilted" block="wait until tilt sensor %variable is tilted"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::waitUntilTiltSensorTilted
    function waitUntilTiltSensorTilted(variable: SamTiltSensor, handler: () => void): void;

    //% blockId="set_tilt_sensor_border_color" block="set tilt sensor %variable border color to %value"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::setTiltSensorBorderColor
    function setTiltSensorBorderColor(variable: SamTiltSensor, value: string): void;

    //% blockId="is_tilt_sensor_tilted" block="is tilt sensor %variable tilted?"
    //% variable.shadow=variables_get
    //% variable.defl="TiltSensor1"
    //% color="#9400d3"
    //% shim=TiltSensor::isTiltSensorTilted
    function isTiltSensorTilted(variable: SamTiltSensor): boolean;

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
