import { useState, useEffect } from 'react';

import SwitchCertification from './capability-certifications/SwitchCertification';
import SwitchLevelCertification from './capability-certifications/SwitchLevelCertification';

class ColorControlCertification {
  constructor(deviceId, component, apiClient) {
    this.deviceId = deviceId;
    this.component = component;
    this.apiClient = apiClient;
    this.commands = ['setColor', 'setHue', 'setSaturation'];
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

  certificateCapability() {
    const certCallback = async () => {
      //let initialState = await this.getStateUpdate();
      //let updatedState;
      //let successCommands = 0;
      //let failCommands = 0;

      //for (let levelStep of this.levelSteps) {
        //let levelStepCommand = await this.sendCommand(levelStep);
        //if (levelStepCommand.status == 'success') {
          //updatedState = await this.getStateUpdate();
          //console.log(updatedState.level.value);
          //console.log(levelStep);
          //if (updatedState.level.value == levelStep) {
            //successCommands++;
          //}
          //else {
            //// If command is successful
            //// at API level, but values
            //// are not being updated.
            //failCommands++;
          //}
        //}
        //// If command failed
        //else {
          //failCommands++;
        //}
      //}

      //let testResult = {
        //component: this.component,
        //capability: 'switchLevel',
        //initialState: initialState.level.value,
        //initialTimestamp: initialState.level.timestamp,
        //updatedState: updatedState.level.value,
        //updatedTimestamp: updatedState.level.timestamp,
        //successCommands: successCommands,
        //failCommands: failCommands,
        //isCertified: true
      //}
      //if (successCommands != 3) {
        //testResult.isCertified = false;
        //return testResult;
      //}
      //return testResult;
    }
    return certCallback();
  }
}

function CapabilityCertification(props) {
  const [certificates, setCertificate] = useState([]);

  const switchCertificationCallback = async () => {
    let service = new SwitchCertification(
      props.deviceId, props.component, props.apiClient
    );
    const switchCertificate = await service.certificateCapability();
    setCertificate((certificates) => [
      ...certificates,
      {...switchCertificate}
    ]);
  };

  const switchLevelCertificationCallback = async () => {
    let service = new SwitchLevelCertification(
      props.deviceId, props.component, props.apiClient
    );
    const switchLevelCertificate = await service.certificateCapability();

    setCertificate((certificates) => [
      ...certificates,
      {...switchLevelCertificate}
    ]);
  };

  useEffect(() => {
      if (props.capabilities.length > 0) {
        props.capabilities.forEach(cap => {
          if (cap.id == 'switch'){
            switchCertificationCallback();
          }
          else if (cap.id == 'switchLevel') {
            switchLevelCertificationCallback();
          }
          else if (cap.id === 'colorControl') {
            console.log('colorControlCertificationCallback');
          }
        })
      }
  }, [props]);

  return (
    <>
      {certificates.map(cert => {
        return (
          <tbody>
            <td>{cert.component}</td>
            <td>{cert.capability}</td>
            <td>{cert.initialState}</td>
            <td>{cert.initialTimestamp}</td>
            <td>{cert.successCommands}</td>
            <td>{cert.failCommands}</td>
            <td>{cert.updatedState}</td>
            <td>{cert.updatedTimestamp}</td>
            <td>{"" + cert.isCertified}</td>
          </tbody>
        )
      })}
    </>
  )
}

function ComponentCertification(props) {
  const [component, setComponent] = useState();
  const [capabilities, setCapabilities] = useState([]);

  useEffect(() => {
    if (props.components.length > 0) {
      props.components.forEach(comp => {
        setComponent(comp.id);
        if (comp.hasOwnProperty('capabilities')) {
          setCapabilities(comp.capabilities);
        }
      })
    }
  }, [props]);

  return <CapabilityCertification
        capabilities={capabilities}
        component={component}
        deviceId={props.deviceId}
        apiClient={props.apiClient} />
}

function DeviceCertification(props) {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (props.device.hasOwnProperty('components')) {
      setComponents(props.device.components)
    }
  }, [props]);

  return <ComponentCertification
        components={components}
        deviceId={props.device.deviceId}
        apiClient={props.apiClient} />
}

export default DeviceCertification;
