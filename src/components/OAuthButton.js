import OAuthService from '../services/OAuthService';
import '../App.scss';

/*
  * The OAuthFlow will depend
  * on the <isAuth> property
  * that the app has shared
  * declaring if this app
  * is currently authorized,
  * i.e. there's an access
  * token stored at the App
  * state.
  * */
function OAuthButton(props) {
  let authCode = new URLSearchParams(
    window.location.search
  ).get('code');
  const oauthService = new OAuthService();

  // Template for props.accessToken === null
  const authorizeButton = (
      <button
        className='button is-primary is-medium'
        id='navbar-button'
        onClick={oauthService.authorizeClient}>
        Authorize
      </button>);

  const signOutCallback = () => {
    /*
      * Clear accessToken and redirect
      * to Home.
      * */
    props.setToken(null);
    props.redirect('/');
  }

  // Template for props.accessToken === true
  const isAuthorizedMsg = (
    <div className='navbar-item'>
      <button
        className='button is-light is-medium'
        onClick={signOutCallback}>
        Sign Out
      </button>
    </div>);

  if (!props.accessToken){
    if (!authCode) {
      return authorizeButton;
    }
    else if (authCode){
      let tokenResponse = oauthService.getToken(authCode)
      console.log(tokenResponse.data);
      //localStorage.setItem('accessToken', tokenResponse.access_token);
      props.redirect('/');
    }
  }
  return isAuthorizedMsg;
}

export default OAuthButton;
