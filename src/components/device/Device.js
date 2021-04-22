import { useState, useEffect } from 'react';
import '../../App.scss';

import DeviceInfo from './DeviceInfo';
import DeviceCapabilityInfo from './DeviceCapabilityInfo';

function Device(props) {
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
  }, [setDevice]);

  return (
    <section className='container is-mobile'>
      <div className='level'>
        <DeviceInfo
          deviceInfo={device}/>
        <div className='container'>
        <DeviceCapabilityInfo
          componentInfo={device.components}/>
          <div>
            <button className='button is-medium'
              onClick={() => props.redirect(
              `/validateDevice?deviceId=${deviceId}`)}>Run Tests
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Device;
