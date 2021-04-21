class SwitchCertification {
  constructor(deviceId, component, apiClient) {
    this.deviceId = deviceId;
    this.component = component;
    this.apiClient = apiClient;
  }

  getStateUpdate() {
    const deviceState = async () => {
      let switchState = await this.apiClient.devices.getCapabilityStatus(
        this.deviceId, this.component, 'switch'
      );
      return await switchState;
    };
    return deviceState();
  }

  sendCommand(currentState) {
    const deviceCommand = async () => {
      let commandMap = {
        on: 'off',
        off: 'on'
      };
      let switchResponse = await this.apiClient.devices.executeCommand(
        this.deviceId,
        { component: this.component,
          capability: 'switch',
          command: commandMap[currentState]
        });
      return await switchResponse;
    }
    return deviceCommand();
  }

  certificateCapability() {
    const certCallback = async () => {
      let successCommands = 0;
      let failCommands = 0;
      let initialState = await this.getStateUpdate();
      let updatedState;
      let switchCommand;

      switchCommand = await this.sendCommand(initialState.switch.value);
      if (switchCommand.status == 'success'){
        updatedState = await this.getStateUpdate();
        if (initialState.switch.value == updatedState.switch.value) {
          successCommands++;
        } else {
          // Command is successful at
          // API level, but states are
          // not being updated.
          failCommands++;
        }
      } else {
        // Commands are failing
        failCommands++;
      }

      updatedState = await this.getStateUpdate();
      switchCommand = await this.sendCommand(updatedState.switch.value);
      if (switchCommand.status == 'success'){
        updatedState = await this.getStateUpdate();
        if (initialState.switch.value == updatedState.switch.value) {
          successCommands++;
        } else {
          // Command is successful at
          // API level, but states are
          // not being updated.
          failCommands++;
        }
      } else {
        // Commands are failing
        failCommands++;
      }

      let testResult = {
        component: this.component,
        capability: 'switch',
        initialState: initialState.switch.value,
        initialTimestamp: initialState.switch.timestamp,
        updatedState: updatedState.switch.value,
        updatedTimestamp: updatedState.switch.timestamp,
        successCommands: successCommands,
        failCommands: failCommands,
        isCertified: true
      };
      if (initialState.switch.value != updatedState.switch.value) {
        return testResult;
      } else {
        testResult.isCertified = false;
        return testResult;
      }
    }
    return certCallback();
  }
}

export default SwitchCertification;
