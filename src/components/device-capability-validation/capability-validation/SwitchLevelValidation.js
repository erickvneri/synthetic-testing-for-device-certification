import CapabilityValidationBase from './CapabilityValidationBase';

class SwitchLevelValidation extends CapabilityValidationBase {
  constructor(deviceId, component, apiClient) {
    super(deviceId, component, apiClient, 'switchLevel')
  }

  validateCapability() {
    const validationCallback = async () => {
      const testCollection = [];
      let testCase;

      let initialState = await this.getStateUpdate();
      let updatedState = initialState;

      for (let levelStep of [0, 50, 100]) {
        let levelStepCommand = await this.sendCommand('setLevel', levelStep);
        updatedState = await this.getStateUpdate();
        testCase = {
          component: this.component,
          capability: 'switchLevel',
          initialState: initialState.level.value,
          initialTimestamp: initialState.level.timestamp,
          command: `setLevel(${levelStep})`,
          updatedState: updatedState.level.value,
          updatedTimestamp: updatedState.level.timestamp,
          passed: true
        };
        if (levelStepCommand.status !== 'success' || updatedState.level.value === levelStep) {
          testCase.passed = false;
        }
        testCollection.push(testCase);
      }
      return testCollection;
    }
    return validationCallback();
  }
}

export default SwitchLevelValidation;
