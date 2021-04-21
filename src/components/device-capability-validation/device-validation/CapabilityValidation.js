import { useState, useEffect } from 'react';

import SwitchValidation from '../capability-validation/SwitchValidation';
import SwitchLevelValidation from '../capability-validation/SwitchLevelValidation';
import ColorControlValidation from '../capability-validation/ColorControlValidation';

function CapabilityValidation(props) {
  const [testCases, setTestCase] = useState([]);

  const switchValidationCallback = async () => {
    let service = new SwitchValidation(
      props.deviceId, props.component, props.apiClient
    );
    const switchTestCases = await service.validateCapability();
    setTestCase((testCases) => [
      ...testCases,
      ...switchTestCases
    ]);
  };

  const switchLevelValidationCallback = async () => {
    let service = new SwitchLevelValidation(
      props.deviceId, props.component, props.apiClient
    );
    const switchLevelTestCases = await service.validateCapability();

    setTestCase((testCases) => [
      ...testCases,
      ...switchLevelTestCases
    ]);
  };

  const colorControlValidationCallback = async () => {
    let service = new ColorControlValidation(
      props.deviceId, props.component, props.apiClient
    );
    const colorControlTestCases = await service.validateCapability();

    setTestCase((testCases) => [
      ...testCases,
      ...colorControlTestCases
    ]);
  }

  /*
    * Hook that will evaluate
    * the capabilities received
    * and call the respective
    * capability validation
    * service.
    * */
  useEffect(() => {
      if (props.capabilities.length > 0) {
        props.capabilities.forEach(cap => {
          switch (cap.id) {
            case 'switch':
              switchValidationCallback();
              break;
            case 'switchLevel':
              switchLevelValidationCallback();
              break;
            case 'colorControl':
              colorControlValidationCallback();
              break;
            default:
            console.log('Capability not supported.');
              break
          }
        })
      }
  }, [props]);

  const parseToCSV = async () => {
    const csvHeader = Object.keys(testCases[0]).join(',');
    const csvBody = testCases.map((testCase) => Object.values(testCase).join(","));
    const csvBuffer = `{${csvHeader}${csvBody}}`;
    const filePath = `device-capability-certification${new Date().toISOString()}.csv`;
    console.log(csvBuffer);
  }

  return (
    <>
      {testCases.map((test, testId) => {
        //console.log(test)
        return (
          <tbody>
            <td>{testId + 1}</td>
            <td>{test.component}</td>
            <td>{test.capability}</td>
            <td>{test.initialState}</td>
            <td>{test.initialTimestamp}</td>
            <td>{test.command}</td>
            <td>{test.updatedState}</td>
            <td>{test.updatedTimestamp}</td>
            <td>{"" + test.passed}</td>
          </tbody>
        )
      })}
      <section className='buttons'>
        <button className='button is-warning' onClick={parseToCSV}>
          Download Results
        </button>
        <buton className='button is-success' onClick={() => window.location.reload()}>
          Run tests again
        </buton>
      </section>
    </>
  )
}

export default CapabilityValidation;
