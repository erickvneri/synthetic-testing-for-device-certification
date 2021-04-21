import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../App.scss';

import DeviceInfo from './DeviceInfo';
import DeviceCapabilityInfo from './DeviceCapabilityInfo';

function Device(props) {
  const [device, setDevice] = useState({});
  let deviceId = new URLSearchParams(
    window.location.search
  ).get('deviceId');

  useEffect(() => {
    // This API Call must be moved to an
    // APIClient class that handles Http
    // Requests.
    const options = {
      url: `https://api.smartthings.com/v1/devices/${deviceId}`,
        headers: {
          'Authorization': `Bearer ${props.accessToken}`
        }
      }
    Axios(options)
      .then(res => setDevice(res.data))
      .catch(err => alert('API Error', err))
  }, [device]);

  return (
    <section className='container is-mobile'>
      <button onClick={() => props.redirect(`/deviceCertification?deviceId=${deviceId}`)}>Button!</button>
      <DeviceInfo
        deviceInfo={device} />
      <DeviceCapabilityInfo
        componentInfo={device.components} />
    </section>
  )
}

export default Device;
