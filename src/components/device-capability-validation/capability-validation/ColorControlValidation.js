class ColorControlValidation {
  constructor(deviceId, component, apiClient) {
    this.deviceId = deviceId;
    this.component = component;
    this.apiClient = apiClient;
  }

  getStateUpdate() {
    const deviceState = async () => {
      let colorControlState = await this.apiClient.devices.getCapabilityStatus(
        this.deviceId, this.component, 'colorControl'
      );
      return await colorControlState;
    };
    return deviceState();
  }

  sendCommand(command, argument) {
    const deviceCommand = async () => {
      let switchLevelResponse = await this.apiClient.devices.executeCommand(
        this.deviceId,
        { component: this.component,
          capability: 'colorControl',
          command: command,
          arguments: [argument]
        });
      return await switchLevelResponse;
    }
    return deviceCommand();
  }

  validateCapability() {
    const validateCallback = async () => {
      const testCollection = [];
      let testCase;

      let initialState = await this.getStateUpdate();
      let updatedState;

      let argumentSteps = [0, 50, 100];
      /*
        * Validation of setHue &
        * setSaturation Commands.
        * */
      let cmdAttrMapper = {
        'setHue': 'hue',
        'setSaturation': 'saturation'
      };
      for(let setter of ['setHue', 'setSaturation']){
        for (let argStep of argumentSteps) {
          let commandResponse = await this.sendCommand(setter, argStep);
          updatedState = await this.getStateUpdate();

          testCase = {
            component: this.component,
            capability: 'colorControl',
            initialState: String(initialState[cmdAttrMapper[setter]].value),
            initialTimestamp: initialState[cmdAttrMapper[setter]].timestamp,
            updatedState: String(updatedState[cmdAttrMapper[setter]].value),
            updatedTimestamp: updatedState[cmdAttrMapper[setter]].timestamp,
            command: `${setter}(${argStep})`,
            passed: true
          };
          if (commandResponse.status !== 'success') {
            testCase.passed = false;
          }
          if (updatedState[cmdAttrMapper[setter]].value != argStep) {
            testCase.passed = false;
          }
          initialState = updatedState;
          testCollection.push(testCase);
        };
      }

      /*
        * Validation of setColor Command
        * */
      for (let color of ['red', 'green', 'blue']) {
        let commandResponse = await this.sendCommand('setColor', { color: color });
        updatedState = await this.getStateUpdate();
        testCase = {
          component: this.component,
          capability: 'colorControl',
          initialState: String(initialState.color.value),
          initialTimestamp: initialState.color.timestamp,
          updatedState: String(updatedState.color.value),
          updatedTimestamp: updatedState.color.timestamp,
          command: `setColor("${color}")`,
          passed: true
        };
        if (commandResponse.status !== 'success') {
          testCase.passed = false;
        }
        if (updatedState.color.value !== color) {
          testCase.passed = false;
        }
        initialState = updatedState;
        testCollection.push(testCase);
      }
      return testCollection;
    }
    return validateCallback();
  }
}

export default ColorControlValidation;
