class SwitchValidation {
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

  validateCapability() {
    const validationCallback = async () => {
      const testCollection = [];
      let testCase;

      let initialState = await this.getStateUpdate();
      let updatedState = initialState;


      let switchMap = {
        on: 'off',
        off: 'on'
      }
      for (let onOff of ['on', 'off']) {
        testCase = {
          component: this.component,
          capability: 'switch',
          initialState: initialState.switch.value,
          initialTimestamp: initialState.switch.timestamp,
          updatedState: updatedState.switch.value,
          updatedTimestamp: updatedState.switch.timestamp,
          command: switchMap[onOff],
          passed: true
        };

        let switchCommand = await this.sendCommand(switchMap[onOff]);
        if (switchCommand.status == 'success'){
          updatedState = await this.getStateUpdate();

          if (updatedState.switch.value == onOff) {
            testCollection.push(testCase);
          } else {
            // Command is successful at
            // API level, but states are
            // not being updated.
            testCase.passed = false;
            testCollection.push(testCase)
          }
        } else {
          // Commands are failing
          testCase.passed = false;
          testCollection.push(testCase)
        }
        initialState = updatedState;
      }
      return testCollection;
    }
    return validationCallback();
  }
}

export default SwitchValidation;
