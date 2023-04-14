interface Bluetooth {
    requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
  }
  
  interface Navigator {
    bluetooth: Bluetooth;
  }