import Axios from 'axios';
import env from 'react-dotenv';

import { SmartThingsClient, BearerTokenAuthenticator } from '@smartthings/core-sdk';

class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  authorizeClient() {
    let apiUrl = `${env.API_URL}${env.OAUTH_AUTHORIZE}`;
    apiUrl += `?client_id=${env.CLIENT_ID}`;
    apiUrl += `&redirect_uri=${env.REDIRECT_URI}`;
    apiUrl += `&response_type=code`;
    window.open(apiUrl);
  }

  getToken(authCode) {
    // Due to cors policy error,
    // SmartThingsOAuthClient won't
    // be used in this OAuth Flow.
    const options = {
      url: `${env.API_URL}${env.OAUTH_TOKEN}`,
      method: 'POST',
      data: `?client_id=${env.CLIENT_ID}&grant_type=authorization_code&redirect_uri=${env.REDIRECT_URI}&code=${env.authCode}`,
      auth: {username: env.CLIENT_ID, password: env.CLIENT_SECRET},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return Axios(options);
  }

  getDevice(deviceId) {
    let deviceUrl = `${env.DEV_API}/${deviceId}`;
    //return this.apiRequest('GET', {}, deviceUrl)
    let api = new SmartThingsClient(new BearerTokenAuthenticator(this.accessToken));
    let device = api.devices.get(deviceId);
    return device
  }

  getDeviceHistory(deviceId, locationId) {
    let historyUrl = env.DEV_HIST_API;
    historyUrl += `?deviceId=${deviceId}`;
    historyUrl += `&locationId=${locationId}`;
    return this.apiRequest('GET', {}, historyUrl);
  }

  getCapability(capabilityId) {
    let capabilityUrl = `${env.CAP_API}/${capabilityId}/1`;
    return this.apiRequest('GET', {}, capabilityUrl);
  }

  apiRequest(method, data, url) {
    const options = {
      url: `${env.API_URL}${url}`,
      method: method,
      data: data,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    return Axios(options);
  }
}

export default ApiClient;
