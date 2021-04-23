import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { SmartThingsClient, BearerTokenAuthenticator } from '@smartthings/core-sdk';
import env from 'react-dotenv';

import Navbar from './components/Navbar';
import Home from './components/Home';
import DevicesList from './components/device/DevicesList';
import Device from './components/device/Device';
import DeviceCapabilityValidation from './components/device-capability-validation/DeviceCapabilityValidation';

function App() {
  const [accessToken, setToken] = useState(env.PAT ? env.PAT : null);
  const redirect = useHistory().push;
  const apiClient = new SmartThingsClient(new BearerTokenAuthenticator(accessToken));

  return (
    <>
    <div>
      <Navbar
        accessToken={accessToken}
        setToken={setToken}
        redirect={redirect}/>

      {/**** Endpoint Redirects ****/}
      <Switch>
        {/* Home */}
        <Route
          exact path='/'
          component={Home}>
        </Route>

        {/* Devices List */}
        <Route
          exact path='/devices-list'
          render={() => <DevicesList
            apiClient={apiClient}
            redirect={redirect}/>}>
        </Route>

        {/* Device Detail */}
        <Route
          exact path='/device'
          render={() => <Device
            apiClient={apiClient}
            redirect={redirect}/>}>
        </Route>

        {/* Device Capability Validation */}
        <Route
          exact path='/validate-device'
          render={() => <DeviceCapabilityValidation
            redirect={redirect}
            apiClient={apiClient}/>}>
        </Route>
      </Switch>
    </div>
    </>
  );
}

export default App;
