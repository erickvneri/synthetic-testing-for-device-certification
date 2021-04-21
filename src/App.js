import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { SmartThingsClient, BearerTokenAuthenticator } from '@smartthings/core-sdk';
import env from 'react-dotenv';

import Navbar from './components/Navbar';
import OAuthButton from './components/OAuthButton';
import Home from './components/Home';
import DevicesList from './components/device/DevicesList';
import Device from './components/device/Device';
import Certification from './components/certification/Certification';

function App() {
  const [accessToken, setToken] = useState(env.PAT ? env.PAT : null);
  const redirect = useHistory().push;
  const apiClient = new SmartThingsClient(new BearerTokenAuthenticator(accessToken));

  return (
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

        {/* OAuth */}
        <Route
          exact path='/oauth'
          render={() => <OAuthButton
            accessToken={accessToken}
            redirect={redirect}/>}>
        </Route>

        {/* Devices List */}
        <Route
          exact path='/devicesList'
          render={() => <DevicesList
            accessToken={accessToken}
            redirect={redirect}/>}>
        </Route>

        {/* Device Detail */}
        <Route
          exact path='/device'
          render={() => <Device
            accessToken={accessToken}
            redirect={redirect}/>}>
        </Route>

        {/* Device Certification */}
        <Route
          exact path='/deviceCertification'
          render={() => <Certification
            redirect={redirect}
            apiClient={apiClient}/>}>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
