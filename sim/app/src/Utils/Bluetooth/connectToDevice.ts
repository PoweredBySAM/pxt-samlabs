async function connectToDevice(device: { gatt: { connect: () => any; }; }) {
    try {
      const server = await device.gatt.connect();
      console.log('Connected to GATT server:', server);
      // Access the service(s) you need and handle characteristics.
      handleServices(server);
    } catch (error) {
      console.error('Connect to device error:', error);
    }
  }