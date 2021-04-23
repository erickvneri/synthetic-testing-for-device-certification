class CapabilityValidationBase {
  constructor(deviceId, component, apiClient, capability) {
    this.deviceId = deviceId;
    this.component = component;
    this.apiClient = apiClient;
    this.capability = capability;
    this.debounceMs = 1000;
  }

  getStateUpdate() {
    const deviceState = async () => {
      let capabilityState = await this.apiClient.devices.getCapabilityStatus(
        this.deviceId, this.component, this.capability
      );
      return await capabilityState;
    };
    return deviceState();
  }

  sendCommand(command, argument) {
    const deviceCommand = async () => {
      let commandResponse = await this.apiClient.devices.executeCommand(
        this.deviceId,
        { component: this.component,
          capability: this.capability,
          command: command,
          arguments: [argument]
        });
      return await commandResponse;
    }
    return deviceCommand();
  }
}

export default CapabilityValidationBase;
