async function requestDevice() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          {
            services: ['battery_service'],
          },
        ],
        optionalServices: ['your_optional_service_uuid'],
      });
  
      console.log('Device:', device);
      connectToDevice(device);
    } catch (error) {
      console.error('Request device error:', error);
    }
  }
  
  // Call the requestDevice function when you want to initiate the device connection.
  requestDevice();