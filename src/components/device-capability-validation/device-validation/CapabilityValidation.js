import { useState, useEffect } from 'react';
import CSVDownloader from 'react-csv-downloader';

import SwitchValidation from '../capability-validation/SwitchValidation';
import SwitchLevelValidation from '../capability-validation/SwitchLevelValidation';
import ColorControlValidation from '../capability-validation/ColorControlValidation';
import ColorTemperatureValidation from '../capability-validation/ColorTemperatureValidation';

import ToCSVButton from '../../buttons/toCSVButton';

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

  const colorTemperatureValidationCallback = async () => {
    let service = new ColorTemperatureValidation(
      props.deviceId, props.component, props.apiClient
    );
    const colorTemperatureTestCases = await service.validateCapability();

    setTestCase((testCases) => [
      ...testCases,
      ...colorTemperatureTestCases
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
            case 'colorTemperature':
              colorTemperatureValidationCallback();
              break;
            default:
            console.log('Capability not supported.');
              break
          }
        })
      }
  }, [props]);

  const testResultMapping = (testResult) => {
    const map = { true: 'Passed', false: 'Failed' }
    return map[testResult];
  };

  return (
    <>
      <section className='buttons are-medium'>
        {/* Export Results to .csv file */}
        <ToCSVButton className='button' testCases={testCases} />
        {/* Refresh Window to Restart Tests */}
        <button className='button' onClick={() => window.location.reload()}>
          Run again
        </button>
      </section>

      <table className='table is-bordered' id='test-result-table'>
        <thead>
          <th>Test</th>
          <th>Component</th>
          <th>Capability</th>
          <th>Initial State</th>
          <th>Initial Timestamp</th>
          <th>Command</th>
          <th>Updated State</th>
          <th>Updated Timestamp</th>
          <th>Result</th>
        </thead>
      {testCases.map((test, testId) => {
        test.id = (testId + 1);
        return (
          <tbody>
            <td>{test.id}</td>
            <td>{test.component}</td>
            <td>{test.capability}</td>
            <td>{''+test.initialState}</td>
            <td>{test.initialTimestamp}</td>
            <td>{test.command}</td>
            <td>{''+test.updatedState}</td>
            <td>{test.updatedTimestamp}</td>
            <td>{testResultMapping(test.passed)}</td>
          </tbody>
        )
      })}
      </table>
    </>
  )
}

export default CapabilityValidation;
