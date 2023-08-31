# Technical Documentation for [Your PXT Target Name]

## Table of Contents

1. [Introduction](#introduction)
   - [Purpose](#purpose)
   - [Scope](#scope)
2. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Installation Steps](#installation-steps)
3. [Architecture Overview](#architecture-overview)
4. [Adding a new device](#license)
5. [Contributions](#contributions)

## Introduction

### Purpose

### Purpose

The SamScript target is designed to leverage the capabilities of the PXT (Programming Experience Toolkit) ecosystem. The primary aim is to provide a custom simulator that connects via Bluetooth to Sam Custom Devices. This allows users not only to run and debug code in a controlled setting but also to extend this functionality into a live environment.
With an intuitive user interface, the SamScript target also places an emphasis on user experience, ensuring that both novice and seasoned developers can make the most out of its capabilities.

## Installation

### Prerequisites

Before proceeding with the installation, make sure you meet the following prerequisites:

1. **Operating System**: Windows 10, macOS 10.14+, or a compatible Linux distribution
2. **Software**: Latest version of [Node.js](https://nodejs.org/) and npm (Node Package Manager)
3. **PXT CLI**: ```npm install -g pxt```
4. **Bluetooth Capabilities**: Ensure that your computer has Bluetooth hardware or a compatible Bluetooth dongle for connecting with Sam Custom Devices.
  
### Installation Steps

Below are the steps to install the SamScript target for use within the PXT ecosystem:

1. **Download the Repository**
    ```
    git clone https://github.com/PoweredBySAM/pxt-samlabs.git
    ```

2. **Install Dependencies**
    ```
    npm install
    ```

3. **Launch Simulator**
    ```
    pxt serve
    ```

## Architecture Overview

### Introduction

The Architecture of the SamScript target focuses on modularity and scalability, utilizing a robust set of technologies to enable seamless device simulation and integration. This overview will guide you through the main architectural components, illustrating how they interact and contribute to the overall functionality of the platform.

### Directory Structure

The codebase is organized into several directories, with the primary focus on the `sim/app` folder, where the customized simulator resides.

- **sim/app**: Customized Simulator
- **sim/api.ts**: API for Device Events
- **sim/app/src/store**: State Management

### Customized Simulator

Located in the `sim/app` folder, the customized simulator is a React application crafted using TypeScript. This application serves as the core interface for device simulation and event handling.

#### Technologies Used
- **React**: For building the user interface
- **TypeScript**: For adding static type definitions, improving code quality and readability

### Sam Devices

The simulator imports Sam devices from the `@samlabs/samblocks` package. This package contains the pre-defined configurations and functionalities for different types of Sam devices, allowing for a standardized simulation environment.

### Builder Class

Within the simulator, a specialized `Builder` class is responsible for constructing new devices. It listens for the `create_new_device` event triggered from the `sim/api.ts` file and proceeds to build the device based on the specified parameters.

### State Management

The state of each created device is managed and stored in the appropriate store within `sim/app/src/store`. This provides a centralized location for state management, facilitating easier debugging and state manipulation.

### Event Broadcasting and Consumption

Updates to the device configurations, made through the Monaco editor, are broadcasted as custom events from the PXT runtime. These custom events serve as triggers for state updates within the React application.

#### Workflow

1. The Monaco editor sends custom events after changes are made.
2. The PXT runtime broadcasts these custom events.
3. The React application consumes these events.
4. State updates are triggered within the React application, specifically in `sim/app/src/store`, to reflect these changes.

By adopting this event-driven architecture, the system ensures real-time synchronization between the Monaco editor and the device simulator, offering a responsive and intuitive user experience.

## Adding a New Device

### Introduction

To introduce a new device into the SamScript ecosystem, a series of steps involving state management, event listening, and directory organization need to be followed. This guide will walk you through the process to ensure that the new device is seamlessly integrated into the existing architecture.

### State Management with MobX Store

Begin by creating a MobX store specifically designed to model all possible states for your new device. MobX facilitates easier state management by allowing for more straightforward logic and reactivity. 

#### Steps
1. Navigate to `sim/app/src/store`.
2. Create a new MobX store for the device.

### Virtual Interaction Component

If the device you're adding is not already part of the `@samlabs/samblocks` package, a `VirtualInteraction` component will be required. This component will serve as a simulation interface to model all physical interactions associated with the device.

#### Steps
1. Create a new `VirtualInteraction` component for the device.
2. Add this component to your project codebase.

### Directory Structure and Initialization

For better organization, group together the MobX store, controller, and `VirtualInteraction` component for the new device. Place these files in a new directory specifically created for the device under `sim/app/SAMdevices/Animatable`.

#### Steps
1. Create a new directory for the device within `sim/app/SAMdevices/Animatable`.
2. Move the MobX store, controller, and `VirtualInteraction` component into this directory.
3. Create an initialization (`init`) file for the device within this directory to bootstrap any required configurations or dependencies.

### Event Listeners in VirtualInteraction Component

The `VirtualInteraction` component will require the appropriate event listeners to respond to physical interactions or changes in device state.

#### Steps
1. Open the `VirtualInteraction` component file.
2. Add the appropriate event listeners to handle all potential physical interactions with the device.

### Summary

Once you've followed these steps, your new device should be well-integrated into the existing architecture. You'll have a MobX store for state management, an optional `VirtualInteraction` component for simulating physical interactions, and all these elements will be neatly organized under the appropriate directory. The added event listeners in the `VirtualInteraction` component will ensure that the device responds as expected during simulations.



### Conclusion

This architectural framework combines modularity and extensibility, providing a solid foundation for both current functionalities and future developments within the SamScript target.
