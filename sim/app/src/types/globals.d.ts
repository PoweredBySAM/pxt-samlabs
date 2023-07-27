declare global {
  interface Window {
    pxsim: any; // Use the actual type here if known
    samlabs: any;
    samPairedDevicesManager: any;
  }
}

export {};
