import ButtonDevice from "./ButtonDevice";
import BuzzerDevice from "./BuzzerDevice";

export interface IBuzzerDevice {
    _virtualController: any;
    _bluetoothController: any;
    _deviceId: string;
    possibleStates: any;
    restProps: any;
    virtualInteractionComponentName: string;
    isConnected: boolean;
    isConnecting: boolean;
    batteryLevel: number;
    Color: string;
    pitch: any;
    volume: number;
    isActive: boolean;
    blockVisibility: boolean;
    toggleVisibility(): void;
    updateBatteryLevel(level: number): void;
    updateIsConnected(value: boolean): void;
    updateIsConnecting(value: boolean): void;
    updateColor(value: string): void;
    
  }
