import {
  DeviceMenuItemType,
  IBuiltDevice,
} from "../SAMDevices/Types/SAMDeviceTypes";
import { deviceLabels } from "../Constants/DeviceLabel";
import { getDeviceIcon } from "../SAMDevices/Icons";
import SAMDeviceBuilder from "../SAMDevices/SAMDeviceBuilder";
import { useStores } from "./useStores";
import { deviceNameType } from "../SAMDevices/Icons/deviceIconTypes";
import { getGlobalName } from "src/Utils/getGlobalName";

export const pxtToSimDeviceNameMap: { [key: string]: deviceNameType } = {
  sam_dcmotor: "DCMotor",
  sam_button: "Button",
  sam_led: "RGBLight",
  sam_servo_motor: "ServoMotor",
  sam_buzzer: "Buzzer",
  sam_light_sensor: "LightSensor",
  sam_proximity_sensor: "ProximitySensor",
  sam_pressure_sensor: "PressureSensor",
  sam_heat_sensor: "HeatSensor",
  sam_slider: "Slider",
  sam_tilt: "Tilt",
  bbc_microbit: "Microbit",
};
type DeviceNameType = typeof pxtToSimDeviceNameMap;
type pxtDeviceCodeType = keyof DeviceNameType;

const useAddNewDeviceEventHandler = () => {
  const { devicesStore } = useStores();
  const addNewDeviceEventHandler = (detail:any) => {
    const pxtDeviceCode: pxtDeviceCodeType = detail.detail?.device;
    const id: string = detail.detail.id;
    const deviceNameInSim = pxtToSimDeviceNameMap[pxtDeviceCode];
    if (deviceNameInSim) {
      const device: DeviceMenuItemType = {
        label: deviceLabels[deviceNameInSim as deviceNameType],
        icon: getDeviceIcon(deviceNameInSim as deviceNameType),
        id,
      };
      const newDevice: SAMDeviceBuilder = new SAMDeviceBuilder({...device});
      const builtDevice: IBuiltDevice = newDevice.build();
      devicesStore.addDevice(builtDevice);
    }
  };

  return { addNewDeviceEventHandler };
};
export default useAddNewDeviceEventHandler;
