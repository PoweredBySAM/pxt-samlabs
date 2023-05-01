async function listenToEvents(characteristic: { startNotifications: () => any; addEventListener: (arg0: string, arg1: (event: any) => void) => void; }) {
    try {
      // Enable notifications for the battery level characteristic.
      await characteristic.startNotifications();
  
      // Add an event listener to handle incoming notifications.
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        // Get the new value of the battery level characteristic.
        const batteryLevel = event.target.value.getUint8(0);
        console.log('Battery level:', batteryLevel);
      });
  
      console.log('Listening to events...');
    } catch (error) {
      console.error('Listen to events error:', error);
    }
  }