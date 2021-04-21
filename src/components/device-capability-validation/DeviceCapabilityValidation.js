import { useState, useEffect } from 'react';
import '../../App.scss';

import DeviceValidation from './device-validation/DeviceValidation';

function DeviceCapabilityValidation(props) {
  const [device, setDevice] = useState({});
  const [deviceId, setDeviceId] = useState(
      new URLSearchParams(
        window.location.search
      ).get('deviceId')
  );

  useEffect(() => {
    const fetchDevice = async () => {
      let deviceResponse = await props.apiClient.devices.get(deviceId);
      setDevice(deviceResponse);
    };
    fetchDevice();
  }, [setDevice]);

  return (
    <section className='container is-mobile'>
          <p className='title is-1'>{device.label}</p>
          <p className='subtitle is-4'>{device.deviceId}</p>
      <table className='table is-bordered'>
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
        <DeviceValidation
          device={device}
          apiClient={props.apiClient} />
      </table>
    </section>
  )
}

export default DeviceCapabilityValidation;
