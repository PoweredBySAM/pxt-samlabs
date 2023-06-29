import { deviceNameType } from "../SAMDevices/Icons/deviceIconTypes";
import { IDeviceLabels } from "../SAMDevices/Types/SAMDeviceTypes";

export const deviceLabels:IDeviceLabels<deviceNameType> = {
    Button:{
        name:"Button",
        defaultName:"SAM Button",
        displayName:"Button",
        info:"Make a tune on a Buzzer, turn it to a smart doorbell or build an instant pizza button",
        maker:"SAM Labs"
    },
    Buzzer:{
        name:"Buzzer",
        defaultName:"SAM Buzzer",
        displayName:"Buzzer",
        info:"Play tunes and melodies",
        maker:"SAM Labs"
    },
    DCMotor:{
        name:"DCMotor",
        defaultName:"SAM DC Motor",
        displayName:"DC Motor",
        info:"Easily control the speed and direction of the motor",
        maker:"SAM Labs"
    },
    RGBLight:{
        name:"RGBLight",
        defaultName:"SAM RGB Light",
        displayName:"RGB Light",
        info:"A light that can flash, stay on, dim, or cycle through any colour",
        maker:"SAM Labs"
    },
    LightSensor:{
        name:"LightSensor",
        defaultName:"SAM Light Sensor",
        displayName:"Light Sensor",
        info:"Detect how much light there is and transform that into an action",
        maker:"SAM Labs"
    },
    ProximitySensor:{
        name:"ProximitySensor",
        defaultName:"SAM Proximity Sensor",
        displayName:"Proximity Sensor",
        info:"Sense how close other objects are and communicate that to  other devices",
        maker:"SAM Labs"
    },
    PressureSensor:{
        name:"PressureSensor",
        defaultName:"SAM Pressure Sensor",
        displayName:"Pressure Sensor",
        info:"Get values from 0 to 100 depending on force",
        maker:"SAM Labs"
    },
    ServoMotor:{
        name:"ServoMotor",
        defaultName:"SAM Servo Motor",
        displayName:"Servo Motor",
        info:"Turns back and forth by 180 degrees",
        maker:"SAM Labs"

    },
    Slider:{
        name:"Slider",
        defaultName:"SAM Slider",
        displayName:"Slider",
        info:"Get values from 0 to 100. Use it as a game controller, steer your robot or dim your lights",
        maker:"SAM Labs"
    },
    HeatSensor:{
        name:"HeatSensor",
        defaultName:"SAM Heat Sensor",
        displayName:"Heat Sensor",
        info:"Get the temperature and tell other devices how to react",
        maker:"SAM Labs"
    },
    Tilt:{
        name:"Tilt",
        defaultName:"SAM Tilt",
        displayName:"Tilt",
        info:"Detect motion and tell other devices how to react",
        maker:"SAM Labs"
    },
    Microbit:{
        name:"Microbit",
        defaultName:"BBC Microbit",
        displayName:"micro:bit",
        info:"Microcontroller with built-in buttons, 25 LED display, and sensors to detect shake and temperature.",
        maker:"BBC Micro Bit"
    }
}