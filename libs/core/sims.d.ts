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
    /**
     * A Button.
     */
    //%
    declare class SamButton {
    }
    /**
     * A Buzzer.
     */
    //%
    declare class SamBuzzer {
    }
    /**
     * An LED.
     */
    //%
    declare class SamLed {
    }
    /**
     * An LED.
     */
    //%
    declare class SamServo {
    }
    /**
     * A DC Motor.
     */
    //%
    declare class SamDCMotor {
    }
    /**
     * A Heat Sensor.
     */
    //%
    declare class SamHeatSensor {
    }
    /**
     * A Light Sensor.
     */
    //%
    declare class SamLightSensor {
    }
    /**
     * A Heat Sensor.
     */
    //%
    declare class SamPressureSensor {
    }
    /**
     * A Proximity Sensor.
     */
    //%
    declare class SamProximitySensor {
    }
    /**
     * A Slider component.
     */
    //%
    declare class SamSlider {
    }
    /**
     * A Tilt Sensor.
     */
    //%
    declare class SamTiltSensor {
    }
declare namespace sprites {
    /**
     * Creates a new sprite
     */
    //% blockId="sampleCreate" block="createSprite"
    //% shim=sprites::createSprite
    function createSprite(): Sprite;

}
declare namespace button {
    /**
     * Creates a new Button
     */
    //% variable.shadow=variables_get
    //% variable.defl="Button 1"
    //% blockId="createButton" block="createButton"
    //% shim=button::createButton
    function createButton(): SamButton;

}
declare namespace buzzer {
    /**
     * Creates a new Buzzer
     */
    //% blockId="createBuzzer" block="createBuzzer"
    //% shim=buzzer::createBuzzer
    function createBuzzer(): SamBuzzer;

}
declare namespace DCMotor {
    /**
     * Creates a new DCMotor
     */
    //% variable.shadow=variables_get
    //% variable.defl="DCMotor 1"
    //% blockId="createDCMotor" block="createDCMotor"
    //% shim=DCMotor::createDCMotor
    function createDCMotor(): SamDCMotor;

}
declare namespace HeatSensor {
    /**
     * Creates a new Heat Sensor
     */
    //% variable.shadow=variables_get
    //% variable.defl="HeatSensor 1"
    //% blockId="createHeatSensor" block="createHeatSensor"
    //% shim=HeatSensor::createHeatSensor
    function createHeatSensor(): SamHeatSensor;

}
declare namespace LightSensor {
    /**
     * Creates a new Pressur Sensor
     */
    //% variable.shadow=variables_get
    //% variable.defl="LightSensor 1"
    //% blockId="createLightSensor" block="createLighttSensor"
    //% shim=LightSensor::createLightSensor
    function createLightSensor(): SamLightSensor;

}
declare namespace PressureSensor {
    /**
     * Creates a new Pressure Sensor
     */
    //% variable.shadow=variables_get
    //% variable.defl="PressureSensor 1"
    //% blockId="createPressureSensor" block="createPressureSensor"
    //% shim=PressureSensor::createPressureSensor
    function createPressureSensor(): SamPressureSensor;

}
declare namespace ProximitySensor {
    /**
     * Creates a new Proximity Sensor
     */
    //% variable.shadow=variables_get
    //% variable.defl="ProximitySensor 1"
    //% blockId="createProximitySensor" block="createPressuretSensor"
    //% shim=ProximitySensor::createProximitySensor
    function createProximitySensor(): SamProximitySensor;

}
declare namespace ServoMotor {
    /**
     * Creates a new ServoMotor
     */
    //% variable.shadow=variables_get
    //% variable.defl="ServoMotor 1"
    //% blockId="createServoMotor" block="createServoMotor"
    //% shim=ServoMotor::createServoMotor
    function createServoMotor(): SamServo;

}
declare namespace Slider {
    /**
     * Creates a new ServoMotor
     */
    //% variable.shadow=variables_get
    //% variable.defl="Slider 1"
    //% blockId="createSlider" block="createSlider"
    //% shim=Slider::createSlider
    function createSlider(): SamSlider;

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
declare namespace LED {
    /**
     * Creates a new RGB LED
     */
    //% variable.shadow=variables_get
    //% variable.defl="LED 1"
    //% blockId="createLED" block="createLED"
    //% shim=LED::createLED
    function createLED(): SamLed;

}
declare namespace button {
    /**
     * Registers a handler that runs when the button with the given ID is pressed
     * @param buttonId The ID of the button to listen for
     * @param handler The function to run when the button is pressed
     */
    //% blockId="on_button_pressed" block="when Button with ID $buttonId is pressed"
    //% buttonId.defl=0
    //% weight=1 icon="\uf11b"
    //% shim=button::onButtonPressed
    function onButtonPressed(buttonId: string | number, handler: () => void): void;

    /**
     * Wait until the button with the given ID is pressed
     * @param buttonId The ID of the button to wait for
     */
    //% blockId="wait_until_button_pressed" block="wait until Button with ID $buttonId is pressed"
    //% buttonId.defl=0
    //% advanced=true
    //% shim=button::waitUntilButtonPressed
    function waitUntilButtonPressed(buttonId: number, handler: () => void): void;

    /**
     * Set the color of the button
     * @param buttonId The ID of the button to change color
     * @param color The new color for the button
     */
    //% blockId="set_button_color" block="set color of Button with ID $buttonId to $color"
    //% buttonId.defl=0
    //% color.shadow="colorNumberPicker"
    //% advanced=true
    //% shim=button::setButtonColor
    function setButtonColor(buttonId: number, color: string): void;

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

}
declare namespace DCMotor {
    /**
     * Set the speed of the DC motor with the given ID
     * @param motorId The ID of the DC motor to set the speed for
     * @param speed The new speed for the DC motor (-100 to 100)
     */
    //% blockId="set_dc_motor_speed" block="set speed of DC Motor with ID $motorId to $speed"
    //% motorId.defl=0
    //% speed.min=-100 speed.max=100
    //% color="#32cd32"
    //% shim=DCMotor::setDCMotorSpeed
    function setDCMotorSpeed(motorId: number, speed: number): void;

    /**
     * Set the color of the DC motor with the given ID
     * @param motorId The ID of the DC motor to set the color for
     * @param color The new color for the DC motor
     */
    //% blockId="set_dc_motor_color" block="set color of DC Motor with ID $motorId to $color"
    //% motorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#32cd32"
    //% shim=DCMotor::setDCMotorColor
    function setDCMotorColor(motorId: number, color: string): void;

    /**
     * Get the speed of the DC motor with the given ID
     * @param motorId The ID of the DC motor to get the speed of
     */
    //% blockId="get_dc_motor_speed" block="get speed of DC Motor with ID $motorId"
    //% motorId.defl=0
    //% color="#32cd32"
    //% shim=DCMotor::getDCMotorSpeed
    function getDCMotorSpeed(motorId: number): number;

}
declare namespace HeatSensor {
    /**
     * Wait until the heat sensor value changes
     * @param sensorId The ID of the heat sensor to wait for
     */
    //% blockId="wait_until_heat_sensor_value_changes" block="wait until heat sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#3455db"
    //% shim=HeatSensor::waitUntilHeatSensorValueChanges
    function waitUntilHeatSensorValueChanges(sensorId: number): void;

    /**
     * Register an event handler to run when the heat sensor value changes
     * @param sensorId The ID of the heat sensor to listen for
     * @param handler The function to run when the heat sensor value changes
     */
    //% blockId="on_heat_sensor_value_changes" block="when heat sensor with ID $sensorId value changes"
    //% variable.shadow=variables_get
    //% buttonId.defl=0
    //% sensorId.defl=0
    //% color="#3455db"
    //% shim=HeatSensor::onHeatSensorValueChanges
    function onHeatSensorValueChanges(sensorId: number, handler: () => void): void;

    /**
     * Get the value of the heat sensor with a given ID in Celsius
     * @param sensorId The ID of the heat sensor to get the value of
     */
    //% blockId="get_heat_sensor_value_celsius" block="get value of heat sensor with ID $sensorId in Celsius"
    //% sensorId.defl=0
    //% color="#3455db"
    //% shim=HeatSensor::getHeatSensorValueCelsius
    function getHeatSensorValueCelsius(sensorId: number): number;

    /**
     * Get the value of the heat sensor with a given ID in Fahrenheit
     * @param sensorId The ID of the heat sensor to get the value of
     */
    //% blockId="get_heat_sensor_value_fahrenheit" block="get value of heat sensor with ID $sensorId in Fahrenheit"
    //% sensorId.defl=0
    //% color="#3455db"
    //% shim=HeatSensor::getHeatSensorValueFahrenheit
    function getHeatSensorValueFahrenheit(sensorId: number): number;

    /**
     * Set the border color of the heat sensor
     * @param sensorId The ID of the heat sensor to change the border color
     * @param color The new border color for the heat sensor
     */
    //% blockId="set_heat_sensor_border_color" block="set border color of heat sensor with ID $sensorId to $color"
    //% sensorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#3455db"
    //% shim=HeatSensor::setHeatSensorBorderColor
    function setHeatSensorBorderColor(sensorId: number, color: string): void;

}
declare namespace LED {
    /**
     * Turn the LED with the given ID on
     * @param ledId The ID of the LED to turn on
     */
    //% blockId="turn_led_on" block="turn LED with ID $ledId on"
    //% ledId.defl=0
    //% color="#4169e1"
    //% shim=LED::turnLEDOn
    function turnLEDOn(ledId: number): void;

    /**
     * Change the color of the LED with the given ID
     * @param ledId The ID of the LED to change the color for
     * @param color The new color for the LED
     */
    //% blockId="change_led_color" block="change color of LED with ID $ledId to $color"
    //% ledId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#4169e1"
    //% shim=LED::changeLEDColor
    function changeLEDColor(ledId: number, color: string): void;

    /**
     * Change the brightness of the LED with the given ID
     * @param ledId The ID of the LED to change the brightness for
     * @param brightness The new brightness for the LED (0 to 100)
     */
    //% blockId="change_led_brightness" block="change brightness of LED with ID $ledId to $brightness"
    //% ledId.defl=0
    //% brightness.min=0 brightness.max=100
    //% color="#4169e1"
    //% shim=LED::changeLEDBrightness
    function changeLEDBrightness(ledId: number, brightness: number): void;

    /**
     * Set the color of the LED with the given ID
     * @param ledId The ID of the LED to set the color for
     * @param color The new color for the LED
     */
    //% blockId="set_led_color" block="set color of LED with ID $ledId to $color"
    //% ledId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#4169e1"
    //% shim=LED::setLEDColor
    function setLEDColor(ledId: number, color: string): void;

    /**
     * Set the border color of the LED with the given ID
     * @param ledId The ID of the LED to set the border color for
     * @param borderColor The new border color for the LED
     */
    //% blockId="set_led_border_color" block="set border color of LED with ID $ledId to $borderColor"
    //% ledId.defl=0
    //% borderColor.shadow="colorNumberPicker"
    //% color="#4169e1"
    //% shim=LED::setLEDBlockColor
    function setLEDBlockColor(ledId: number, borderColor: string): void;

    /**
     * Get the brightness of the LED with the given ID
     * @param ledId The ID of the LED to get the brightness of
     */
    //% blockId="get_led_brightness" block="get brightness of LED with ID $ledId"
    //% ledId.defl=0
    //% color="#4169e1"
    //% shim=LED::getLEDBrightness
    function getLEDBrightness(ledId: number): number;

    /**
     * Get the color of the LED with the given ID
     * @param ledId The ID of the LED to get the color of
     */
    //% blockId="get_led_color" block="get color of LED with ID $ledId"
    //% ledId.defl=0
    //% color="#4169e1"
    //% shim=LED::getLEDColor
    function getLEDColor(ledId: number): string;

    /**
     * Check if the LED with the given ID is on
     * @param ledId The ID of the LED to check if it's on
     */
    //% blockId="is_led_on" block="is LED with ID $ledId on"
    //% ledId.defl=0
    //% color="#4169e1"
    //% shim=LED::isLEDOn
    function isLEDOn(ledId: number): boolean;

    /**
     * When the light sensor value changes
     */
    //% blockId="when_light_sensor_value_changes" block="when light sensor value changes"
    //% color="#4169e1"
    //% shim=LED::whenLightSensorValueChanges
    function whenLightSensorValueChanges(handler: (newValue: number) => void): void;

}
declare namespace LightSensor {
    /**
     * Get the current value of the light sensor
     */
    //% blockId="get_light_sensor_value" block="get light sensor value"
    //% color="#FF5733"
    //% shim=LightSensor::getLightSensorValue
    function getLightSensorValue(): number;

    /**
     * Set the border color of the light sensor
     * @param color The new color for the light sensor border
     */
    //% blockId="set_light_sensor_border_color" block="set light sensor border color to $color"
    //% color.shadow="colorNumberPicker"
    //% color="#FF5733"
    //% shim=LightSensor::setLightSensorBorderColor
    function setLightSensorBorderColor(color: string): void;

    /**
     * Wait until the light sensor's value changes
     */
    //% blockId="wait_until_light_sensor_value_changes" block="wait until light sensor value changes"
    //% color="#FF5733"
    //% shim=LightSensor::waitUntilLightSensorValueChanges
    function waitUntilLightSensorValueChanges(): void;

    /**
     * Registers a handler that runs when the light sensor's value changes
     * @param handler The function to run when the light sensor's value changes
     */
    //% blockId="on_light_sensor_value_change" block="when light sensor value changes"
    //% color="#FF5733"
    //% shim=LightSensor::onLightSensorValueChange
    function onLightSensorValueChange(handler: () => void): void;

}
declare namespace PressureSensor {
    /**
     * Wait until the pressure sensor value changes
     * @param sensorId The ID of the pressure sensor to monitor
     */
    //% blockId="wait_until_pressure_sensor_value_changes" block="wait until pressure sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#00aa00"
    //% shim=PressureSensor::waitUntilPressureSensorValueChanges
    function waitUntilPressureSensorValueChanges(sensorId: number): void;

    /**
     * Registers a handler that runs when the pressure sensor value changes
     * @param sensorId The ID of the pressure sensor to monitor
     * @param handler The function to run when the pressure sensor value changes
     */
    //% blockId="when_pressure_sensor_value_changes" block="when pressure sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#00aa00"
    //% shim=PressureSensor::whenPressureSensorValueChanges
    function whenPressureSensorValueChanges(sensorId: number, handler: () => void): void;

    /**
     * Get the value of the pressure sensor with a given ID
     * @param sensorId The ID of the pressure sensor to get the value of
     */
    //% blockId="get_pressure_sensor_value" block="get value of pressure sensor with ID $sensorId"
    //% sensorId.defl=0
    //% color="#00aa00"
    //% shim=PressureSensor::getPressureSensorValue
    function getPressureSensorValue(sensorId: number): number;

    /**
     * Set the border color of the pressure sensor
     * @param sensorId The ID of the pressure sensor to change border color
     * @param color The new border color for the pressure sensor
     */
    //% blockId="set_pressure_sensor_border_color" block="set border color of pressure sensor with ID $sensorId to $color"
    //% sensorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#00aa00"
    //% shim=PressureSensor::setPressureSensorBorderColor
    function setPressureSensorBorderColor(sensorId: number, color: string): void;

}
declare namespace ProximitySensor {
    /**
     * Wait until the proximity sensor value changes
     * @param sensorId The ID of the proximity sensor to monitor
     */
    //% blockId="wait_until_proximity_sensor_value_changes" block="wait until proximity sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#1e90ff"
    //% shim=ProximitySensor::waitUntilProximitySensorValueChanges
    function waitUntilProximitySensorValueChanges(sensorId: number): void;

    /**
     * Registers a handler that runs when the proximity sensor value changes
     * @param sensorId The ID of the proximity sensor to monitor
     * @param handler The function to run when the proximity sensor value changes
     */
    //% blockId="when_proximity_sensor_value_changes" block="when proximity sensor with ID $sensorId value changes"
    //% sensorId.defl=0
    //% color="#1e90ff"
    //% shim=ProximitySensor::whenProximitySensorValueChanges
    function whenProximitySensorValueChanges(sensorId: number, handler: () => void): void;

    /**
     * Get the value of the proximity sensor with a given ID
     * @param sensorId The ID of the proximity sensor to get the value of
     */
    //% blockId="get_proximity_sensor_value" block="get value of proximity sensor with ID $sensorId"
    //% sensorId.defl=0
    //% color="#1e90ff"
    //% shim=ProximitySensor::getProximitySensorValue
    function getProximitySensorValue(sensorId: number): number;

    /**
     * Set the border color of the proximity sensor
     * @param sensorId The ID of the proximity sensor to change border color
     * @param color The new border color for the proximity sensor
     */
    //% blockId="set_proximity_sensor_border_color" block="set border color of proximity sensor with ID $sensorId to $color"
    //% sensorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#1e90ff"
    //% shim=ProximitySensor::setProximitySensorBorderColor
    function setProximitySensorBorderColor(sensorId: number, color: string): void;

}
declare namespace ServoMotor {
    /**
     * Set the position of the servo motor with a given ID
     * @param motorId The ID of the servo motor to set the position of
     * @param position The new position for the servo motor
     */
    //% blockId="set_servo_motor_position" block="set position of servo motor with ID $motorId to $position"
    //% motorId.defl=0
    //% position.min=0 position.max=180
    //% color="#dc143c"
    //% shim=ServoMotor::setServoMotorPosition
    function setServoMotorPosition(motorId: number, position: number): void;

    /**
     * Set the border color of the servo motor
     * @param motorId The ID of the servo motor to change border color
     * @param color The new border color for the servo motor
     */
    //% blockId="set_servo_motor_border_color" block="set border color of servo motor with ID $motorId to $color"
    //% motorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#dc143c"
    //% shim=ServoMotor::setServoMotorBorderColor
    function setServoMotorBorderColor(motorId: number, color: string): void;

    /**
     * Get the position of the servo motor with a given ID
     * @param motorId The ID of the servo motor to get the position of
     */
    //% blockId="get_servo_motor_position" block="get position of servo motor with ID $motorId"
    //% motorId.defl=0
    //% color="#dc143c"
    //% shim=ServoMotor::getServoMotorPosition
    function getServoMotorPosition(motorId: number): number;

}
declare namespace Slider {
    /**
     * Wait until the slider value changes
     * @param sliderId The ID of the slider to wait for
     */
    //% blockId="wait_until_slider_value_changes" block="wait until slider with ID $sliderId value changes"
    //% sliderId.defl=0
    //% color="#ff4500"
    //% shim=Slider::waitUntilSliderValueChanges
    function waitUntilSliderValueChanges(sliderId: number): void;

    /**
     * Register an event handler to run when the slider value changes
     * @param sliderId The ID of the slider to listen for
     * @param handler The function to run when the slider value changes
     */
    //% blockId="on_slider_value_changes" block="when slider with ID $sliderId value changes"
    //% sliderId.defl=0
    //% color="#ff4500"
    //% shim=Slider::onSliderValueChanges
    function onSliderValueChanges(sliderId: number, handler: () => void): void;

    /**
     * Get the value of the slider with a given ID
     * @param sliderId The ID of the slider to get the value of
     */
    //% blockId="get_slider_value" block="get value of slider with ID $sliderId"
    //% sliderId.defl=0
    //% color="#ff4500"
    //% shim=Slider::getSliderValue
    function getSliderValue(sliderId: number): number;

    /**
     * Set the border color of the slider
     * @param sliderId The ID of the slider to change the border color
     * @param color The new border color for the slider
     */
    //% blockId="set_slider_border_color" block="set border color of slider with ID $sliderId to $color"
    //% sliderId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#ff4500"
    //% shim=Slider::setSliderBorderColor
    function setSliderBorderColor(sliderId: number, color: string): void;

}
declare namespace TiltSensor {
    /**
     * Register an event handler to run when the tilt sensor with the given ID is tilted
     * @param sensorId The ID of the tilt sensor to listen for
     * @param handler The function to run when the tilt sensor is tilted
     */
    //% blockId="on_tilt_sensor_tilted" block="when tilt sensor with ID $sensorId is tilted"
    //% sensorId.defl=0
    //% color="#9400d3"
    //% shim=TiltSensor::onTiltSensorTilted
    function onTiltSensorTilted(sensorId: number, handler: () => void): void;

    /**
     * Wait until the tilt sensor with the given ID is tilted
     * @param sensorId The ID of the tilt sensor to wait for
     */
    //% blockId="wait_until_tilt_sensor_tilted" block="wait until tilt sensor with ID $sensorId is tilted"
    //% sensorId.defl=0
    //% color="#9400d3"
    //% shim=TiltSensor::waitUntilTiltSensorTilted
    function waitUntilTiltSensorTilted(sensorId: number): void;

    /**
     * Set the border color of the tilt sensor
     * @param sensorId The ID of the tilt sensor to change the border color
     * @param color The new border color for the tilt sensor
     */
    //% blockId="set_tilt_sensor_border_color" block="set border color of tilt sensor with ID $sensorId to $color"
    //% sensorId.defl=0
    //% color.shadow="colorNumberPicker"
    //% color="#9400d3"
    //% shim=TiltSensor::setTiltSensorBorderColor
    function setTiltSensorBorderColor(sensorId: number, color: string): void;

    /**
     * Check if the tilt sensor with a given ID is tilted
     * @param sensorId The ID of the tilt sensor to check
     */
    //% blockId="is_tilt_sensor_tilted" block="is tilt sensor with ID $sensorId tilted"
    //% sensorId.defl=0
    //% color="#9400d3"
    //% shim=TiltSensor::isTiltSensorTilted
    function isTiltSensorTilted(sensorId: number): boolean;

}

// Auto-generated. Do not edit. Really.
