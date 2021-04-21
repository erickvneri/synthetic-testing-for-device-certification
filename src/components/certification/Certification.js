import { useState, useEffect } from 'react';
import '../../App.scss';

import DeviceCertification from './DeviceCertification';

function Certification(props) {
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
      <p className='title is-2'>{device.label}</p>
      <p className='subtitle is-4'>{device.deviceId}</p>
      <table className='table is-bordered'>
        <thead>
          <th>Component</th>
          <th>Capability</th>
          <th>Initial State</th>
          <th>Initial Timestamp</th>
          <th>Successful Commands</th>
          <th>Failed Commands</th>
          <th>Updated State</th>
          <th>Updated Timestamp</th>
          <th>Result</th>
        </thead>
        <DeviceCertification
          device={device}
          apiClient={props.apiClient} />
      </table>
    </section>
  )
}

export default Certification;
