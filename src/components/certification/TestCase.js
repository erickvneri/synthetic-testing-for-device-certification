
class TestCaseManager {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.collector = new Array();
  }

  getDevice(deviceId) {
    this.apiClient.devices.get(deviceId)
      .then(device => { this.device = device })
      .catch(err => console.log(err));
  }

  //getCapabilityStatus() {}

  getTestInfo(deviceId) {
    const collection = new Array()
    this.apiClient.devices.get(deviceId)
      .then(device => {
        device.components.forEach(component => {
          component.capabilities.forEach(capability => {
            let sample = {};
            sample.component = component.id;
            sample.capability = capability.id;
            sample.commands = [];

            this.apiClient.devices.getCapabilityStatus(
              deviceId, component.id, capability.id
            )
              .then(capabilityStatus => { sample.currentState = capabilityStatus })

            this.apiClient.capabilities.get(capability.id, capability.version)
              .then(capabilityDefinition => {
                sample.capabilityStatus = capabilityDefinition.status;
                if (Object.keys(capabilityDefinition.commands).length > 0) {
                  Object.keys(capabilityDefinition.commands).forEach(command => {
                    let commandReference = {
                      name: command,
                      argument: true ? capabilityDefinition.commands[command].arguments.length > 0 : false,
                      argumentType: null,
                      argumentName: null
                    }
                    if (commandReference.argument) {
                      commandReference.argumentType = capabilityDefinition.commands[command].arguments[0].schema.type;
                      commandReference.argumentType = capabilityDefinition.commands[command].arguments[0].name;
                    }
                    sample.commands.push(commandReference);
                    collection.push(sample);
                    console.log(collection)
                  })
                }
              })
          })
        })
      })
    .catch(err => console.log(err));
  }
}

export default TestCaseManager;
