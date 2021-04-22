import { useEffect, useState } from 'react';

import '../../App.scss';

function DevicesHeader() {
  return (
    <thead>
      <tr>
        <th>Type</th>
        <th>Name</th>
        <th>Label</th>
        <th>Manufacturer</th>
        <th>Components</th>
      </tr>
    </thead>
  )
}

function DevicesList(props) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (props.apiClient) {
      props.apiClient.devices.list()
        .then(devices => setDevices(devices))
        .catch(err => console.log(err));
    }
  }, [props]);

  if (!devices) {
     return <p>Loading devices...</p>
  }
  return (
    <section className='container is-mobile'>
      <p id='in-page-title' className='title is-3'>Select device</p>
      <table className='table is-bordered is-hoverable'>
        <DevicesHeader />
        <tbody>
          {devices
            .sort((a,b) => (a.type < b.type) ? -1 : 1)
            .map(device => {
            return (
              <tr onClick={() => props.redirect(`/device?deviceId=${device.deviceId}`)}>
                <td id='device-select'>{device.type}</td>
                <td id='device-select'>{device.name}</td>
                <td id='device-select'>{device.label}</td>
                <td id='device-select'>{device.manufacturerName}</td>
                <td id='device-select'>{device.components
                  .map(comp => comp.id)
                  .join(', ')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default DevicesList;
