import ButtonDevice from "../../Store/ButtonDevice";
import BuzzerDevice from "../../Store/BuzzerDevice";
import { deviceNameType } from "../Icons/deviceIconTypes";
import {MicrobitProps} from "@samlabs/samblocks/dist/CustomDevices/Microbit";

export type SamDeviceStoreType = any | ButtonDevice| MicrobitProps

export interface IDeviceLabelObject {
    
        name:deviceNameType;
        defaultName:string;
        displayName:string;
        info:string;
        maker:string;
}
export type DeviceLabelType = IDeviceLabelObject[keyof IDeviceLabelObject]

export interface IDeviceLabels<deviceNameType> { 
    Button:IDeviceLabelObject;
    Buzzer:IDeviceLabelObject;
    DCMotor:IDeviceLabelObject;
    RGBLight:IDeviceLabelObject;
    LightSensor:IDeviceLabelObject;
    ProximitySensor:IDeviceLabelObject;
    PressureSensor:IDeviceLabelObject;
    ServoMotor:IDeviceLabelObject;
    Slider:IDeviceLabelObject;
    HeatSensor:IDeviceLabelObject;
    Tilt:IDeviceLabelObject
    Microbit:IDeviceLabelObject
}

export type DeviceMenuItemType = {
    label: IDeviceLabelObject,
    icon: JSX.Element
  }

export type SamVirtualDeviceType = ISamVirtualDevices[keyof ISamVirtualDevices]

export interface ISamVirtualDevices {
    
        Button: ({ device }: {
            device: ButtonDevice;
        }) => JSX.Element;
        Buzzer: ({ device }: {
            device: BuzzerDevice;
        }) => JSX.Element;
        DCMotor: ({ device }: {
            device: any;
        }) => JSX.Element;
        RGBLight: ({ device }: {
            device: any;
        }) => JSX.Element;
        LightSensor: ({ device }: {
            device: any;
        }) => JSX.Element;
        PressureSensor: ({ device }: {
            device: any;
        }) => JSX.Element;
        ProximitySensor: ({ device }: {
            device: any;
        }) => JSX.Element;
        HeatSensor: ({ device }: {
            device: any;
        }) => JSX.Element;
        ServoMotor: ({ device }: {
            device: any;
        }) => JSX.Element;
        Slider: ({ device }: {
            device: any;
        }) => JSX.Element;
        Tilt: ({ device }: {
            device: any;
        }) => JSX.Element;
}

export type MicrobitDeviceType = IMicrobitVirtualDevice[keyof IMicrobitVirtualDevice]
export interface IMicrobitVirtualDevice {
    Microbit: ({device}:{device: MicrobitProps}) => JSX.Element;
}
export interface IBuiltDevice {
    deviceIdOnCreate: string;
    virtualInteractionComponentName: string;
    deviceAnimation: any;
    labels: IDeviceLabelObject;
    virtualController: any;
    controller: any;
    rest ?: any;
  }