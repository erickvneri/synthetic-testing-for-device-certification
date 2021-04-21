import { useEffect, useState } from 'react';

import '../../App.scss';
import Axios from 'axios';

function DevicesList(props) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // This API Call must be moved to an
    // APIClient class that handles Http
    // Requests.
    const options = {
        url: 'https://api.smartthings.com/v1/devices',
        headers: {
          'Authorization': `Bearer ${props.accessToken}`
        }
      }
    Axios(options)
      .then(res => setDevices(res.data.items))
      .catch(err => console.log(err))
  }, [typeof devices]);

  if(props.accessToken){
    return (
      <section className='container is-mobile'>
        <h2 id='in-page-title' className='title'>Select device</h2>
        <table className='table is-bordered is-hoverable'>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Label</th>
              <th>Manufacturer</th>
              <th>Components</th>
            </tr>
          </thead>
          <tbody>
            {devices
              .sort((a,b) => (a.type < b.type) ? -1 : 1)
              .map(device => {
              return (
                <tr onClick={() => props.redirect(`/device?deviceId=${device.deviceId}`)}>
                  <td>{device.type}</td>
                  <td>{device.name}</td>
                  <td>{device.label}</td>
                  <td>{device.manufacturerName}</td>
                  <td>{device.components
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
  return (
    prompt('Access Error', 'User must authenticate first', props.redirect('/'))
  )
}

export default DevicesList;
