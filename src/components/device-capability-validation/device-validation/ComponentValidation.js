import { useState, useEffect } from 'react';

import CapabilityValidation from './CapabilityValidation';

function ComponentValidation(props) {
  const [component, setComponent] = useState();
  const [capabilities, setCapabilities] = useState([]);

  useEffect(() => {
    if (props.components.length > 0) {
      props.components.forEach(comp => {
        setComponent(comp.id);
        if (comp.hasOwnProperty('capabilities')) {
          setCapabilities(comp.capabilities);
        }
      })
    }
  }, [props]);

  return <CapabilityValidation
        capabilities={capabilities}
        component={component}
        deviceId={props.deviceId}
        apiClient={props.apiClient} />
}

export default ComponentValidation;
