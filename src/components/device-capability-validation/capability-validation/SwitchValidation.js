import CapabilityValidationBase from './CapabilityValidationBase';

class SwitchValidation extends CapabilityValidationBase {
  constructor(deviceId, component, apiClient) {
    super(deviceId, component, apiClient, 'switch')
  }

  validateCapability() {
    const validationCallback = async () => {
      const testCollection = [];
      let testCase;

      let initialState = await this.getStateUpdate();
      let updatedState = initialState;


      for (let i = 0; i < 2; i++) {
        let cmd = 'on';
        if (initialState.switch.value === 'on') {
          cmd = 'off';
        };

        let switchCommand = await this.sendCommand(cmd);
        updatedState = await this.getStateUpdate();
        console.log(updatedState.switch.value)

        testCase = {
          component: this.component,
          capability: this.capability,
          initialState: String(initialState.switch.value),
          initialTimestamp: initialState.switch.timestamp,
          command: `${cmd}()`,
          updatedState: String(updatedState.switch.value),
          updatedTimestamp: updatedState.switch.timestamp,
          passed: true
        };


        if (switchCommand.status !== 'success' || updatedState.switch.value === cmd) {
          testCase.passed = false;
        }
        initialState = updatedState;
        testCollection.push(testCase);
      }
      return testCollection;
    }
    return validationCallback();
  }
}

export default SwitchValidation;
