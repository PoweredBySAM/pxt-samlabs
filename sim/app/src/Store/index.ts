import ButtonDevice from "./ButtonDevice";
import BuzzerDevice from "./BuzzerDevice";
import DCMotorDevice from "./DCMotorDevice";
import LEDDevice from "./LEDDevice";
import LightSensorDevice from "./LightSensorDevice";
import ServoMotorDevice from "./ServoMotorDevice";

export const storeMap = {
  "SAM Button": ButtonDevice,
  "SAM Buzzer": BuzzerDevice,
  "SAM RGB Light": LEDDevice,
  "SAM DC Motor": DCMotorDevice,
  "SAM Light Sensor": LightSensorDevice,
  "SAM Servo Motor":ServoMotorDevice,
};
