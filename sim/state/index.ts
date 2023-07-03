

namespace samlabs {
  class SamSimDataService {
    private devicesKey: string = "sam_devices_state";
    private fetchQueue = new Map<string, any>();
    public static instance: SamSimDataService;

    private constructor() {}

    public static getInstance(queueKey: string): SamSimDataService {
      if (!SamSimDataService.instance) {
        SamSimDataService.instance = new SamSimDataService();
      }
      return SamSimDataService.instance;
    }

    private loadDevices(): Array<any> {
      const devices = localStorage.getItem(this.devicesKey);
      if (!!devices) {
        return JSON.parse(devices);
      } else {
        localStorage.setItem(this.devicesKey, JSON.stringify([]));
        return [];
      }
    }

    public getDeviceState(id: string): any {
        const devices = this.loadDevices();
        return devices.find((device) => device.id === id);  
    }
  }
}
