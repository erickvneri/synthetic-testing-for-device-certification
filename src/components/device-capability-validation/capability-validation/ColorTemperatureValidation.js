import CapabilityValidationBase from './CapabilityValidationBase';

class ColorTemperatureValidation extends CapabilityValidationBase {
  constructor(deviceId, component, apiClient) {
    super(deviceId, component, apiClient, 'colorTemperature')
  }

  validateCapability() {
    const validateCallback = async () => {
      const testCollection = [];
      let testCase;

      let initialState = await this.getStateUpdate();
      let updatedState = initialState;
      let argumentSteps = [100, 1000, 3000];
      let setterCommand = 'setColorTemperature';

      for(let arg of argumentSteps) {
        let commandResponse = await this.sendCommand(setterCommand, arg);
        updatedState = await this.getStateUpdate();

        testCase = {
          component: this.component,
          capability: this.capability,
          initialState: String(initialState.colorTemperature.value),
          initialTimestamp: initialState.colorTemperature.timestamp,
          command: `${setterCommand}(${arg})`,
          updatedState: String(updatedState.colorTemperature.value),
          updatedTimestamp: updatedState.colorTemperature.timestamp,
          passed: true
        };
        if (commandResponse.status !== 'success') {
          testCase.passed = false;
        }
        if (updatedState.colorTemperature.value != arg) {
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

export default ColorTemperatureValidation;
