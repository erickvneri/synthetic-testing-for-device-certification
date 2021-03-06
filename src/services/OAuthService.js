import Axios from 'axios';
import env from 'react-dotenv';

class OAuthService {
  authorizeClient() {
    let apiUrl = `${env.API_URL}${env.OAUTH_AUTHORIZE}`;
    apiUrl += `?client_id=${env.CLIENT_ID}`;
    apiUrl += `&redirect_uri=${env.REDIRECT_URI}`;
    apiUrl += `&response_type=code`;
    window.location.replace(apiUrl);
  }

  getToken(authCode) {
    const tokenRequest = async (authCode) => {
      // Due to cors policy error,
      // SmartThingsOAuthClient won't
      // be used in this OAuth Flow.
      const options = {
        url: `${env.API_URL}${env.OAUTH_TOKEN}`,
        method: 'POST',
        data: (`?client_id=${env.CLIENT_ID}`+
                `&grant_type=authorization_code`+
                `&redirect_uri=${env.REDIRECT_URI}`+
                `&code=${authCode}`),
        auth: {username: env.CLIENT_ID, password: env.CLIENT_SECRET},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      return await Axios(options);
    };
    return tokenRequest(authCode);
  }
}

export default OAuthService;
