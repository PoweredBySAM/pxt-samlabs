import type {IBuiltDevice, SamDeviceStoreType} from '../SAMDevices/Types/SAMDeviceTypes';
import {observable, action, makeAutoObservable, runInAction} from 'mobx';

import ButtonDevice from './ButtonDevice';
import BuzzerDevice from './BuzzerDevice';
import DCMotorDevice from './DCMotorDevice';
import HeatSensorDevice from './HeatSensorDevice';
import LEDDevice from './LEDDevice';
import LightSensorDevice from './LightSensorDevice';
import MicrobitDevice from './MicrobitDevice';
import PressureSensorDevice from './PressureSensorDevice';
import ProximitySensorDevice from './ProximitySensorDevice';
import ServoMotorDevice from './ServoMotorDevice';
import SliderDevice from './SliderDevice';
import TiltDevice from './TiltDevice';
import SamDeviceManager from 'src/Features/SamSimState';

export const storeMap = {
    'SAM Button': ButtonDevice,
    'SAM Buzzer': BuzzerDevice,
    'SAM RGB Light': LEDDevice,
    'SAM DC Motor': DCMotorDevice,
    'SAM Light Sensor': LightSensorDevice,
    'SAM Servo Motor': ServoMotorDevice,
    'SAM Pressure Sensor': PressureSensorDevice,
    'SAM Proximity Sensor': ProximitySensorDevice,
    'SAM Slider': SliderDevice,
    'SAM Heat Sensor': HeatSensorDevice,
    'SAM Tilt': TiltDevice,
    'BBC Microbit': MicrobitDevice,
};

class DevicesStore {
    @observable devices: SamDeviceStoreType[] = [];
    @observable isSynchronizing: boolean = false;
    lsStateStore: SamDeviceManager;
    private deviceOperationsQueue: Array<IBuiltDevice> = [];

    constructor() {
        makeAutoObservable(this);
        this.lsStateStore = SamDeviceManager.getInstance();
    }

    @action addDevice(deviceData: IBuiltDevice) {
        if (this.isSynchronizing) {
            this.deviceOperationsQueue.push(deviceData);
            return;
        }

        this.processDeviceImmediate(deviceData);
    }

    @action private processDeviceImmediate(deviceData: IBuiltDevice) {
        const device = this.buildStore(deviceData);
        this.updateDevicesArray([...this.devices, device]);
        this.updateAssignedNames();
        this.notifyParentAboutDevices([device]);
    }

    @action emptyDevicesStore() {
        this.isSynchronizing = true;

        return new Promise<void>((resolve) => {
            runInAction(() => {
                this.updateDevicesArray([]);
                this.lsStateStore.emptySamSimState();

                if (this.deviceOperationsQueue.length > 0) {
                    const devicesToProcess = [...this.deviceOperationsQueue];
                    this.deviceOperationsQueue = [];

                    const processedDevices = devicesToProcess.map((deviceData) =>
                        this.buildStore(deviceData)
                    );

                    this.updateDevicesArray(processedDevices);
                    this.updateAssignedNames();

                    this.notifyParentAboutDevices(this.devices);
                }

                this.isSynchronizing = false;
                resolve();
            });
        });
    }

    private notifyParentAboutDevices(devicesToNotify: SamDeviceStoreType[]) {
        devicesToNotify.forEach((device) => {
            window.parent.postMessage(
                {
                    type: device.createMessageType,
                    id: device.assignedName,
                },
                window.location.origin
            );
        });
    }

    @action updateDevicesArray(newDevices: SamDeviceStoreType[]) {
        this.devices = newDevices;
    }

    @action updateAssignedNames() {
        const counts: {[key: string]: number} = {};

        this.devices.forEach((device) => {
            const deviceType = device.constructor.name;
            const count = counts[deviceType] || 0;
            counts[deviceType] = count + 1;
            device.assignedName = `${deviceType} ${count === 0 ? '' : count + 1}`;
        });
    }

    buildStore(deviceData: IBuiltDevice) {
        const store = storeMap[deviceData.labels.defaultName as keyof typeof storeMap];
        if (store) {
            return new store(deviceData);
        }
        throw new Error('No store in storemap for device');
    }
}

const devicesStore = new DevicesStore();

export default devicesStore;
