import type {IBuiltDevice} from '../SAMDevices/Types/SAMDeviceTypes';
import {observable, action, makeAutoObservable} from 'mobx';

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

const isWKWebView = () => {
    if (!!(window as any).webkit && !!(window as any).webkit.messageHandlers) {
        return true;
    }
    // Check the user agent string
    if (/WKWebView/i.test(navigator.userAgent)) {
        return true;
    }
    // Check for iOS and WebKit
    return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        /WebKit/i.test(navigator.userAgent) &&
        !/CriOS/i.test(navigator.userAgent)
    );
};

const isItWKWebView = isWKWebView();

class DevicesStore {
    @observable devices: any[] = [];
    lsStateStore: any;
    private operationQueue: Array<() => void> = [];
    private isProcessingQueue: boolean = false;
    private pendingDevices: IBuiltDevice[] = [];

    constructor() {
        makeAutoObservable(this);
        this.lsStateStore = SamDeviceManager.getInstance();
    }

    private processQueue() {
        if (this.isProcessingQueue || this.operationQueue.length === 0) {
            return;
        }

        this.isProcessingQueue = true;
        const operation = this.operationQueue.shift();

        if (operation) {
            operation();
        }

        this.isProcessingQueue = false;

        // Process next operation if any
        if (this.operationQueue.length > 0) {
            setTimeout(() => this.processQueue(), 0);
        }
    }

    private queueOperation(operation: () => void) {
        this.operationQueue.push(operation);
        this.processQueue();
    }

    @action addDevice(deviceData: IBuiltDevice) {
        if (isItWKWebView) {
            this.pendingDevices.push(deviceData);
        } else {
            const device = this.buildStore(deviceData);
            this.devices = [...this.devices, device];
            this.updateAssignedNames();

            this.devices.forEach((device) => {
                window.parent.postMessage(
                    {
                        type: device.createMessageType,
                        id: device.assignedName,
                    },
                    window.location.origin
                );
            });
        }
    }

    @action emptyDevicesStore() {
        this.queueOperation(() => {
            this.devices = [];
            this.lsStateStore.emptySamSimState();

            if (isItWKWebView) {
                // Cordova: Process pending devices after emptying the store
                if (this.pendingDevices.length > 0) {
                    // Process pending devices in the next tick to ensure proper order
                    this.queueOperation(() => {
                        this.processPendingDevices();
                    });
                }
            }
        });
    }

    @action private processPendingDevices() {
        if (this.pendingDevices.length === 0) {
            return;
        }

        const deviceData = this.pendingDevices.shift();
        if (deviceData) {
            const device = this.buildStore(deviceData);
            this.devices = [...this.devices, device];
            this.updateAssignedNames();

            this.devices.forEach((device) => {
                window.parent.postMessage(
                    {
                        type: device.createMessageType,
                        id: device.assignedName,
                    },
                    window.location.origin
                );
            });

            if (this.pendingDevices.length > 0) {
                this.queueOperation(() => {
                    this.processPendingDevices();
                });
            }
        }
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
