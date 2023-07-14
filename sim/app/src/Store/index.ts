import ButtonDevice from "./ButtonDevice";
import BuzzerDevice from "./BuzzerDevice";
import DCMotorDevice from "./DCMotorDevice";
import HeatSensorDevice from "./HeatSensorDevice";
import LEDDevice from "./LEDDevice";
import LightSensorDevice from "./LightSensorDevice";
import MicrobitDevice from "./MicrobitDevice";
import PressureSensorDevice from "./PressureSensorDevice";
import ServoMotorDevice from "./ServoMotorDevice";
import SliderDevice from "./SliderDevice";
import TiltDevice from "./TiltDevice";


export const storeMap = {
  "SAM Button": ButtonDevice,
  "SAM Buzzer": BuzzerDevice,
  "SAM RGB Light": LEDDevice,
  "SAM DC Motor": DCMotorDevice,
  "SAM Light Sensor": LightSensorDevice,
  "SAM Servo Motor":ServoMotorDevice,
  "SAM Pressure Sensor":PressureSensorDevice,
  "SAM Proximity Sensor":PressureSensorDevice,
  "SAM Slider": SliderDevice,
  "SAM Heat Sensor": HeatSensorDevice,
  "SAM Tilt": TiltDevice,
  "BBC Microbit": MicrobitDevice,
};
