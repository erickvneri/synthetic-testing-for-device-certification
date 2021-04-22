import { useState, useEffect } from 'react';
import '../../App.scss';

import DeviceValidation from './device-validation/DeviceValidation';

function DeviceCapabilityValidation(props) {
  const [device, setDevice] = useState({});
  const [deviceId, setDeviceId] = useState(
    new URLSearchParams(window.location.search).get('deviceId')
  );

  useEffect(() => {
    const fetchDevice = async () => {
      let deviceResponse = await props.apiClient.devices.get(deviceId);
      setDevice(deviceResponse);
    };
    fetchDevice();
  }, [deviceId]);

  return (

    <section className='container is-mobile'>
      <p className='title is-3'>{device.label}</p>
       <p className='subtitle is-4'>{device.deviceId}</p>
      <DeviceValidation
          device={device}
          apiClient={props.apiClient} />
    </section>
  )}

export default DeviceCapabilityValidation;
