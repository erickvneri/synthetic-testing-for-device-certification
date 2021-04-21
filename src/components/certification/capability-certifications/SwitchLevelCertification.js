class SwitchLevelCertification {
  constructor(deviceId, component, apiClient) {
    this.deviceId = deviceId;
    this.component = component;
    this.apiClient = apiClient;
    this.levelSteps = [0, 50, 100];
  }

  getStateUpdate() {
    const deviceState = async () => {
      let switchLevelState = await this.apiClient.devices.getCapabilityStatus(
        this.deviceId, this.component, 'switchLevel'
      );
      return await switchLevelState;
    };
    return deviceState();
  }

  sendCommand(level) {
    const deviceCommand = async () => {
      let switchLevelResponse = await this.apiClient.devices.executeCommand(
        this.deviceId,
        { component: this.component,
          capability: 'switchLevel',
          command: 'setLevel',
          arguments: [level]
        });
      return await switchLevelResponse;
    }
    return deviceCommand();
  }

  certificateCapability() {
    const certCallback = async () => {
      let initialState = await this.getStateUpdate();
      let updatedState;
      let successCommands = 0;
      let failCommands = 0;

      for (let levelStep of this.levelSteps) {
        let levelStepCommand = await this.sendCommand(levelStep);
        if (levelStepCommand.status == 'success') {
          updatedState = await this.getStateUpdate();
          console.log(updatedState.level.value);
          console.log(levelStep);
          if (updatedState.level.value == levelStep) {
            successCommands++;
          }
          else {
            // If command is successful
            // at API level, but values
            // are not being updated.
            failCommands++;
          }
        }
        // If command failed
        else {
          failCommands++;
        }
      }

      let testResult = {
        component: this.component,
        capability: 'switchLevel',
        initialState: initialState.level.value,
        initialTimestamp: initialState.level.timestamp,
        updatedState: updatedState.level.value,
        updatedTimestamp: updatedState.level.timestamp,
        successCommands: successCommands,
        failCommands: failCommands,
        isCertified: true
      }
      if (successCommands != 3) {
        testResult.isCertified = false;
        return testResult;
      }
      return testResult;
    }
    return certCallback();
  }
}

export default SwitchLevelCertification;
