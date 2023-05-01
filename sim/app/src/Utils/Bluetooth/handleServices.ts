async function handleServices(server: { getPrimaryService: (arg0: string) => any; }) {
    try {
      // Get the battery service.
      const batteryService = await server.getPrimaryService('battery_service');
      console.log('Battery service:', batteryService);
  
      // Get the battery level characteristic.
      const batteryLevel = await batteryService.getCharacteristic('battery_level');
      console.log('Battery level characteristic:', batteryLevel);
  
      // Start listening to events (in this case, notifications) from the device.
      listenToEvents(batteryLevel);
    } catch (error) {
      console.error('Handle services error:', error);
    }
  }
  