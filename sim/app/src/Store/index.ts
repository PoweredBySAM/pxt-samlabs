import ButtonDevice from "./ButtonDevice";
import BuzzerDevice from "./BuzzerDevice";
import DCMotorDevice from "./DCMotorDevice";
import LEDDevice from "./LEDDevice";

export const storeMap = {
    'SAM Button': ButtonDevice,
    'SAM Buzzer': BuzzerDevice,
    'SAM RGB Light': LEDDevice,
    "SAM DC Motor": DCMotorDevice,
}