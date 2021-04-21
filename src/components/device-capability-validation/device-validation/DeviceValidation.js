import { useState, useEffect } from 'react';

import ComponentValidation from './ComponentValidation';

function DeviceValidation(props) {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (props.device.hasOwnProperty('components')) {
      setComponents(props.device.components)
    }
  }, [props]);

  return <ComponentValidation
        components={components}
        deviceId={props.device.deviceId}
        apiClient={props.apiClient} />
}

export default DeviceValidation;
