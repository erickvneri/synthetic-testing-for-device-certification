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
        id='navbarBtn'
        onClick={oauthService.authorizeClient}>
        Authorize
      </button>);

  // Template for props.accessToken === true
  const isAuthorizedMsg = (
    <div className='navbar-item'>
      <p
        className='navbar-item'>
        Client Authorized
      </p>
      <button
        className='button is-primary is-medium'
        id='navbarBtn'
        onClick={() => props.redirect('/devicesList')}>
        Get Started
      </button>
    </div>);

  if (!props.accessToken){
    if (!authCode) {
      return authorizeButton;
    }
    else if (authCode){
      oauthService.getToken(authCode)
        .then(res => props.setToken(res.data.access_token))
        .catch(err => console.log(err));
      props.redirect('/');
      //return isAuthorizedMsg;
    }
  }
  //else {
      return isAuthorizedMsg;
  //}
}

export default OAuthButton;
