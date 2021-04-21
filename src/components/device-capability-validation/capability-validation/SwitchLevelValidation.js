class SwitchLevelValidation {
  constructor(deviceId, component, apiClient) {
    this.deviceId = deviceId;
    this.component = component;
    this.apiClient = apiClient;
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

  validateCapability() {
    const validationCallback = async () => {
      const testCollection = [];
      let testCase;

      let initialState = await this.getStateUpdate();
      let updatedState = initialState;

      for (let levelStep of [0, 50, 100]) {
        let levelStepCommand = await this.sendCommand(levelStep);
        if (levelStepCommand.status == 'success') {
          updatedState = await this.getStateUpdate();
            testCase = {
              component: this.component,
              capability: 'switchLevel',
              initialState: initialState.level.value,
              initialTimestamp: initialState.level.timestamp,
              updatedState: updatedState.level.value,
              updatedTimestamp: updatedState.level.timestamp,
              command: `setLevel(${levelStep})`,
              passed: true
            };

          if (updatedState.level.value == levelStep) {
            testCollection.push(testCase);
          }
          else {
            // If command is successful
            // at API level, but values
            // are not being updated.
            testCase.passed = false;
            testCollection.push(testCase);
          }
        }
        // If command failed
        else {
          testCase.passed = false;
          testCollection.push(testCase);
        }
      }

      return testCollection;
    }
    return validationCallback();
  }
}

export default SwitchLevelValidation;
